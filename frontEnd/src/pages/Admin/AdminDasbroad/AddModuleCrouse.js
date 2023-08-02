import React, { useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";
export const AddModuleCrouse = () => {
    // message notication
    const notifyError = (content) => toast.error(content);
    const notifySuccess = (content) => toast.success(content);
    const [nameModule, setNameModule] = useState("");
    const [data, setData] = useState([]);
    const refCourse = useRef("");

    //get data_course
    const getNameCourse = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_URL_BACKEND}/course/getNameAndIdAPI`
        );
        if (response.data) {
            setData(response.data.data);
        }
    };
    const dataNew = data.map((el) => ({
        value: el.course_id,
        label: el.course_name,
    }));
    const optionLevels = dataNew;
    useEffect(() => {
        getNameCourse();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("data title; ", nameModule);
        console.log("value select: ", refCourse.current.getValue());
        console.log(refCourse.current.getValue().length);
        if (refCourse.current.getValue().length === 0 || !nameModule) {
            notifyError("Vui lòng nhập đầy đủ thông tin !");
            return;
        }
        const data = {
            name_module: nameModule,
            id_course: refCourse.current.getValue()[0].value,
        };
        const response = await axios.post(
            `${process.env.REACT_APP_URL_BACKEND}/course/postModuleAPI`,
            data
        );
        console.log("ressssssssssssss: ", response);
        document.getElementById("title_form-create_course").value = "";
        setNameModule("");
        notifySuccess("tạo thành công !");
        refCourse.current.clearValue();
    };
    return (
        <form
            onSubmit={handleSubmit}
            id="form-craete-course"
            className="form-info_add-course"
        >
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="form_info-fasic-add_course">
                <div className="form-course-title">
                    <label htmlFor="">Tên chương</label>
                    <input
                        id="title_form-create_course"
                        onChange={(e) => {
                            setNameModule(e.target.value);
                        }}
                        type="text"
                        placeholder="Nhập tên chương..."
                    />
                </div>
                <div className="form-course-title">
                    <label htmlFor="">Thuộc khóa học</label>
                    <Select
                        className="select_form-course_title"
                        id="select_form-course_category"
                        options={optionLevels}
                        isSearchable
                        ref={refCourse}
                        closeMenuOnSelect={true}
                        placeholder="CHọn khóa học..."
                    />
                </div>
                <div className="submit-create-student">
                    <div className="all-element_submit-create-sudent">
                        <span class="material-symbols-outlined">done_all</span>
                        <h4>Xác nhận!</h4>
                        <p>bạn chỉ cần một cú nhấp chuột</p>
                        <div className="bnt-submit-craete-student">
                            <button type="submit">Xác Nhận Tạo</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};
