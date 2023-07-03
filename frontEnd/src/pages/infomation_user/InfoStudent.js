import React from "react";
import ReactQuill from "react-quill";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
export const InfoStudent = ({ data }) => {
    const [value, setValue] = useState("");
    return (
        <div className="container-info_user">
            <div className="all_info-user">
                <div className="all_info-user-bgr-cl">
                    <h4 className="title-info-user">Thông Tin Học Viên</h4>
                    <div className="form-info_user">
                        <form action="">
                            <div className="container-form-info-user">
                                <div className="element-info-user">
                                    <label
                                        className="label-element-info-user"
                                        htmlFor=""
                                    >
                                        Họ tên
                                    </label>
                                    <br />
                                    <input
                                        className="input-element-info-user"
                                        type="text"
                                        placeholder={data.user_name}
                                    />
                                </div>
                                <div className="element-info-user">
                                    <label
                                        className="label-element-info-user"
                                        htmlFor=""
                                    >
                                        Điện thoại
                                    </label>
                                    <br />
                                    <input
                                        className="input-element-info-user"
                                        type="text"
                                        placeholder={`${
                                            data.phone
                                                ? data.phone
                                                : "chưa có !"
                                        }`}
                                    />
                                </div>
                                <div className="element-info-user">
                                    <label
                                        className="label-element-info-user"
                                        htmlFor=""
                                    >
                                        Email
                                    </label>
                                    <br />
                                    <input
                                        className="input-element-info-user"
                                        type="email"
                                        placeholder={data.user_email}
                                        disabled
                                        style={{ backgroundColor: "#e9ecef" }}
                                    />
                                </div>
                                <div className="element-info-user">
                                    <label
                                        className="label-element-info-user"
                                        htmlFor=""
                                    >
                                        Đổi mật khẩu
                                    </label>
                                    <br />
                                    <input
                                        className="input-element-info-user"
                                        type="text"
                                        placeholder="***********"
                                    />
                                </div>
                            </div>
                            <div className="address-user">
                                <label
                                    className="label-element-info-user"
                                    htmlFor=""
                                >
                                    Địa chỉ
                                </label>
                                <input
                                    className="input-element-info-user"
                                    type="text"
                                    placeholder={`${
                                        data.adress ? data.adress : "chưa có !"
                                    }`}
                                />
                            </div>
                            <div className="submit-comment">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setValue("");
                                    }}
                                >
                                    Cập Nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
