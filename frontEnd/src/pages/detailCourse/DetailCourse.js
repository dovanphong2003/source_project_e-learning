import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../assets/style/detailCourse/detailCr.css";
import "../../assets/style/responsiveCss/resDetailCourse.css";
import { ModulesLession } from "./component/ModulesLession";
import { useParams } from "react-router-dom";
import Parser from "html-react-parser"; // change string ( html ) --> to html
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { VerifyToken } from "../../components/Sections/FunctionAll";
import Swal from "sweetalert2";

export const DetailCourse = () => {
    const param = useParams();
    const notifyError = (content) => toast.error(content);
    const notifySuccess = (content) => toast.success(content);
    const notifyWarning = (content) => toast.warning(content);
    // const checkBuyCourse... có thể dùng context để check xem user đã mua khóa học chưa
    const [dataModulAndLesson, setDataModuleAndLesson] = useState([]);
    const [dataInfoCourse, setDataInfoCourse] = useState({});
    const [checkChangeIdNotDefined, setCheckChangeIdNotDefined] =
        useState(false);
    const navigation = useNavigate();
    if (checkChangeIdNotDefined) {
        navigation("/error");
    }
    const getModuleLesson = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/product/getModuleLessonDetailAPI?idCourse=${param.id}`
            );
            setDataModuleAndLesson(response.data.data);
        } catch (error) {}
    };
    const getInfoCourseUseId = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/course/getInfoCourseUseIdAPI?idCourse=${param.id}`
            );
            if (response.data.data.length === 0) {
                setCheckChangeIdNotDefined(true);
            } else {
                setDataInfoCourse(response.data.data[0]);
            }
        } catch (error) {}
    };

    useEffect(() => {
        getModuleLesson();
        getInfoCourseUseId();
    }, [param.id]);
    // Tạo mảng mới
    const [resultData, setResultData] = useState([]);
    let numberSet = 1;
    useEffect(() => {
        const dataLesson = dataModulAndLesson.reduce((arr, obj) => {
            const existingModule = arr.find(
                (item) => item.module_name === obj.module_name
            );

            if (existingModule) {
                existingModule.lesson_name.push(obj.lesson_name);
                existingModule.lesson_id.push(obj.lesson_id);
                numberSet += 1;
            } else {
                arr.push({
                    module_name: obj.module_name,
                    lesson_name: [obj.lesson_name],
                    lesson_id: [obj.lesson_id],
                    offset: numberSet === 1 ? 1 : numberSet,
                });
                numberSet += 1;
            }

            return arr;
        }, []);

        if (dataLesson.length === 0) {
            setResultData(["no lessons yet"]);
        } else {
            setResultData(dataLesson);
        }
    }, [dataModulAndLesson]);
    const resultCourse = dataInfoCourse.resultcourse
        ? dataInfoCourse.resultcourse.split("--hashcode--")
        : "";

    const [cartOriginData, fncSetCartOriginData] = useState([false]);
    const { cartOrigin, fncSetCartOrigin } = useContext(CartContext);
    const [checkhandle, setcheckHandle] = useState(false);
    const AccessToken = localStorage.getItem("accessToken");
    const [dataUser, setDataUser] = useState({});

    // get info user - id
    const fncgetInfoUserByAccessTokenAPI = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/getInfoUserByAccessTokenAPI?accessToken=${AccessToken}`
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
        fncgetInfoUserByAccessTokenAPI();
    }, [localStorage.getItem("accessToken")]);
    //
    const funcGetItemCartUser = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/course/getCartItemsAPI?isIdUser=${dataUser.id}`
            );
            fncSetCartOriginData(response.data.data);
            fncSetCartOrigin(response.data.data);
        } catch (error) {}
    };

    // handle add course -> cart
    const handleAddCart = async (event) => {
        event.preventDefault();
        const funcVerifyToken = await VerifyToken();
        const resultVerify = await funcVerifyToken();
        if (!resultVerify) {
            notifyError("Không thể thực hiện hành động trên !");
            return;
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_URL_BACKEND}/course/addCourseToCartAPI?idCourse=${param.id}&id_user=${dataUser.id}`
            );
            notifySuccess("Thêm thành công !");
            setcheckHandle(!checkhandle);
        } catch (error) {
            notifyError("Đã có lỗi xảy ra !");
        }
    };

    // if success get course free
    const handleCheckOutSuccess = () => {
        Swal.fire({
            icon: "success",
            title: "Xác nhận Hoàn Tất",
            text: "Bạn đã nhận thành công !",
        });
        // handle user success get course
        try {
            navigation("/");
        } catch (error) {}
    };
    const id_course = param.id;

    // handle get course free
    const handleAddCourseFree = async (event) => {
        event.preventDefault();
        if (!dataInfoCourse.course_name || !dataUser.id) {
            notifyError("Vui lòng thử lại sau giây lát !");
            return;
        }
        const funcVerifyToken = await VerifyToken();
        const resultVerify = await funcVerifyToken();
        if (!resultVerify) {
            notifyError("Không thể thực hiện hành động trên !");
            return;
        }
        const dataPost = {
            id_student: dataUser.id,
            ArrId_course: [
                {
                    id_course: id_course,
                    course_name: dataInfoCourse.course_name,
                },
            ],
        };
        try {
            await axios.post(
                `${process.env.REACT_APP_URL_BACKEND}/enrolment/upDataEnrolmentsAPI`,
                dataPost
            );
            handleCheckOutSuccess();
        } catch (error) {}
    };

    const handleDeleteCart = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_URL_BACKEND}/course/deleteCourseCartAPI?idCourse=${param.id}&id_user=${dataUser.id}`
            );
            notifySuccess("Gỡ thành công !");
            setcheckHandle(!checkhandle);
        } catch (error) {
            notifyError("Đã có lỗi xảy ra !");
        }
    };
    useEffect(() => {
        if (dataUser.id) {
            funcGetItemCartUser();
        }
    }, [checkhandle, dataUser]);
    const [dataCourseOfUser, setDataCourseOfUser] = useState([false]);
    const checkCouseOfUser = async () => {
        const funcVerifyToken = await VerifyToken();
        const resultVerify = await funcVerifyToken();
        if (!resultVerify) {
            return;
        }
        try {
            const resposne = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/enrolment/getDataEnrolmentOfUserAPI?user_id=${dataUser.id}`
            );
            setDataCourseOfUser(resposne.data.data);
        } catch (error) {}
    };
    useEffect(() => {
        if (dataUser.id) {
            checkCouseOfUser();
        }
    }, [dataUser.id]);
    const checkFindCourseOfUser = dataCourseOfUser[0]
        ? dataCourseOfUser.find((id) => {
              return id.course_id == param.id;
          })
        : "";

    // settime out sleketon
    const [showSkeleton, setShowSkeleton] = useState(true);
    useEffect(() => {
        // Set timeout after 2 seconds to hide the Skeleton and show the <h3> element
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 2000);

        // Clean up the timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    // config price course
    function formatCurrency(input) {
        const numberWithCommas = input
            .replace(/[,.đ]/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return numberWithCommas === "free"
            ? numberWithCommas
            : numberWithCommas + "đ";
    }
    return (
        <main>
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
            <div className="title_header-detal-cr">
                <h1 className="title_DetailCourse">
                    {dataInfoCourse.course_name
                        ? dataInfoCourse.course_name
                        : ""}
                </h1>
            </div>
            <div className="container-main">
                <div className="header_container-main">
                    <div className="content_container-main">
                        <div className="detail-describe detail_description">
                            <h2>Mô Tả</h2>
                            {dataInfoCourse.course_description ? (
                                Parser(dataInfoCourse.course_description)
                            ) : (
                                <Skeleton
                                    width={"100%"}
                                    height={"40px"}
                                    count={2}
                                    duration={2}
                                    className="skeleton-css"
                                    baseColor="#faf9ff"
                                    highlightColor="#dadada"
                                />
                            )}
                            <ul>
                                <span className="will-learn_detail-cr">
                                    Bạn sẽ học được gì ?
                                </span>
                                {resultCourse ? (
                                    resultCourse.map((el) => {
                                        return (
                                            <li>
                                                <span class="material-symbols-outlined icon_done">
                                                    done
                                                </span>
                                                <span className="detail_list-des">
                                                    {el}
                                                </span>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <Skeleton
                                        width={"100%"}
                                        height={"20px"}
                                        duration={2}
                                        count={5}
                                        className="skeleton-css"
                                        baseColor="#faf9ff"
                                        highlightColor="#dadada"
                                    />
                                )}
                            </ul>
                        </div>
                        <div className="detail-describe">
                            <h2>Danh sách bài Học</h2>
                            {/**cart */}
                            {resultData &&
                            resultData.length &&
                            resultData[0] !== "no lessons yet" ? (
                                resultData.map((el, index) => {
                                    return (
                                        <ModulesLession
                                            title={el.module_name}
                                            arrLesson={el.lesson_name}
                                            arrIdLesson={el.lesson_id}
                                            indexModule={index + 1}
                                            id_course={param.id}
                                            numberIndex={el.offset}
                                            checkBuyCourse={
                                                checkFindCourseOfUser
                                            }
                                        />
                                    );
                                })
                            ) : (
                                <>
                                    {showSkeleton && (
                                        <>
                                            <Skeleton
                                                width={"100%"}
                                                height={"32px"}
                                                duration={2}
                                                count={1}
                                                className="skeleton-css"
                                                baseColor="#faf9ff"
                                                highlightColor="#dadada"
                                            />
                                            <Skeleton
                                                width={"100%"}
                                                height={"20px"}
                                                duration={2}
                                                count={5}
                                                className="skeleton-css"
                                                baseColor="#faf9ff"
                                                highlightColor="#dadada"
                                            />
                                        </>
                                    )}
                                    {!showSkeleton && (
                                        <h3>
                                            Nội dung Khóa học đang được cập
                                            nhật...
                                        </h3>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="detail-info">
                        <div className="image-detail">
                            {dataInfoCourse.image_course ? (
                                <img
                                    className="img_course-detail"
                                    src={`${dataInfoCourse.image_course}`}
                                    alt="image_Course"
                                />
                            ) : (
                                <Skeleton
                                    width={"100%"}
                                    height={"100%"}
                                    duration={1}
                                    count={1}
                                    className="skeleton-css"
                                    baseColor="#f0f0f0"
                                    highlightColor="#c6c6c6"
                                />
                            )}
                        </div>
                        <div
                            className={`detail-price ${
                                checkFindCourseOfUser ? "hidden" : ""
                            }`}
                        >
                            {dataInfoCourse.course_price ? (
                                formatCurrency(dataInfoCourse.course_price)
                            ) : (
                                <Skeleton
                                    width={"100%"}
                                    height={"20px"}
                                    duration={2}
                                    count={1}
                                    className="skeleton-css"
                                    baseColor="#faf9ff"
                                    highlightColor="#dadada"
                                />
                            )}
                        </div>
                        <p>
                            {dataInfoCourse.user_name ? (
                                `Giảng viên: ${dataInfoCourse.user_name}`
                            ) : (
                                <Skeleton
                                    width={"100%"}
                                    height={"20px"}
                                    duration={2}
                                    count={1}
                                    className="skeleton-css"
                                    baseColor="#faf9ff"
                                    highlightColor="#dadada"
                                />
                            )}
                        </p>
                        {dataInfoCourse.image_course ? (
                            <p>Không giới hạn thời gian</p>
                        ) : (
                            <Skeleton
                                width={"100%"}
                                height={"20px"}
                                duration={2}
                                count={1}
                                className="skeleton-css"
                                baseColor="#faf9ff"
                                highlightColor="#dadada"
                            />
                        )}

                        {dataInfoCourse.image_course ? (
                            <div className="detail_button">
                                {dataCourseOfUser[0] &&
                                checkFindCourseOfUser &&
                                resultData.length &&
                                resultData[0] &&
                                resultData[0].lesson_id ? (
                                    <Link
                                        to={
                                            resultData
                                                ? `/detail-course/${param.id}/view-video/${resultData[0].lesson_id[0]}?numberLesson=${resultData[0].offset}`
                                                : "#"
                                        }
                                    >
                                        <button>Vào Học Ngay !</button>
                                    </Link>
                                ) : cartOriginData[0] === false ? (
                                    <>
                                        <div
                                            className=""
                                            style={{
                                                width: "100%",
                                                height: "60px",
                                            }}
                                        >
                                            <Skeleton
                                                width={"100%"}
                                                height={"40px"}
                                                duration={2}
                                                count={1}
                                                className="skeleton-css"
                                                baseColor="#faf9ff"
                                                highlightColor="#dadada"
                                            />
                                        </div>
                                    </>
                                ) : cartOriginData.length &&
                                  cartOriginData.find(
                                      (element) => element.course_id == param.id
                                  ) ? (
                                    <a onClick={handleDeleteCart} href="#">
                                        <button className="delete-cart">
                                            Gỡ khỏi giỏ hàng
                                        </button>
                                    </a>
                                ) : resultData[0] === "no lessons yet" ? (
                                    <a
                                        onClick={(e) => {
                                            e.preventDefault();
                                            notifyWarning(
                                                "Khóa học đang xây dựng, chưa có bài học !"
                                            );
                                        }}
                                        href="#"
                                        className="course-no-lessson"
                                    >
                                        <button>Chưa có bài học</button>
                                    </a>
                                ) : dataInfoCourse.course_price === "free" ? (
                                    <a onClick={handleAddCourseFree} href="#">
                                        <button>Lấy khóa học miễn phí</button>
                                    </a>
                                ) : (
                                    <a onClick={handleAddCart} href="#">
                                        <button>Thêm vào giỏ hàng</button>
                                    </a>
                                )}
                            </div>
                        ) : (
                            <h1>heheheh</h1>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};
