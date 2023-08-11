import React from "react";
import "../../../cssPageAdmin/courseCss/addCtgrCpn.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { VerifyToken } from "../../../../../../components/Sections/FunctionAll";

export const AđdCategory = () => {
    const [formData, setFormData] = useState({
        title: "",
        image: null,
    });
    const resetForm = () => {
        document.getElementById("title_form-category_add").value = "";
        document.getElementById("file_image-category_add").value = "";
        const defaultImageSrc = "/image/default_image.jpg";
        const imageElement = document.querySelector(".image_file--upload");
        imageElement.src = defaultImageSrc;
        setFormData({
            title: "",
            image: null,
        });
    };
    // postgres upload
    const [progress, setProgress] = useState(0);
    const [breakk, setBreak] = useState(false);
    const notifyError = (content) => toast.error(content);
    const notifySuccess = (content) => toast.success(content);
    function handleFileUpload(event) {
        event.preventDefault();
        setBreak(false);
        const files = event.target.files;
        const allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/bmp",
            "image/tiff",
            "image/webp",
            "image/svg+xml",
        ];
        if (files.length === 0) {
            resetForm();
            return "";
        }
        // Kiểm tra xem định dạng file có trong danh sách cho phép hay không
        if (allowedMimeTypes.includes(files[0].type)) {
            const file = files[0];
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageSrc = e.target.result;
                const imageElement = document.querySelector(
                    ".image_file--upload"
                );
                imageElement.src = imageSrc;
            };
            reader.readAsDataURL(file);
        } else {
            setBreak(true);
            notifyError("file không hợp lệ !");
            return "";
        }
    }

    // get data input name category
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // handle upload file....
    const handleSubmit = async (event) => {
        event.preventDefault();
        const funcVerifyToken = await VerifyToken();
        const resultVerify = await funcVerifyToken();
        if (!resultVerify) {
            notifyError("Không thể thực hiện hành động trên !");
            return;
        }
        if (formData.title === "") {
            notifyError("vui lòng nhập tiêu đề !");
            // resetForm();
            return;
        }
        if (formData.image === null) {
            notifyError("vui lòng điền lại thông tin, và chọn file ảnh !");
            resetForm();
            return "";
        }
        if (breakk) {
            notifyError("file không hợp lệ, vui lòng chọn lại file !");
            resetForm();
            return "";
        }

        const data = new FormData();
        data.append("title", formData.title);
        data.append("image", formData.image);
        try {
            const response = await axios.post(
                `${
                    process.env.REACT_APP_URL_BACKEND
                }/category/addCategoryAPI?title=${encodeURIComponent(
                    formData.title
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
            notifySuccess("tạo thành công !");
            resetForm();
            setProgress(0);
        } catch (error) {
            if (
                error.response.data.result &&
                error.response.data.result === "danh mục đã tồn tại"
            ) {
                resetForm();
                notifyError("Danh mục đã tồn tại");
                setProgress(0);
            } else {
                resetForm();

                notifyError(error.response.data.error);
                setProgress(0);
            }
        }
    };
    return (
        <div className="category_list-admin">
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
            <div className="haeder_category_list-admin"></div>
            <div className="main_category-list_admin display-flex-box">
                <div className="form_add-category-list">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <h3 className="title-form_add-category">
                            Form thêm danh mục
                        </h3>
                        <div className="form-course-title">
                            <label htmlFor="">Tiêu đề danh mục</label>
                            <input
                                id="title_form-category_add"
                                type="text"
                                name="title"
                                placeholder="Tiêu đề..."
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-course-title_image">
                            <label htmlFor="">
                                Hình ảnh tượng trưng cho danh mục
                            </label>
                            <div className="input-upload_image">
                                <label
                                    className="upload_file_image-course"
                                    htmlFor="file_image-category_add"
                                >
                                    <span class="material-symbols-outlined">
                                        upload
                                    </span>
                                    <span>
                                        {" "}
                                        tải lên hình ảnh (hỗ trợ: jpeg, bmp,
                                        png, svg và {"<"} 5 MB)
                                    </span>
                                </label>
                                <input
                                    style={{ visibility: "hidden" }}
                                    type="file"
                                    id="file_image-category_add"
                                    onChange={handleFileUpload}
                                    name="image"
                                />
                                <div className="image_display--upload_file">
                                    <img
                                        src="/image/default_image.jpg"
                                        className="image_file--upload"
                                        alt=""
                                    />
                                    <div className="info_image-file">
                                        Ảnh demo
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="submit-create-student">
                            <div className="all-element_submit-create-sudent">
                                <span class="material-symbols-outlined">
                                    done_all
                                </span>
                                <h4>Xác nhận!</h4>
                                <p>bạn chỉ cần một cú nhấp chuột</p>
                                <div className="bnt-submit-craete-student">
                                    <button type="submit">
                                        {progress > 0
                                            ? `Progress: ${progress}%`
                                            : "Xác Nhận Tạo"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
