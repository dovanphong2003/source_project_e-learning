import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { useContext, useState, useEffect } from "react";
import { RoleContext } from "../../context/RoleContext";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { VerifyToken } from "../../components/Sections/FunctionAll";
import { ToastContainer, toast } from "react-toastify";

export const CheckOut = ({
    totalPrice,
    data,
    checkCheckOut,
    setCheckCheckOut,
    fncSetCartOrigin,
}) => {
    const [dataUser, setDataUser] = useState({});

    // get info user - id
    const fncgetInfoUserByAccessTokenAPI = async () => {
        try {
            const response = await axios.get(
                `${
                    process.env.REACT_APP_URL_BACKEND
                }/getInfoUserByAccessTokenAPI?accessToken=${localStorage.getItem(
                    "accessToken"
                )}`
            );

            setDataUser(response.data.data);
        } catch (error) {
            if (error.response.data.ec.message === "jwt expired") {
                const funcVerifyToken = await VerifyToken();
                await funcVerifyToken();
            }
        }
    };
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            fncgetInfoUserByAccessTokenAPI();
        }
    }, [localStorage.getItem("nameUser")]);
    const navigate = useNavigate();
    const notifyError = (content) => toast.error(content);
    function generateRandomString(length) {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomString = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return "CK" + randomString;
    }
    const randomString = generateRandomString(6);

    // handle enrolment student with success pay
    const handleEnrollMent = async () => {
        const funcVerifyToken = await VerifyToken();
        const resultVerify = await funcVerifyToken();
        if (!resultVerify) {
            notifyError("Không thể thực hiện hành động trên !");
            return;
        }
        const ArrId_course = data.map((el) => ({
            id_course: el.course_id,
            course_name: el.course_name,
        }));
        const dataPost = {
            id_student: dataUser.id,
            ArrId_course,
        };
        try {
            await axios.post(
                `${process.env.REACT_APP_URL_BACKEND}/enrolment/upDataEnrolmentsAPI`,
                dataPost
            );
        } catch (error) {}
    };

    // handle delete cartItem of user
    const deleteCartItemOfUser = async () => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_URL_BACKEND}/course/deleteAllCourseCartAPI?id_user=${dataUser.id}`
            );
        } catch (error) {}
    };
    let checkHandleCheckOut = false;
    const handleCheckOutSuccess = (event) => {
        if (checkHandleCheckOut || !dataUser.id) {
            notifyError("Thanh Toán không thành công !");
            return;
        }
        checkHandleCheckOut = true;
        event.preventDefault();
        Swal.fire({
            icon: "success",
            title: "Xác nhận Hoàn Tất",
            text: "Bạn đã mua khóa học thành công !",
        });

        // handle user success get course
        handleEnrollMent();
        deleteCartItemOfUser();
        fncSetCartOrigin([]);
        checkHandleCheckOut = false;
        navigate("/");
    };

    // settime out sleketon
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 2000);

        // Clean up the timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="container_all-checkout">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="container_check-out-detail">
                <div className="info-header-container-check_out">
                    <h2>Thông tin đơn hàng</h2>
                    <div
                        onClick={() => {
                            setCheckCheckOut(!checkCheckOut);
                        }}
                        className="bnt-close"
                    >
                        thoát !
                    </div>
                </div>

                {showSkeleton ? (
                    [
                        "100%",
                        ["60%", "70%", "65%", "40%"],
                        "100%",
                        ["60%", "50%", "75%", "90%"],
                    ].map((el) => {
                        if (Array.isArray(el)) {
                            return el.map((el_child) => {
                                return (
                                    <Skeleton
                                        width={`${el_child}`}
                                        height={"30px"}
                                        duration={1}
                                        count={1}
                                        className="skeleton-css"
                                        baseColor="#faf9ff"
                                        highlightColor="#dadada"
                                    />
                                );
                            });
                        } else {
                            return (
                                <Skeleton
                                    width={`${el}`}
                                    height={"50px"}
                                    duration={1}
                                    count={1}
                                    className="skeleton-css"
                                    baseColor="#faf9ff"
                                    highlightColor="#dadada"
                                />
                            );
                        }
                    })
                ) : (
                    <div className="info-detail-course_checkout">
                        <div className="info_main-check_out">
                            Danh sách khóa học đặt mua
                        </div>

                        <ul>
                            {data.length
                                ? data.map((el) => (
                                      <li>
                                          <span class="arrow-check-out material-symbols-outlined">
                                              play_arrow
                                          </span>{" "}
                                          <span> {el.course_name}</span>
                                      </li>
                                  ))
                                : ""}
                        </ul>
                        <div className="info_main-check_out">
                            Tổng giá: {totalPrice}
                        </div>
                        <div className="info_main-check_out">
                            Thông tin thanh toán
                        </div>
                        <ul>
                            <li>Ngân hàng ABCDE – Chi nhánh XYZ</li>
                            <li>Chủ tài khoản: ABC</li>
                            <li>Số tiền: {totalPrice}</li>
                            <li>
                                Nội dung chuyển khoản:<b> {randomString}</b>
                            </li>
                        </ul>
                        <div className="info_main-check_out">
                            Quét mã QR thanh toán
                        </div>
                        <div className="confirm-checkOut">
                            <span class="material-symbols-outlined">
                                done_all
                            </span>
                            <button onClick={handleCheckOutSuccess}>
                                Xác Nhận Đã Thanh Toán
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
