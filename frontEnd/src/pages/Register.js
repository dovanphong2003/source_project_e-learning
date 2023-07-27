import { useState } from "react";
import "../assets/style/Login/register.css";
import "../assets/style/responsiveCss/resRegister.css";

import { Link } from "react-router-dom";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners"; // loading
export const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [nameRegister, setNameRegster] = useState("");
    const [emailRegister, setEmailRegster] = useState("");
    const [passwordRegister, setPasswordRegster] = useState("");
    const [replyPasswordRegister, setReplyPasswordRegster] = useState("");
    const notify = (content) => toast.error(content);
    const navigation = useNavigate();
    if (localStorage.getItem("accessToken")) {
        navigation("/");
    }
    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await delay(1000);
        setIsLoading(false);
        if (passwordRegister !== replyPasswordRegister) {
            return notify("Mật Khẩu Không Khớp!");
        }
        if (passwordRegister.length < 8) {
            return notify("Mật khẩu tối thiểu 8 kí tự !");
        }
        if (
            !passwordRegister ||
            !replyPasswordRegister ||
            !emailRegister ||
            !nameRegister
        ) {
            return notify("vui lòng điền đầy đủ thông tin !");
        }
        const data = {
            name: nameRegister,
            email: emailRegister,
            password: passwordRegister,
        };
        try {
            const response = await axios.post(
                "http://localhost:8081/registerAPI",
                data
            );
            document.getElementById("name_register").value = "";
            document.getElementById("email_register").value = "";
            document.getElementById("password_register").value = "";
            document.getElementById("reply-password_register").value = "";
            await Swal.fire(
                `${response.data.response}`,
                "bạn có thể đăng nhập",
                "success"
            );
            return navigation("/log-in");
        } catch (error) {
            console.log("error: ", error);
            return notify(error);
        }
    };
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
            <div className="form-register">
                <div className="form_all_register">
                    <h2 className="h2-register">Đăng Kí Tài Khoản</h2>
                    <div className="main_form-register">
                        <form action="" onSubmit={handleSubmitRegister}>
                            <input
                                className="input-register"
                                type="text"
                                id="name_register"
                                name="fname"
                                onChange={(e) => {
                                    setNameRegster(e.target.value);
                                }}
                                placeholder="Họ Và Tên..."
                            />
                            <br />
                            <input
                                className="input-register"
                                type="email"
                                id="email_register"
                                name="fname"
                                onChange={(e) => {
                                    setEmailRegster(e.target.value);
                                }}
                                placeholder="Email..."
                            />
                            <br />
                            <input
                                className="input-register"
                                type="password"
                                id="password_register"
                                name="lname"
                                onChange={(e) => {
                                    setPasswordRegster(e.target.value);
                                }}
                                placeholder="Mật Khẩu..."
                            />
                            <br />
                            <input
                                className="input-register retypeAccount password-register"
                                type="password"
                                id="reply-password_register"
                                name="replyAcc"
                                onChange={(e) => {
                                    setReplyPasswordRegster(e.target.value);
                                }}
                                placeholder="Nhập Lại Mật Khẩu..."
                            />
                            <br />
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="button-register"
                            >
                                {isLoading ? (
                                    <BeatLoader color="#ffffff" size={8} />
                                ) : (
                                    "Đăng ký"
                                )}
                            </button>
                        </form>
                        <span className="span_form-register">
                            Bạn Đã Có Tài Khoản?{" "}
                            <Link to="/log-in">Đăng Nhập</Link>
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
};
