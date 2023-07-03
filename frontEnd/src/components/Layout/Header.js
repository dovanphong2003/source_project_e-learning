import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/image/logo.png";
import name_logo from "../../assets/image/name_logo.png";
import "../../assets/style/styleHeader.css";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CheckToken } from "../Sections/CheckToken";
import { RefeshToken } from "../Sections/RefeshToken";
import { DeleteCookie } from "../Sections/DeleteToken";
import { Loading } from "./Loading";
import Swal from "sweetalert2";
import { RoleContext } from "../../context/RoleContext";
import { accessToken } from "../../context/AccessToken";
import axios from "axios";
export const Header = () => {
    const { isAccess, getIsAccess } = useContext(accessToken);
    useEffect(() => {
        getIsAccess(localStorage.getItem("accessToken"));
    }, []);
    const { isRole, setUser } = useContext(RoleContext);
    const navigate = useNavigate();
    const [getIdUser, checkGetIdUser] = useState("");
    const location = useLocation();
    const [checkLogin, setCheckLogin] = useState(false);
    const [hd, setHd] = useState(false);

    // delete Refresh Cookie
    const deleteRefreshCookie = async () => {
        const result = await DeleteCookie();
    };
    const [search, setSearch] = useState("");
    useEffect(() => {
        if (hd === true) {
            setHd(false);
        }
        const time = 2000 + Math.floor(Math.random() * 4) * 1000;
        const reloadPage = async () => {
            await setTimeout(() => {
                setHd(true);
            }, time);
        };
        if (location.pathname === "/log-in" || location.pathname === "/") {
            reloadPage();
        } else {
            setHd(true);
        }

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
                    setCheckLogin(false);
                    navigate("/log-in");
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
                }
                checkGetIdUser(response.id);
                if (isRole !== "virtualUser") {
                    setUser(response.role);
                }
                setCheckLogin(true);
            } catch (error) {
                console.log(333333333333);
                // Xử lý lỗi nếu có
                console.log("errrrrrrrrrrrrr: ", error);
            }
        };

        verifyToken();
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
    // get name user

    return (
        <header>
            <Loading hd={hd} />
            <div className="header-flex">
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
                <form action={`/search/`} className="form-header" method="GET">
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
                        <span>2</span>
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
                                <span className="fnc-user">
                                    <Link toe={{ cursor: "text" }} href="#">
                                        xin chào !
                                    </Link>
                                </span>
                            </button>

                            <button className="info-user-sig_in">
                                <span class="material-symbols-outlined">
                                    edit
                                </span>
                                <span className="fnc-user">
                                    <Link to={`/info-user/${getIdUser}`}>
                                        Chỉnh sửa trang cá nhân
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
                <div className="language">
                    <span class="icon-language material-symbols-outlined">
                        language
                    </span>
                </div>
            </div>
        </header>
    );
};
