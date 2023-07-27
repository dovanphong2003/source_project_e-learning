import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/image/logo.png";
import name_logo from "../../assets/image/name_logo.png";
import "../../assets/style/styleHeader.css";
import "../../assets/style/responsiveCss/resHeader.css";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CheckToken } from "../Sections/CheckToken";
import { RefeshToken } from "../Sections/RefeshToken";
import { DeleteCookie } from "../Sections/DeleteToken";
import { Loading } from "./Loading";
import Swal from "sweetalert2";
import { RoleContext } from "../../context/RoleContext";
import { accessToken } from "../../context/AccessToken";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
export const Header = () => {
    const { isAccess, getIsAccess } = useContext(accessToken);
    useEffect(() => {
        getIsAccess(localStorage.getItem("accessToken"));
    }, []);
    const { isRole, setUser, isIdUser, getIdUser, checkVerify } =
        useContext(RoleContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [checkLogin, setCheckLogin] = useState(false);
    const [hd, setHd] = useState(false);

    // delete Refresh Cookie
    const deleteRefreshCookie = async () => {
        const result = await DeleteCookie();
    };
    useEffect(() => {
        if (hd === true) {
            setHd(false);
        }
        // const time = 2000 + Math.floor(Math.random() * 4) * 1000;
        const time = 1000;
        const reloadPage = async () => {
            await setTimeout(() => {
                setHd(true);
            }, time);
        };
        if (location.pathname === "/") {
            reloadPage();
        } else {
            setHd(true);
        }

        const fncCheckLogin = async () => {
            if (
                !(
                    location.pathname === "/log-in" ||
                    location.pathname === "/register" ||
                    location.pathname === "/forgetPassword" ||
                    location.pathname === "/"
                ) &&
                !localStorage.getItem("accessToken")
            ) {
                deleteRefreshCookie();
                setCheckLogin(false);
                navigate("/log-in");
                await Swal.fire({
                    icon: "error",
                    title: "Huynh đài dừng bước !",
                    text: "Vui lòng đăng nhập",
                }).then(() => {
                    // navigate("/log-in");
                });
            }
        };
        fncCheckLogin();
    }, [location.pathname]);
    if (localStorage.getItem("accessToken")) {
        const verifyToken = async () => {
            try {
                const response = await CheckToken();
                if (response === "jwt expired") {
                    const newtoken = await RefeshToken();
                    getIsAccess(newtoken);
                    localStorage.setItem("accessToken", newtoken);
                }
                if (response === "jwt malformed") {
                    deleteRefreshCookie();
                    setCheckLogin(false);
                    navigate("/log-in");
                    // const newtoken = await RefeshToken();
                    // getIsAccess(newtoken);
                    return;
                }
                getIdUser(response.id);
                if (isRole !== "virtualUser") {
                    setUser(response.role);
                }
                setCheckLogin(true);
            } catch (error) {
                // Xử lý lỗi nếu có
                console.log("errrrrrrrrrrrrr: ", error);
            }
        };
        if (checkVerify) {
            verifyToken();
        } else {
            verifyToken();
        }
    } else {
        console.log("không có access token");
    }

    // get data API categories
    const [categories, setCategories] = useState([]);
    const dataCategories = async () => {
        const response = await axios.get(
            "http://localhost:8081/product/getAllProductAPI"
        );

        setCategories(response.data.data);
    };
    useEffect(() => {
        dataCategories();
    }, []);
    const nameUser = localStorage.getItem("nameUser");

    // get cartItem
    const { cartOrigin, fncSetCartOrigin } = useContext(CartContext);
    const funcGetItemCartUser = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8081/course/getCartItemsAPI?isIdUser=${isIdUser}`
            );
            console.log("res:", response);
            fncSetCartOrigin(response.data.data);
        } catch (error) {
            console.log("error get item cart user: ", error);
        }
    };
    useEffect(() => {
        if (!cartOrigin.length && isIdUser) {
            funcGetItemCartUser();
        }
    }, [isIdUser]);
    const [hiddenMenu, setHiddenMenu] = useState(true);
    const [hiddenCategory, setHiddenCategory] = useState(true);
    return (
        <header>
            <Loading hd={hd} />
            <div className="header-flex header-all">
                <Link to="/" className="logo">
                    <img
                        className="name_logo"
                        src={name_logo}
                        alt="logo không hiển thị"
                    />
                </Link>
                <nav className="categories">
                    <ul className="list">
                        <Link className="ul-list-header" to="#">
                            Danh Mục
                        </Link>
                        <div className="block_li">
                            {categories
                                ? categories.map((el) => {
                                      return (
                                          <Link
                                              to={`caregories-course/${el.category_id}`}
                                          >
                                              <li
                                                  key={el.category_id}
                                                  className="list-child child-1"
                                              >
                                                  <div className="content-list-child">
                                                      <span className="list-child_category1">
                                                          {el.category_name}
                                                      </span>
                                                      <span class="material-symbols-outlined">
                                                          navigate_next
                                                      </span>
                                                  </div>
                                              </li>
                                          </Link>
                                      );
                                  })
                                : " "}
                        </div>
                    </ul>
                </nav>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const content =
                            document.getElementById(`gsearch`).value;
                        console.log("content get value: ", content);
                        navigate(`/search/?contentSearch=${content}`);

                        // clear
                        document.getElementById(`gsearch`).value = "";
                    }}
                    className="form-header"
                >
                    <button type="submit" className="btn-search-header">
                        <span class="material-symbols-outlined">search</span>
                    </button>
                    <input
                        className="input-header"
                        type="search"
                        id="gsearch"
                        name="contentSearch"
                        autoComplete="off"
                        placeholder="Tìm kiếm bất cứ thứ gì"
                    />
                </form>
                <Link to="/cart" className="cart">
                    <span class="material-symbols-outlined">shopping_cart</span>
                    <div className="number-product">
                        <span>{cartOrigin.length}</span>
                    </div>
                </Link>
                {!checkLogin ? (
                    <div className="log-in btn-header">
                        <Link className="log_in-header" to="/log-in">
                            <span>Đăng Nhập</span>
                        </Link>
                    </div>
                ) : (
                    ""
                )}
                {!checkLogin ? (
                    <div className="sign-up btn-header">
                        <Link to="/register" className="sign_up-header">
                            <span>Đăng Kí</span>
                        </Link>
                    </div>
                ) : isRole === "virtualUser" ? (
                    <div className="log-in btn-header">
                        <Link
                            onClick={() => {
                                setUser("admin");
                            }}
                            className="log_in-header"
                            to="/"
                        >
                            <span>Quản Trị Viên</span>
                        </Link>
                    </div>
                ) : (
                    // <button className="admin-website_header">
                    //     <Link to="">
                    //         {" "}
                    //         <span className="link-admin-website">
                    //             Quản Trị Viên
                    //         </span>
                    //     </Link>
                    // </button>
                    <div className="info_user">
                        <span>
                            Xin chào, {nameUser ? nameUser : "Xin Chào !"}
                        </span>
                        <div className="info_was-sig-in">
                            <button
                                style={{ cursor: "text" }}
                                className="info-user-sig_in"
                            >
                                <span class="material-symbols-outlined">
                                    account_circle
                                </span>
                            </button>

                            <button className="info-user-sig_in">
                                <span class="material-symbols-outlined">
                                    edit
                                </span>
                                <span className="fnc-user">
                                    <Link to={`/info-user/${isIdUser}`}>
                                        Thông tin cá nhân
                                    </Link>
                                </span>
                            </button>

                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    deleteRefreshCookie();
                                    setCheckLogin(false);
                                    navigate("/log-in");
                                }}
                                className="info-user-sig_in"
                            >
                                <span class="material-symbols-outlined">
                                    logout
                                </span>
                                <span className="fnc-user">
                                    <Link to="">Đăng xuất</Link>
                                </span>
                            </button>
                        </div>
                    </div>
                )}
                {/* <div className="language">
                    <span class="icon-language material-symbols-outlined">
                        language
                    </span>
                </div> */}
            </div>{" "}
            <div className="header-flex header-mobile">
                <Link to="/" className="logo">
                    <img
                        className="name_logo"
                        src={name_logo}
                        alt="logo không hiển thị"
                    />
                </Link>
                <nav
                    onClick={() => {
                        setHiddenCategory(!hiddenCategory);
                    }}
                    className="categories"
                >
                    <ul className="list">
                        <Link
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                            className="ul-list-header"
                            to="#"
                        >
                            Danh Mục
                        </Link>
                        <div
                            className={`${
                                hiddenCategory ? "hidden" : ""
                            } block_li`}
                        >
                            {categories
                                ? categories.map((el) => {
                                      return (
                                          <Link
                                              to={`caregories-course/${el.category_id}`}
                                          >
                                              <li
                                                  key={el.category_id}
                                                  className="list-child child-1"
                                              >
                                                  <div className="content-list-child">
                                                      <span className="list-child_category1">
                                                          {el.category_name}
                                                      </span>
                                                      <span class="material-symbols-outlined">
                                                          navigate_next
                                                      </span>
                                                  </div>
                                              </li>
                                          </Link>
                                      );
                                  })
                                : " "}
                        </div>
                    </ul>
                </nav>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const content =
                            document.getElementById(`gsearch`).value;
                        console.log("content get value: ", content);
                        navigate(`/search/?contentSearch=${content}`);

                        // clear
                        document.getElementById(`gsearch`).value = "";
                    }}
                    className="form-header"
                >
                    <button type="submit" className="btn-search-header">
                        <span class="material-symbols-outlined">search</span>
                    </button>
                    <input
                        className="input-header"
                        type="search"
                        id="gsearch"
                        name="contentSearch"
                        autoComplete="off"
                        placeholder="Tìm kiếm..."
                    />
                </form>
                <Link to="/cart" className="cart">
                    <span class="material-symbols-outlined">shopping_cart</span>
                    <div className="number-product">
                        <span>{cartOrigin.length}</span>
                    </div>
                </Link>
                {!checkLogin ? (
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            setHiddenMenu(!hiddenMenu);
                        }}
                        className="info_user"
                    >
                        <span class="material-symbols-outlined">menu</span>
                        <div
                            className={`${
                                hiddenMenu ? "hidden" : ""
                            } info_was-sig-in`}
                        >
                            <Link to="/log-in" className="info-user-sig_in">
                                <div className="log-in btn-header">
                                    <Link
                                        className="log_in-header"
                                        to="/log-in"
                                    >
                                        <span>Đăng Nhập</span>
                                    </Link>
                                </div>
                            </Link>

                            <Link
                                to="/register"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                                className="info-user-sig_in"
                            >
                                <div className="sign-up btn-header">
                                    <Link
                                        to="/register"
                                        className="sign_up-header"
                                    >
                                        <span>Đăng Kí</span>
                                    </Link>
                                </div>
                            </Link>
                        </div>
                    </div>
                ) : isRole === "virtualUser" ? (
                    <div className="log-in btn-header bnt-go-page-admin">
                        <Link
                            onClick={() => {
                                setUser("admin");
                            }}
                            className="log_in-header"
                            to="/"
                        >
                            <span>Quản Trị Viên</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="info_user">
                            <div
                                className={` info_was-sig-in ${
                                    hiddenMenu ? "hidden" : ""
                                }`}
                            >
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                    style={{ cursor: "text" }}
                                    className="info-user-sig_in bnt-hello-user"
                                >
                                    Xin chào,{" "}
                                    {nameUser ? nameUser : "Xin Chào !"}
                                </button>

                                <button className="info-user-sig_in">
                                    <span class="material-symbols-outlined">
                                        edit
                                    </span>
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setHiddenMenu(!hiddenMenu);
                                        }}
                                        className="fnc-user"
                                    >
                                        <Link to={`/info-user/${isIdUser}`}>
                                            Thông tin cá nhân
                                        </Link>
                                    </span>
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        deleteRefreshCookie();
                                        setCheckLogin(false);
                                        navigate("/log-in");
                                        setHiddenMenu(!hiddenMenu);
                                    }}
                                    className="info-user-sig_in"
                                >
                                    <span class="material-symbols-outlined">
                                        logout
                                    </span>
                                    <span className="fnc-user">
                                        <Link to="">Đăng xuất</Link>
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                setHiddenMenu(!hiddenMenu);
                            }}
                            className="img-user-default"
                        >
                            <img
                                className="img-default-user"
                                src="/imageUserDefault.png"
                                alt=""
                            />
                        </div>
                    </>
                )}
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const content = document.getElementById(`gsearch2`).value;
                    console.log("content get value: ", content);
                    navigate(`/search/?contentSearch=${content}`);

                    // clear
                    document.getElementById(`gsearch2`).value = "";
                }}
                className="form-header btn-search-for-mobile"
            >
                <button type="submit" className="btn-search-header ">
                    <span class="material-symbols-outlined">search</span>
                </button>
                <input
                    className="input-header"
                    type="search"
                    id="gsearch2"
                    name="contentSearch"
                    autoComplete="off"
                    placeholder="Tìm kiếm..."
                />
            </form>
        </header>
    );
};
