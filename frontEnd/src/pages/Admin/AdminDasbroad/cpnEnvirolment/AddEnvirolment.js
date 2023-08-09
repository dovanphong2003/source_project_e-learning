import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import Select from "react-select";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";
import "./addEnvirolment.css";
import { ToastContainer, toast } from "react-toastify";
import { VerifyToken } from "../../../../components/Sections/FunctionAll";

export const AddEnvirolment = () => {
    const listRef = useRef([useRef(null), useRef(null)]);
    const [dataCourse, getDataCourse] = useState([]);
    const notifyError = (content) => toast.error(content);
    const notifySuccess = (content) => toast.success(content);
    const getDataCourseAPI = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_URL_BACKEND}/course/getAllCourseAPI`
        );
        console.log(
            "data: ",
            getDataCourse(
                response.data.data.map((el) => ({
                    value: el.course_id,
                    label: `${el.course_name} - ${el.user_name}`,
                }))
            )
        );
    };
    const [dataStudent, setDataStudent] = useState([]);
    const getInfoStudent = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_URL_BACKEND}/getInfoStudentAPI`
        );
        setDataStudent(
            response.data.dataUser.map((el) => ({
                value: el.user_id,
                label: `${el.user_email} - ${el.user_name}`,
            }))
        );
    };
    useEffect(() => {
        getDataCourseAPI();
        getInfoStudent();
    }, []);
    const resestForm = () => {
        listRef.current[0].clearValue();
        listRef.current[1].clearValue();
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const funcVerifyToken = await VerifyToken();
        const resultVerify = await funcVerifyToken();
        if (!resultVerify) {
            notifyError("Không thể thực hiện hành động trên !");
            return;
        }
        if (
            !listRef.current[0].getValue().length ||
            !listRef.current[1].getValue().length
        ) {
            notifyError("Vui lòng nhập đầy đủ thông tin !");
            return;
        }
        const data = {
            id_student: listRef.current[0].getValue()[0].value,
            id_course: listRef.current[1].getValue()[0].value,
            name_course: listRef.current[1].getValue()[0].label,
        };
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_URL_BACKEND}/enrolment/upDataEnrolmentAPI`,
                data
            );
            notifySuccess("Ghi danh thành công !");
            resestForm();
        } catch (error) {
            console.log("Error: ", error);
            if (error.response.data) {
                notifyError(error.response.data.message);
                resestForm();
            } else {
                notifyError("lỗi không xác định, ghi danh không thành công");
            }
            resestForm();
        }
    };
    return (
        <div className="add_envirolment">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <form
                onSubmit={handleSubmit}
                className="form_info-fasic-add_course"
            >
                <div className="title_form_envirolment">Form Ghi Danh</div>
                <div className="form-course-title">
                    <label htmlFor="">Tên học viên</label>
                    <Select
                        className="select_form-course_title"
                        options={dataStudent}
                        isSearchable
                        closeMenuOnSelect={true}
                        placeholder="Chọn học viên"
                        ref={(ref) => {
                            listRef.current[0] = ref;
                        }}
                    />
                </div>
                <div className="form-course-title">
                    <label htmlFor="">Khóa học muốn ghi danh</label>
                    <Select
                        className="select_form-course_title"
                        options={dataCourse}
                        isSearchable
                        closeMenuOnSelect={true}
                        placeholder="Chọn một danh mục"
                        ref={(ref) => {
                            listRef.current[1] = ref;
                        }}
                    />
                </div>
                <div className="form-course-title center">
                    <button
                        type="submit"
                        className="button_form-add-envirolment"
                    >
                        Ghi Danh Học Viên
                    </button>
                </div>
            </form>
        </div>
    );
};
