import React, { useEffect, useRef, useState } from "react";
import { FormBasic } from "./FormBasic";
import { ResultForm } from "./ResultForm";
import { SetInfoVideo } from "./SetInfoVideo";
import { useCreateCourseDataContext } from "../../../../../context/CreateCourseData";
import { ToastContainer, toast } from "react-toastify";
import { VerifyToken } from "../../../../../components/Sections/FunctionAll";
import axios from "axios";
export const FormInfoAll = ({ form, setForm }) => {
    // get value
    const {
        setResult_course,
        isData,
        setImage_course,
        setTitle_name,
        resest_formCourse,
    } = useCreateCourseDataContext();
    const getContentResult_course = () => {
        const ulElement = document.getElementById("node-list_result_course");
        const inputElements = ulElement.querySelectorAll(".plus_result_end");
        const inputValues = Array.from(inputElements).map(
            (input) => input.value
        );
        setResult_course(inputValues.join("--hashcode--"));
    };
    useEffect(() => {
        getContentResult_course();
    }, [form]);

    ////////////////////////////////////////////////////////////////

    // toastly
    const notifyError = (content) => toast.error(content);
    const notifySuccess = (content) => toast.success(content);

    // set price
    const [checkFree, setCheckFree] = useState(false);

    // postgres for upload course
    const [progress, setProgress] = useState(0);
    // break file, data if type file don't valid or data error
    const [breakk, setBreak] = useState(false);
    const resestUrlAndImage = () => {
        document.getElementById("url_course").value = "";
        document.getElementById("file_image_course_create").value = "";
        const defaultImageSrc = "/image/default_image.jpg";
        const imageElement = document.querySelector(".image_file--upload");
        imageElement.src = defaultImageSrc;
        setTitle_name("");
        setImage_course(null);
    };
    const selectInputRefs = useRef([
        useRef(null), // Ref for category select
        useRef(null), // Ref for level select
        useRef(null), // Ref for instructor select
        useRef(null), // Ref for ReactQuill editor
    ]);
    const resetForm = () => {
        // reset form basic
        document.getElementById("title_form-create_course").value = ""; // clear title course
        selectInputRefs.current[0].clearValue(); // category
        selectInputRefs.current[1].clearValue(); // level
        selectInputRefs.current[2].clearValue(); // instructor
        const quillEditor = selectInputRefs.current[3].getEditor(); // clear quill
        quillEditor.setContents([]);
        document.getElementById("input_get-price_course").value = ""; // resent price
        // reset check price
        if (checkFree) {
            setCheckFree(!checkFree);
        }
        // resest form result
        const ul = document.getElementById("node-list_result_course");
        const lis = ul.getElementsByTagName("li");
        for (let i = lis.length - 1; i > 0; i--) {
            lis[i].remove();
        }
        document.getElementById("input_default_one_result-course").value = "";
        // resest form into
        resest_formCourse();
        resestUrlAndImage();
    };

    // when onlick submit
    let checkOnclickSubmit = false;
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (checkOnclickSubmit) {
            notifyError("Đang được xử lí...");
            return;
        }
        checkOnclickSubmit = true;

        if (isData.title_name === "") {
            notifyError("vui lòng nhập tiêu đề !");
            checkOnclickSubmit = false;
            return;
        }
        if (isData.image_course === null) {
            notifyError("vui lòng điền lại thông tin, và chọn file ảnh !");
            resestUrlAndImage();
            checkOnclickSubmit = false;
            return "";
        }
        if (
            !isData.description ||
            !isData.category ||
            !isData.level ||
            !isData.instructor ||
            !isData.price ||
            !isData.result_course ||
            !isData.url_course
        ) {
            notifyError("Vui lòng nhập đầy đủ các thông tin!");
            checkOnclickSubmit = false;
            return "";
        }
        if (breakk) {
            notifyError("file không hợp lệ, vui lòng chọn lại file !");
            resestUrlAndImage();
            checkOnclickSubmit = false;
            return "";
        }
        const funcVerifyToken = await VerifyToken();
        const resultVerify = await funcVerifyToken();
        if (!resultVerify) {
            notifyError("Bạn không thể thực hiện tác vụ trên !");
            checkOnclickSubmit = false;
            // break function !
            return;
        }
        const data = new FormData();
        data.append("title_name", isData.title_name);
        data.append("description", isData.description);
        data.append("category", isData.category);
        data.append("level", isData.level);
        data.append("instructor", isData.instructor);
        data.append("price", isData.price);
        data.append("result_course", isData.result_course);
        data.append("url_course", isData.url_course);
        data.append("image_course", isData.image_course);
        try {
            const response = await axios.post(
                `${
                    process.env.REACT_APP_URL_BACKEND
                }/course/createCourseAPI?title_name=${encodeURIComponent(
                    isData.title_name
                )}`,
                data,
                {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    },
                }
            );
            setProgress(0);
            resetForm();
            notifySuccess("tạo thành công !");
            checkOnclickSubmit = false;
        } catch (error) {
            checkOnclickSubmit = false;
            if (
                error.response.data.result &&
                error.response.data.result === "Tên khóa học đã tồn tại"
            ) {
                // resestUrlAndImage();
                setForm(1);
                notifyError(
                    "Tên khóa học đã tồn tại, vui lòng dùng tên khác !"
                );
                setProgress(0);
            } else {
                resestUrlAndImage();
                notifyError(error.response.data.error);
                setProgress(0);
            }
        }
    };
    // handle upload file....
    return (
        <>
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
                id="form-craete-course"
                className="form-info_add-course"
            >
                <div className={`box1 ${form === 1 ? "" : "hidden"}`}>
                    <FormBasic
                        selectInputRefs={selectInputRefs}
                        checkFree={checkFree}
                        setCheckFree={setCheckFree}
                    />
                </div>
                <div className={`box2 ${form === 2 ? "" : "hidden"}`}>
                    <ResultForm />
                </div>
                <div className={`box3 ${form === 3 ? "" : "hidden"}`}>
                    <SetInfoVideo
                        breakk={breakk}
                        setBreak={setBreak}
                        resestUrlAndImage={resestUrlAndImage}
                        progress={progress}
                    />
                </div>
            </form>
        </>
    );
};
