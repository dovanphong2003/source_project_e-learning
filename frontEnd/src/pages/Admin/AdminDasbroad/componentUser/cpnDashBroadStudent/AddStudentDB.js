import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify"; // toast
import { useState } from "react";
import Select from "react-select";
import axios from "axios";
export const AddStudentDB = () => {
    const notify = (content) => toast.success(content);
    const notifyErr = (content) => toast.error(content);
    const selectInputRefs = useRef();
    const optionsRoleUser = [
        { value: "student", label: "Học viên" },
        { value: "instructor", label: "Giảng viên" },
        { value: "admin", label: "Quản trị viên" },
    ];
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        additionalInfo: "",
        role: "",
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("form data: ", formData);
        if (
            !formData.password ||
            !formData.email ||
            !formData.fullName ||
            !formData.role
        ) {
            return notifyErr("vui lòng điền đầy đủ thông tin !");
        }
        if (formData.password.length < 8) {
            return notifyErr("Mật khẩu tối thiểu 8 kí tự !");
        }
        try {
            const response = await axios.post(
                "http://localhost:8081/createUserAPI",
                formData
            );
            notify("Tạo Thành Công !");
            const inputs = document.querySelectorAll(
                ".input_form-course-title"
            );
            inputs.forEach((input) => {
                console.log(input.value);
                input.value = "";
            });
            setFormData({
                fullName: "",
                email: "",
                password: "",
                additionalInfo: "",
                role: "",
            });
            selectInputRefs.current.clearValue();
        } catch (error) {
            console.log(formData);
            console.log("err: ", error);
            notifyErr(error.response.data.errorcode);
        }
    };
    return (
        <div className="info_add-user-db">
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
            <div className="header-info_add-user-db">Tạo Mới Học Viên</div>
            <form
                id="form-create-user_course"
                className="form_info-fasic-add_course"
                onSubmit={handleSubmit}
            >
                <div className="form-course-title">
                    <label htmlFor="">Họ và tên</label>
                    <input
                        className="input_form-course-title"
                        type="text"
                        name="fullName"
                        placeholder="Họ và tên..."
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-course-title">
                    <label htmlFor="">Email</label>
                    <input
                        className="input_form-course-title"
                        type="text"
                        name="email"
                        placeholder="Email..."
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-course-title">
                    <label htmlFor="">Mật khẩu</label>
                    <input
                        className="input_form-course-title"
                        type="password"
                        name="password"
                        placeholder="Mật khẩu..."
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-course-title">
                    <label htmlFor="">Vai trò người dùng</label>
                    <Select
                        className="select_form-course_title"
                        id="select_form-course_category"
                        options={optionsRoleUser}
                        isSearchable
                        ref={selectInputRefs}
                        closeMenuOnSelect={true}
                        placeholder="Chọn vai trò người dùng"
                        onChange={(data) => {
                            if (data) {
                                setFormData({ ...formData, role: data.value });
                            }
                        }}
                    />
                </div>
                <div className="form-course-title ">
                    <label htmlFor="">Thông tin thêm (nếu có)</label>
                    <input
                        className="input_form-course-title"
                        type="text"
                        name="additionalInfo"
                        placeholder="+"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="submit-create-student">
                    <div className="all-element_submit-create-sudent">
                        <span class="material-symbols-outlined">done_all</span>
                        <h4>Xác nhận!</h4>
                        <p>Bạn chỉ cần một cú nhấp chuột</p>
                        <div className="bnt-submit-craete-student">
                            <button type="submit">Xác Nhận Tạo</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
