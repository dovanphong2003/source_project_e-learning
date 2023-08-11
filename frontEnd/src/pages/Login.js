import { useState } from "react";
import faceook from "../assets/image/facebookBlue.png";
import google from "../assets/image/chrome.png";
import "../assets/style/Login/login.css";
import "../assets/style/responsiveCss/resLogin.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners"; // loading
import { ToastContainer, toast } from "react-toastify"; // toast
import axios from "axios";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrDM1AB-Aj0s6mUifgRlQUAZVb3SHylDg",
    authDomain: "log-in-9626b.firebaseapp.com",
    projectId: "log-in-9626b",
    storageBucket: "log-in-9626b.appspot.com",
    messagingSenderId: "736221508892",
    appId: "1:736221508892:web:d00b21733aebc74bd3b6d9",
};

// Initialize Firebase
const FireBaseLogin = initializeApp(firebaseConfig);

export const Login = ({ setRoleUser }) => {
    const delay = async (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const notify = (content) => toast.error(content);
    const notifySuccess = (content) => toast.success(content);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email, password, checkLogin: "normal" };
        setIsLoading(true);
        await delay(2000);
        setIsLoading(false);
        if (!email || !password) {
            return notify("vui lòng nhập đầy đủ thông tin !");
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_URL_BACKEND}/loginAPI`,
                data,
                { withCredentials: true } // bat cai nay len moi nhan cookie đc
            );
            localStorage.setItem("accessToken", response.data.tokenAcessUser);
            localStorage.setItem("nameUser", response.data.name);
            localStorage.setItem("login", true);
            localStorage.setItem("role", response.data.role);
            setRoleUser(response.data.role);
            return navigate("/");
        } catch (error) {
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

            // login --------------
            try {
                const data = {
                    email: user.reloadUserInfo.email,
                    password: user.reloadUserInfo.localId,
                    checkLogin: "google",
                };
                const response = await axios.post(
                    `${process.env.REACT_APP_URL_BACKEND}/loginAPI`,
                    data,
                    { withCredentials: true } // bat cai nay len moi nhan cookie đc
                );
                localStorage.setItem(
                    "accessToken",
                    response.data.tokenAcessUser
                );
                localStorage.setItem("nameUser", response.data.name);
                localStorage.setItem("login", true);
                localStorage.setItem("role", response.data.role);
                setRoleUser(response.data.role);
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
                        `${process.env.REACT_APP_URL_BACKEND}/registerAPI`,
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
                            `${process.env.REACT_APP_URL_BACKEND}/loginAPI`,
                            data,
                            { withCredentials: true } // bat cai nay len moi nhan cookie đc
                        );
                        localStorage.setItem(
                            "accessToken",
                            response.data.tokenAcessUser
                        );
                        localStorage.setItem("nameUser", response.data.name);
                        localStorage.setItem("login", true);
                        localStorage.setItem("role", response.data.role);
                        setRoleUser(response.data.role);
                        return navigate("/");
                    } else {
                        notify("Đăng kí không thành công !");
                    }
                } catch (error) {
                    notify("Đăng nhập không thành công !");
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
        }
    };

    // handle login with facebook
    const handleLoginFacebook = async (event) => {
        event.preventDefault();
        const providerFacebook = new FacebookAuthProvider();
        const authFacebook = getAuth();
        try {
            const result = await signInWithPopup(
                authFacebook,
                providerFacebook
            );
            // The signed-in user info.
            const user = result.user;
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential =
                FacebookAuthProvider.credentialFromResult(result);
            // const accessToken = credential.accessToken;

            // login --------------
            try {
                const data = {
                    email: user.reloadUserInfo.email,
                    password: user.reloadUserInfo.localId,
                    checkLogin: "google",
                };
                const response = await axios.post(
                    `${process.env.REACT_APP_URL_BACKEND}/loginAPI`,
                    data,
                    { withCredentials: true } // bat cai nay len moi nhan cookie đc
                );
                localStorage.setItem(
                    "accessToken",
                    response.data.tokenAcessUser
                );
                localStorage.setItem("nameUser", response.data.name);
                localStorage.setItem("login", true);
                localStorage.setItem("role", response.data.role);
                setRoleUser(response.data.role);
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
                        `${process.env.REACT_APP_URL_BACKEND}/registerAPI`,
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
                            `${process.env.REACT_APP_URL_BACKEND}/loginAPI`,
                            data,
                            { withCredentials: true } // bat cai nay len moi nhan cookie đc
                        );
                        localStorage.setItem(
                            "accessToken",
                            response.data.tokenAcessUser
                        );
                        localStorage.setItem("nameUser", response.data.name);
                        localStorage.setItem("login", true);
                        localStorage.setItem("role", response.data.role);
                        setRoleUser(response.data.role);
                        return navigate("/");
                    } else {
                        notify("Đăng kí không thành công !");
                    }
                } catch (error) {
                    notify("Đăng nhập không thành công !");
                    if (error.response && error.response.data) {
                        return notify(error.response.data.errorcode);
                    }
                }
            }
        } catch (error) {}
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
