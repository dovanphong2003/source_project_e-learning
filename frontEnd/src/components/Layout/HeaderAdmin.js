import { useEffect, useState } from "react";
import name_logo from "../../assets/image/name_logo.png";
import "../../assets/style/headerAdmin.css";
import "../../assets/style/responsiveCss/resHeaderAdmin.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { DeleteCookie } from "../Sections/DeleteToken";
export const HeaderAdmin = ({ setRoleUser }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [clickDashbroad, setClickDashbroad] = useState(false);
    const [setHidden, checkSetHidden] = useState(false);
    const deleteRefreshCookie = async () => {
        const result = await DeleteCookie();
    };

    useEffect(() => {
        const fncCheckLogin = async () => {
            if (
                !(
                    location.pathname === "/log-in" ||
                    location.pathname === "/register" ||
                    location.pathname === "/forgetPassword"
                ) &&
                !localStorage.getItem("accessToken")
            ) {
                await Swal.fire({
                    icon: "error",
                    title: "Lỗi nặng rồi bro !",
                    text: "Vui lòng đăng nhập 😄",
                }).then(() => {
                    deleteRefreshCookie();
                    navigate("/log-in");
                });
            }
        };
        fncCheckLogin();
    }, [location.pathname]);
    return (
        <>
            <header className="header_bgrcl header-admin-all">
                <div
                    onClick={() => {
                        setClickDashbroad(!clickDashbroad);
                    }}
                    className={`${clickDashbroad ? "" : "hidden"} modal`}
                ></div>
                <div className="header-flex header-admin">
                    <div className="block1-header-admin">
                        <Link to="" className="logo logo-haeder-admin">
                            <img
                                className="name_logo"
                                src={name_logo}
                                alt="logo không hiển thị"
                            />
                            <div className="title-header">Study E-learning</div>
                        </Link>
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                if (
                                    localStorage.getItem("role") &&
                                    localStorage.getItem("role") === "admin"
                                ) {
                                    localStorage.setItem("role", "virtualUser");
                                    setRoleUser("virtualUser");
                                }
                                navigate("/");
                            }}
                            className="log-in btn-header visite-website bgr-admin-header"
                        >
                            <Link className="visited-website_content" to="/">
                                <span>Xem Website</span>
                            </Link>
                        </div>
                    </div>
                    <div className="block2-header-admin">
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                setClickDashbroad(!clickDashbroad);
                            }}
                            className={`control-header-admin`}
                        >
                            <span
                                class={`${
                                    clickDashbroad ? "" : "cl-white"
                                }  dashboard-icon material-symbols-outlined`}
                            >
                                grid_view
                            </span>
                            <div
                                className={` ${
                                    clickDashbroad ? "animate-show" : ""
                                } ${
                                    clickDashbroad ? "" : "hidden"
                                } table-control-header-admin`}
                            >
                                <div className="header-table-control_header-admin">
                                    <span>Hành Động Nhanh</span>
                                </div>
                                <div className="control-speed-header-table-control">
                                    <div className="element-control_header-table border_right border_bottom">
                                        <Link to="/admin-website/course">
                                            <span class="material-symbols-outlined">
                                                queue_play_next
                                            </span>
                                            <p>Thêm khóa học</p>
                                        </Link>
                                    </div>
                                    <div className="element-control_header-table border_left border_bottom">
                                        <Link to="/admin-website/AddLessonCourse">
                                            <span class="material-symbols-outlined">
                                                skip_next
                                            </span>
                                            <p>Thêm bài học</p>
                                        </Link>
                                    </div>
                                    <div className="element-control_header-table border_right">
                                        <Link to="/admin-website/dash-broad-add-student">
                                            <span class="material-symbols-outlined">
                                                person_add
                                            </span>
                                            <p>Thêm học viên</p>
                                        </Link>
                                    </div>
                                    <div className="element-control_header-table">
                                        <Link to="/admin-website/dash-broad-add-envirolment">
                                            <span class="material-symbols-outlined">
                                                format_list_bulleted_add
                                            </span>
                                            <p>Ghi danh học viên</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                checkSetHidden(!setHidden);
                            }}
                            className="frame-admin"
                        >
                            <img
                                src="/image/image_admin.jpg"
                                alt=""
                                className="img-frame-admin"
                            />
                            <div className="info-frame-admin">
                                <span>
                                    {localStorage.getItem("nameUser")
                                        ? localStorage.getItem("nameUser")
                                        : "Loading..."}
                                </span>
                                <p>Admin</p>
                                <div
                                    className={`info_was-sig-in_admin ${
                                        setHidden ? "" : "hidden"
                                    } `}
                                >
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            localStorage.setItem(
                                                "role",
                                                "student"
                                            );
                                            deleteRefreshCookie();
                                            setRoleUser("student");
                                            navigate("/log-in");
                                        }}
                                        className="info-user-sig_in"
                                    >
                                        <span class="material-symbols-outlined">
                                            logout
                                        </span>
                                        <span className="fnc-user">
                                            <Link to="#">Đăng xuất</Link>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/** header for mobile  */}
            <header className="header_bgrcl header-admin-mobile">
                <div
                    onClick={() => {
                        setClickDashbroad(!clickDashbroad);
                    }}
                    className={`${clickDashbroad ? "" : "hidden"} modal`}
                ></div>
                <div className="header-flex header-admin">
                    <div className="block1-header-admin">
                        <Link to="" className="logo logo-haeder-admin">
                            <img
                                className="name_logo"
                                src={name_logo}
                                alt="logo không hiển thị"
                            />
                        </Link>
                    </div>
                    <div className="block2-header-admin">
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                setClickDashbroad(!clickDashbroad);
                            }}
                            className={`control-header-admin`}
                        >
                            <span
                                class={`${
                                    clickDashbroad ? "" : "cl-white"
                                }  dashboard-icon material-symbols-outlined`}
                            >
                                grid_view
                            </span>
                            <div
                                className={` ${
                                    clickDashbroad ? "animate-show" : ""
                                } ${
                                    clickDashbroad ? "" : "hidden"
                                } table-control-header-admin`}
                            >
                                <div className="header-table-control_header-admin">
                                    <span>Hành Động Nhanh</span>
                                </div>
                                <div className="control-speed-header-table-control">
                                    <div className="element-control_header-table border_right border_bottom">
                                        <Link to="/admin-website/course">
                                            <span class="material-symbols-outlined">
                                                queue_play_next
                                            </span>
                                            <p>Thêm khóa học</p>
                                        </Link>
                                    </div>
                                    <div className="element-control_header-table border_left border_bottom">
                                        <Link to="/admin-website/AddLessonCourse">
                                            <span class="material-symbols-outlined">
                                                skip_next
                                            </span>
                                            <p>Thêm bài học</p>
                                        </Link>
                                    </div>
                                    <div className="element-control_header-table border_right">
                                        <Link to="/admin-website/dash-broad-add-student">
                                            <span class="material-symbols-outlined">
                                                person_add
                                            </span>
                                            <p>Thêm học viên</p>
                                        </Link>
                                    </div>
                                    <div className="element-control_header-table">
                                        <Link to="/admin-website/dash-broad-add-envirolment">
                                            <span class="material-symbols-outlined">
                                                format_list_bulleted_add
                                            </span>
                                            <p>Ghi danh học viên</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                checkSetHidden(!setHidden);
                            }}
                            className="frame-admin"
                        >
                            <img
                                src="/image/image_admin.jpg"
                                alt=""
                                className="img-frame-admin"
                            />
                            <div className="info-frame-admin">
                                <span>
                                    {localStorage.getItem("nameUser")
                                        ? localStorage.getItem("nameUser")
                                        : "Loading..."}
                                </span>
                                <p>Admin</p>
                                <div
                                    className={`info_was-sig-in_admin ${
                                        setHidden ? "" : "hidden"
                                    } `}
                                >
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            deleteRefreshCookie();
                                            setRoleUser("student");
                                            navigate("/log-in");
                                        }}
                                        className="info-user-sig_in"
                                    >
                                        <span class="material-symbols-outlined">
                                            logout
                                        </span>
                                        <span className="fnc-user">
                                            <Link to="#">Đăng xuất</Link>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        if (
                            localStorage.getItem("role") &&
                            localStorage.getItem("role") === "admin"
                        ) {
                            localStorage.setItem("role", "virtualUser");
                            setRoleUser("virtualUser");
                        }
                        navigate("/");
                    }}
                    className="log-in btn-header visite-website bgr-admin-header"
                >
                    <Link className="visited-website_content" to="/">
                        <span>Xem Website</span>
                    </Link>
                </div>
            </header>
        </>
    );
};
