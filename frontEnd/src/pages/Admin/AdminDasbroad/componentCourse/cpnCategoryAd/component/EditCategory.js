import React, { useEffect } from "react";
import "../../../cssPageAdmin/courseCss/addCtgrCpn.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Await, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const EditCategory = () => {
    const param = useParams();
    const navigation = useNavigate();
    const [dataOrigin, setDataOrigin] = useState({});
    const getDataFormEdit = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8081/category/getOneCategoryAPI?id=${param.id}`
            );
            setDataOrigin(...response.data.data);
        } catch (error) {
            console.log("errrrrrrrrrrr: ", error);
            if (error.response.data.EC === "error of param") {
                navigation("/error");
            }
        }
    };

    // handle remove mage have update
    const handleDeleteCategory = async (id, name_image) => {
        try {
            const response = await axios.delete(
                `http://localhost:8081/category/deleteCategoryAPI?id=null&name_image=${name_image}`
            );
            return response.data.result;
        } catch (error) {
            console.log("err delete category: ", error);
            return null;
        }
    };

    const [formData, setFormData] = useState({
        title: "",
        image: null,
    });
    console.log("form: ", formData);
    useEffect(() => {
        getDataFormEdit();
        // setFormData({
        //     title: dataOrigin ? dataOrigin.category_name : "",
        //     image: null,
        // });
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
        console.log("data:::: ", dataOrigin);
    };
    // postgres upload
    const [progress, setProgress] = useState(0);
    const [breakk, setBreak] = useState(false);
    const notifyError = (content) => toast.error(content);
    const notifySuccess = (content) => toast.success(content);
    function handleFileUpload(event) {
        event.preventDefault();
        console.log("event target::", event.target);
        setBreak(false);
        const files = event.target.files;
        console.log(files);
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
            console.log(123, file);
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
        console.log("hehe boy: ", formData.image);
        if (!formData.title && !formData.image) {
            notifyError("Không có thay đổi nào để chỉnh sửa !");
            // resetForm();
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
            console.log("title: ", formData.title);
            console.log("file: ", formData.image);
            const response = await axios.post(
                `http://localhost:8081/category/editCategoryAPI?id=${
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
            console.log("respnse:::::::: ", response);
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
        } catch (error) {
            console.log("err add category: ", error);
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
                                    htmlFor="file_image-category_add"
                                >
                                    <span class="material-symbols-outlined">
                                        upload
                                    </span>
                                    <span>
                                        {" "}
                                        tải lên hình ảnh (hỗ trợ: jpeg, bmp,
                                        png, svg và {"<"} 1 MB)
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
                                        src={`/imageCategory/${dataOrigin.image_category}`}
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
