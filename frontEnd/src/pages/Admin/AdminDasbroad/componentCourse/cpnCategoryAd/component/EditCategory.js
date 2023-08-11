import React, { useEffect } from "react";
import "../../../cssPageAdmin/courseCss/addCtgrCpn.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Await, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { VerifyToken } from "../../../../../../components/Sections/FunctionAll";
export const EditCategory = () => {
    const param = useParams();
    const navigation = useNavigate();
    const [dataOrigin, setDataOrigin] = useState({});
    const getDataFormEdit = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/category/getOneCategoryAPI?id=${param.id}`
            );
            setDataOrigin(...response.data.data);
        } catch (error) {
            if (error.response.data.EC === "error of param") {
                navigation("/error");
            }
        }
    };

    // handle remove mage have update
    const handleDeleteCategory = async (id, name_image) => {
        const funcVerifyToken = await VerifyToken();
        const resultVerify = await funcVerifyToken();
        if (!resultVerify) {
            notifyError("Không thể thực hiện hành động trên !");
            return;
        }
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_URL_BACKEND}/category/deleteCategoryAPI?id=null&name_image=${name_image}`
            );
            return response.data.result;
        } catch (error) {
            return null;
        }
    };

    const [formData, setFormData] = useState({
        title: "",
        image: null,
    });
    useEffect(() => {
        getDataFormEdit();
    }, []);
    const resetForm = () => {
        // set data title
        document.getElementById("title_form-category_edit").defaultValue =
            dataOrigin.category_name;
        const defaultImageSrc = `/imageCategory/${
            dataOrigin ? dataOrigin.image_category : ""
        }`;
        setFormData({
            title: "",
            image: null,
        });
        // document.getElementById("file_image-category_edit").value = "";

        // set image default
        const imageElement = document.querySelector(".image_file--upload");
        imageElement.src = defaultImageSrc;
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
    let checkSubmit = false;
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (checkSubmit) {
            notifyError("Yêu cầu đang được xử lí !");
            return;
        }
        checkSubmit = true;
        const funcVerifyToken = await VerifyToken();
        const resultVerify = await funcVerifyToken();
        if (!resultVerify) {
            notifyError("Không thể thực hiện hành động trên !");
            checkSubmit = false;
            return;
        }
        if (!formData.title && !formData.image) {
            notifyError("Không có thay đổi nào để chỉnh sửa !");
            // resetForm();
            checkSubmit = false;
            return "";
        }
        if (breakk) {
            notifyError("file không hợp lệ, vui lòng chọn lại file !");
            resetForm();
            checkSubmit = false;
            return "";
        }
        const data = new FormData();
        data.append("title", formData.title);
        data.append("image", formData.image);
        try {
            const response = await axios.post(
                `${
                    process.env.REACT_APP_URL_BACKEND
                }/category/editCategoryAPI?id=${
                    param.id
                }&title=${encodeURIComponent(formData.title)}`,
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
            if (response.data.data) {
                handleDeleteCategory(param.id, dataOrigin.image_category);
                setDataOrigin({
                    ...dataOrigin,
                    image_category: response.data.data.filename,
                });
            }
            if (response.data.title) {
                setDataOrigin({
                    ...dataOrigin,
                    category_name: response.data.title,
                });
            }
            resetForm();
            notifySuccess("Chỉnh Sửa Thành Công!");
            setProgress(0);
            checkSubmit = false;
        } catch (error) {
            checkSubmit = false;
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
                            Form sửa danh mục
                        </h3>
                        <div className="form-course-title">
                            <label htmlFor="">Tiêu đề danh mục</label>
                            <input
                                id="title_form-category_edit"
                                type="text"
                                name="title"
                                placeholder="Tiêu đề..."
                                onChange={handleInputChange}
                                defaultValue={dataOrigin.category_name}
                            />
                        </div>
                        <div className="form-course-title_image">
                            <label htmlFor="">
                                Hình ảnh tượng trưng cho danh mục
                            </label>
                            <div className="input-upload_image">
                                <label
                                    className="upload_file_image-course"
                                    htmlFor="file_image-category_edit"
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
                                    id="file_image-category_edit"
                                    onChange={handleFileUpload}
                                    name="image"
                                />
                                <div className="image_display--upload_file">
                                    <img
                                        src={`${dataOrigin.image_category}`}
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
                                            : "Xác Nhận chỉnh sửa"}
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
