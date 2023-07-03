import React from "react";
import "../assets/style/Login/forgetPassword.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const ForgetPw = () => {
    const navigation = useNavigate();
    if (localStorage.getItem("accessToken")) {
        navigation("/");
    }
    return (
        <main>
            <div className="form-forgetpassword">
                <div className="form_all_forgetpassword">
                    <h2 className="h2-forgetpassword">LẤY LẠI MẬT KHẨU</h2>
                    <div className="main_form-forgetpassword">
                        <form action="">
                            <label htmlFor="">
                                <i>
                                    Vui lòng điền email của bạn vào ô bên dưới
                                </i>
                            </label>
                            <input
                                className="input-forgetpassword"
                                type="email"
                                id="fname"
                                name="fname"
                                placeholder="Nhập Email..."
                            />
                            <br />
                            <button className="button-forgetpassword">
                                GỬI NGAY
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};
