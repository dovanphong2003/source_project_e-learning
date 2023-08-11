import React, { useEffect, useRef } from "react";
import Select from "react-select";
import { useState } from "react";
import axios from "axios";
import "./cssPageAdmin/courseCss/add_file_video.css";
import { ToastContainer, toast } from "react-toastify"; // toast
import { VerifyToken } from "../../../components/Sections/FunctionAll";
export const AddLessonCourse = () => {
    // message notication
    const notifyError = (content) => toast.error(content);
    const notifyWarning = (content) => toast.warning(content);
    const notifySuccess = (content) => toast.success(content);
    const [hiddenType1, setHiddenType1] = useState(false);
    const [hiddenType2, setHiddenType2] = useState(false);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [data, setData] = useState([]);
    const [progress, setProgress] = useState(0);
    const [startRun, setStartRun] = useState(false);
    const selectInputRefs = useRef([
        useRef(null), // Ref for category select
        useRef(null), // Ref for level select
        useRef(null), // Ref for level select
    ]);

    const [fileVideo, getFileVideo] = useState({});
    const [breakk, setBreak] = useState(false);
    const optionsTypeLesson = [
        { value: "youtube", label: "YouTube Video" },
        { value: "Videofile", label: "Video File" },
    ];
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
    const [addChange, setAddChange] = useState(false);
    const optionsCourse = dataNew;
    useEffect(() => {
        getNameCourse();
    }, []);

    // get data module...
    const [newArrModule, setArrModule] = useState([]);
    const getNameModule = async () => {
        const id = selectInputRefs.current[0].getValue()[0].value;
        const response = await axios.get(
            `${process.env.REACT_APP_URL_BACKEND}/course/getNameModuleAPI?id=${id}`
        );
        if (response.data) {
            if (response.data.message) {
                notifyError(response.data.message);
                setArrModule([]);
                selectInputRefs.current[1].clearValue();
                return;
            }
            setArrModule(
                response.data.data.map((el) => ({
                    value: el.module_id,
                    label: el.module_name,
                }))
            );
        }
    };
    useEffect(() => {
        // if value empty --> no call
        if (selectInputRefs.current[0].getValue()[0]) {
            getNameModule();
        }
    }, [addChange]);

    // handle file
    function handleFileUpload(event) {
        event.preventDefault();
        setBreak(false);
        const files = event.target.files;
        if (files.length === 0) {
            // resetForm();
            notifyError("Vui lòng chọn file !");
            return "";
        }
        // Kiểm tra xem định dạng file có trong danh sách cho phép hay không
        const allowedMimeTypes = ["video/mp4", "video/mpeg"];

        // if định dạng file phù hợp...
        if (allowedMimeTypes.includes(files[0].type)) {
            getFileVideo(files[0]); // get file
        } else {
            setBreak(true);
            notifyError("file không hợp lệ !");
            return "";
        }
    }

    const refeshData = () => {
        setTitle("");
        document.getElementById("title_form-create_course").value = "";
        selectInputRefs.current[0].clearValue();
        selectInputRefs.current[1].clearValue();
        selectInputRefs.current[2].clearValue();
        if (hiddenType1) {
            setUrl("");
            document.getElementById("title_form-create_course").value = "";
            setHiddenType1(false);
        } else {
            getFileVideo({});
            document.getElementById("file_course_create_video").value = "";
        }
    };

    // handle upload file....
    const handleSubmit = async (event) => {
        event.preventDefault();
        const funcVerifyToken = await VerifyToken();
        const resultVerify = await funcVerifyToken();
        if (resultVerify) {
            if (
                !title ||
                !selectInputRefs.current[0].getValue().length ||
                !selectInputRefs.current[1].getValue().length
            ) {
                notifyError("Vui lòng điền đầy đủ thông tin!");
                return " ";
            }
            if (hiddenType1 && !selectInputRefs.current[2].getValue().length) {
                notifyError("Vui lòng điền đầy đủ thông tinnnn!");
                return "";
            }
            if (hiddenType2 && !fileVideo.name) {
                notifyError("Vui lòng chọn file video !");
                return "";
            }
            if (hiddenType2 && breakk) {
                notifyError("File không hợp lệ, chú ý định dạng !");
                return "";
            }

            const data = new FormData();
            data.append("title", title);
            data.append(
                "module",
                selectInputRefs.current[1].getValue()[0].value
            );
            data.append(
                "type_video",
                selectInputRefs.current[2].getValue()[0].value
            );
            if (hiddenType1) {
                data.append("url_video", url);
            } else {
                data.append("file_video", fileVideo);
            }
            const formDataObject = {};
            if (hiddenType1) {
                for (const [key, value] of data.entries()) {
                    formDataObject[key] = value;
                }
            }
            try {
                if (!formDataObject.title) {
                    setStartRun(true);
                    const response = await axios.post(
                        `${process.env.REACT_APP_URL_BACKEND}/course/postLessonTwoAPI`,
                        data
                    );
                    notifySuccess("tạo thành công !");
                    setStartRun(false);
                    setProgress(0);
                    refeshData();
                } else {
                    setStartRun(true);
                    const response = await axios.post(
                        `${process.env.REACT_APP_URL_BACKEND}/course/postLessonOneAPI`,
                        formDataObject
                    );
                    notifySuccess("tạo thành công !");
                    setStartRun(false);
                    setProgress(0);
                    refeshData();
                }
            } catch (error) {
                setStartRun(false);
                setProgress(0);
                refeshData();
                if (error.response.data) {
                    notifyError(error.response.data.error);
                }
            }
        } else {
            notifyError("Bạn không thể thực hiện hành động trên !");
        }
    };

    // run progress
    useEffect(() => {
        if (startRun) {
            const interval = setInterval(() => {
                if (progress < 99) {
                    setProgress((prevCount) => prevCount + 1);
                } else {
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [startRun]);
    return (
        <form
            onSubmit={handleSubmit}
            id="form-craete-course"
            className="form-info_add-course"
            // encType="multipart/form-data"
        >
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
            <div className="header-info_add-user-db">Tạo Bài Học Mới</div>
            <div className="form_info-fasic-add_course">
                <div className="form-course-title">
                    <label htmlFor="">Tiêu đề bài học</label>
                    <input
                        id="title_form-create_course"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        type="text"
                        placeholder="Nhập tiêu đề..."
                    />
                </div>
                <div className="form-course-title">
                    <label htmlFor="">Chọn khóa học</label>
                    <Select
                        className="select_form-course_title"
                        id="select_form-course_level"
                        options={optionsCourse}
                        isSearchable
                        ref={(ref) => (selectInputRefs.current[0] = ref)}
                        closeMenuOnSelect={true}
                        placeholder="Chọn khóa học"
                        onChange={() => {
                            setAddChange(!addChange);
                        }}
                    />
                </div>
                <div className="form-course-title">
                    <label htmlFor="">chọn chương học</label>
                    <Select
                        className="select_form-course_title"
                        id="select_form-course_level"
                        options={newArrModule}
                        isSearchable
                        ref={(ref) => (selectInputRefs.current[1] = ref)}
                        closeMenuOnSelect={true}
                        placeholder="chọn chương học"
                    />
                </div>
                <div className="form-course-title">
                    <label htmlFor="">Chọn loại bài học</label>
                    <Select
                        className="select_form-course_title"
                        id="select_form-course_category"
                        options={optionsTypeLesson}
                        isSearchable
                        ref={(ref) => (selectInputRefs.current[2] = ref)}
                        closeMenuOnSelect={true}
                        placeholder="Chọn một loại để hiển thị video"
                        onChange={(value) => {
                            if (value) {
                                if (value.value === "youtube") {
                                    setHiddenType1(true);
                                    setHiddenType2(false);
                                } else if (value.value === "Videofile") {
                                    setHiddenType2(true);
                                    setHiddenType1(false);
                                } else {
                                }
                            } else {
                                setHiddenType1(false);
                                setHiddenType2(false);
                            }
                        }}
                    />
                </div>
                <div
                    className={`${
                        hiddenType1 ? "" : "hidden"
                    }  form-course-title`}
                >
                    <label htmlFor="">Điền Url video YouTube</label>
                    <input
                        id="title_form-create_course"
                        onChange={(e) => {
                            setUrl(e.target.value);
                        }}
                        type="text"
                        placeholder="ví dụ: https://www.youtube.com/watch?v=2Tuo5u39qM8&t=706s"
                    />
                </div>
                <div
                    className={`${
                        hiddenType2 ? "" : "hidden"
                    } form-course-title_image`}
                >
                    <label htmlFor="">Upload Video</label>
                    <div className="input-upload_image border-dashed">
                        <label className="upload-course-label_video">
                            <span>
                                {" "}
                                (hỗ trợ định dạng: video/mp4, video/mpeg và{" "}
                                {"<"} 20 MB)
                            </span>
                        </label>

                        <input
                            onChange={handleFileUpload}
                            style={{ visibility: "hidden" }}
                            id="file_course_create_video"
                            type="file"
                            name="image"
                            // accept="video/*"
                        />
                        <div className="upload_file_image-video">
                            <img
                                src="/image/upload_file.png"
                                alt="upload file"
                            />
                            <label
                                className="label_bnt-upload-file_video"
                                htmlFor="file_course_create_video"
                            >
                                <div className="bnt_upload-video ">
                                    Chọn file Để Tải Lên
                                </div>
                            </label>
                            <div className="info_file_video">
                                {fileVideo.name
                                    ? `file được chọn: ${fileVideo.name}`
                                    : "chưa chọn file"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="submit-create-student">
                    <div className="all-element_submit-create-sudent">
                        <span class="material-symbols-outlined">done_all</span>
                        <h4>Xác nhận!</h4>
                        <p>
                            {startRun
                                ? "vui lòng đợi..."
                                : "bạn chỉ cần một cú nhấp chuột"}
                        </p>
                        <div className="bnt-submit-craete-student">
                            <button disabled={startRun} type="submit">
                                {" "}
                                {progress > 0
                                    ? `Tiến trình: ${progress}%`
                                    : "Xác Nhận Tạo"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};
