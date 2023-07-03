import React, { useContext, useState } from "react";
import faceook from "../assets/image/facebookBlue.png";
import google from "../assets/image/chrome.png";
import "../assets/style/Login/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners"; // loading
import { ToastContainer, toast } from "react-toastify"; // toast
import axios from "axios";
import { RoleContext } from "../context/RoleContext";
export const Login = () => {
    const delay = async (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const notify = (content) => toast.error(content);
    const { isRole, setUser } = useContext(RoleContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email, password };
        setIsLoading(true);
        await delay(1000);
        setIsLoading(false);
        if (!email || !password) {
            return notify("vui lòng nhập đầy đủ thông tin !");
        }
        console.log("data:", data);
        try {
            const response = await axios.post(
                "http://localhost:8081/loginAPI",
                data,
                { withCredentials: true } // bat cai nay len moi nhan cookie đc
            );
            console.log("ressssssssssssssssss: ", response.data);
            if (response.data.role) {
                setUser(response.data.role);
            }
            localStorage.setItem("accessToken", response.data.tokenAcessUser);
            localStorage.setItem("nameUser", response.data.name);
            console.log("accessToken", response.data.tokenAcessUser);
            return navigate("/");
        } catch (error) {
            console.log("error: ", error);
            notify(error.response.data.EC);
        }
    };
    if (localStorage.getItem("accessToken")) {
        navigate("/");
    }
    return (
        <main>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="form-log-in">
                <div className="form_all_login">
                    <h2 className="h2-login">Đăng Nhập Hệ Thống</h2>
                    <div className="main_form-log_in">
                        <form action="" onSubmit={handleSubmit}>
                            <input
                                className="input-log-in"
                                type="email"
                                id="fname"
                                name="fname"
                                placeholder="Email..."
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br />
                            <input
                                className="input-log-in password-login"
                                type="password"
                                id="lname"
                                name="lname"
                                placeholder="Mật Khẩu..."
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br />
                            <div className="forget_password">
                                <i>
                                    <Link
                                        className="a_forget_password"
                                        to="/forgetPassword"
                                    >
                                        Quên Mật Khẩu ?
                                    </Link>
                                </i>
                            </div>
                            <button type="submit" className="button-sign-in">
                                {isLoading ? (
                                    <BeatLoader color="#ffffff" size={8} />
                                ) : (
                                    "Đăng Nhập"
                                )}
                            </button>
                        </form>
                        <span className="span_form-log-in">
                            Có Thể Đăng Nhập Bằng
                        </span>
                        <div className="icon_login">
                            <img
                                className="facebook_log-in"
                                src={faceook}
                                alt=""
                            />
                            <img
                                className="google_log-in"
                                src={google}
                                alt=""
                            />
                        </div>
                        <span className="span_form-log-in">
                            Bạn Chưa Có Tài Khoản?{" "}
                            <Link to="/register">Đăng Kí</Link>
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
};
