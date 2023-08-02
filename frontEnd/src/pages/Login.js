import React, { useContext, useEffect, useState } from "react";
import faceook from "../assets/image/facebookBlue.png";
import google from "../assets/image/chrome.png";
import "../assets/style/Login/login.css";
import "../assets/style/responsiveCss/resLogin.css";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners"; // loading
import { ToastContainer, toast } from "react-toastify"; // toast
import axios from "axios";
import { RoleContext } from "../context/RoleContext";
import { FireBaseLogin } from "../assets/firebase/ConfigLoginFirebase";

// login google, facebook
import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithPopup,
    getRedirectResult,
    FacebookAuthProvider,
} from "firebase/auth";

export const Login = () => {
    const delay = async (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const notify = (content) => toast.error(content);
    const notifySuccess = (content) => toast.success(content);
    const { isRole, setUser, infoUser, getInfoUser } = useContext(RoleContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email, password, checkLogin: "normal" };
        setIsLoading(true);
        await delay(1000);
        setIsLoading(false);
        if (!email || !password) {
            return notify("vui lòng nhập đầy đủ thông tin !");
        }
        console.log("data:", data);
        try {
            const response = await axios.post(
                `${process.env.URL_BACKEND}/loginAPI`,
                data,
                { withCredentials: true } // bat cai nay len moi nhan cookie đc
            );
            console.log("user roel: ", response.data.role);
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

    // handle login with google
    const handleLoginGoogle = async (event) => {
        event.preventDefault();

        // login google
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider); // sign-in, if success --> data user
            const credential = GoogleAuthProvider.credentialFromResult(result);

            // accesstoken
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user; // info user
            getInfoUser(user.reloadUserInfo); // get info user

            // login --------------
            try {
                const data = {
                    email: user.reloadUserInfo.email,
                    password: user.reloadUserInfo.localId,
                    checkLogin: "google",
                };
                const response = await axios.post(
                    `${process.env.URL_BACKEND}/loginAPI`,
                    data,
                    { withCredentials: true } // bat cai nay len moi nhan cookie đc
                );
                if (response.data.role) {
                    setUser(response.data.role);
                }
                localStorage.setItem(
                    "accessToken",
                    response.data.tokenAcessUser
                );
                localStorage.setItem("nameUser", response.data.name);
                return navigate("/");
            } catch (error) {
                // if user not defined account of website
                notifySuccess("Đang tạo tài khoản...");

                // create account...
                try {
                    const data = {
                        name: user.reloadUserInfo.displayName,
                        email: user.reloadUserInfo.email,
                        password: user.reloadUserInfo.localId,
                        avatar_url: user.reloadUserInfo.photoUrl,
                    };
                    const response = await axios.post(
                        `${process.env.URL_BACKEND}/registerAPI`,
                        data
                    );

                    // if create success --> login for user !
                    if (response.data.response) {
                        const data = {
                            email: user.reloadUserInfo.email,
                            password: user.reloadUserInfo.localId,
                            checkLogin: "google",
                        };
                        const response = await axios.post(
                            `${process.env.URL_BACKEND}/loginAPI`,
                            data,
                            { withCredentials: true } // bat cai nay len moi nhan cookie đc
                        );
                        if (response.data.role) {
                            setUser(response.data.role);
                        }
                        localStorage.setItem(
                            "accessToken",
                            response.data.tokenAcessUser
                        );
                        localStorage.setItem("nameUser", response.data.name);
                        return navigate("/");
                    } else {
                        notify("Đăng kí không thành công !");
                    }
                } catch (error) {
                    console.log(
                        "error handle register account google: ",
                        error
                    );
                    if (error.response && error.response.data) {
                        return notify(error.response.data.errorcode);
                    }
                }
            }
        } catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("error handle login google: ", error);
            // ...
        }
    };

    // handle login with facebook
    const handleLoginFacebook = async (event) => {
        event.preventDefault();
        const providerFacebook = new FacebookAuthProvider();
        const authFacebook = getAuth();
        console.log("da vao den day !");
        try {
            const result = await signInWithPopup(
                authFacebook,
                providerFacebook
            );
            // The signed-in user info.
            const user = result.user;
            console.log("info user: ", result.user);
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential =
                FacebookAuthProvider.credentialFromResult(result);
            // const accessToken = credential.accessToken;
            getInfoUser(user.reloadUserInfo); // get info user

            // login --------------
            try {
                const data = {
                    email: user.reloadUserInfo.email,
                    password: user.reloadUserInfo.localId,
                    checkLogin: "google",
                };
                const response = await axios.post(
                    `${process.env.URL_BACKEND}/loginAPI`,
                    data,
                    { withCredentials: true } // bat cai nay len moi nhan cookie đc
                );
                if (response.data.role) {
                    setUser(response.data.role);
                }
                localStorage.setItem(
                    "accessToken",
                    response.data.tokenAcessUser
                );
                localStorage.setItem("nameUser", response.data.name);
                return navigate("/");
            } catch (error) {
                // if user not defined account of website
                notifySuccess("Đang tạo tài khoản...");

                // create account...
                try {
                    const data = {
                        name: user.reloadUserInfo.displayName,
                        email: user.reloadUserInfo.email,
                        password: user.reloadUserInfo.localId,
                        avatar_url: user.reloadUserInfo.photoUrl,
                    };
                    const response = await axios.post(
                        `${process.env.URL_BACKEND}/registerAPI`,
                        data
                    );

                    // if create success --> login for user !
                    if (response.data.response) {
                        const data = {
                            email: user.reloadUserInfo.email,
                            password: user.reloadUserInfo.localId,
                            checkLogin: "google",
                        };
                        const response = await axios.post(
                            `${process.env.URL_BACKEND}/loginAPI`,
                            data,
                            { withCredentials: true } // bat cai nay len moi nhan cookie đc
                        );
                        if (response.data.role) {
                            setUser(response.data.role);
                        }
                        localStorage.setItem(
                            "accessToken",
                            response.data.tokenAcessUser
                        );
                        localStorage.setItem("nameUser", response.data.name);
                        return navigate("/");
                    } else {
                        notify("Đăng kí không thành công !");
                    }
                } catch (error) {
                    console.log(
                        "error handle register account google: ",
                        error
                    );
                    if (error.response && error.response.data) {
                        return notify(error.response.data.errorcode);
                    }
                }
            }
        } catch (error) {
            console.log("error handle login facebook: ", error);
            // ...
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
                            <div
                                onClick={handleLoginFacebook}
                                className="login-with-facebook"
                            >
                                <img
                                    className="facebook_log-in"
                                    src={faceook}
                                    alt=""
                                />
                            </div>
                            <div
                                onClick={handleLoginGoogle}
                                className="login-with-google"
                            >
                                <img
                                    className="google_log-in"
                                    src={google}
                                    alt=""
                                />
                            </div>
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
