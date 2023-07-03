import React, { useState } from "react";
import { useCreateCourseDataContext } from "../../../../../context/CreateCourseData";

import { ToastContainer, toast } from "react-toastify";
export const SetInfoVideo = ({ breakk, setBreak, resestUrlAndImage }) => {
    const { setUrl_course, setImage_course } = useCreateCourseDataContext();

    const notifyError = (content) => toast.error(content);
    function handleFileUpload(event) {
        event.preventDefault();
        console.log(event.target);
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
            resestUrlAndImage();
            return "";
        }
        // Kiểm tra xem định dạng file có trong danh sách cho phép hay không
        if (allowedMimeTypes.includes(files[0].type)) {
            const file = files[0];
            setImage_course(file);
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
    return (
        <>
            <div className="form-course-title">
                <label htmlFor="">Đường dẫn khóa học</label>
                <input
                    onChange={(e) => {
                        setUrl_course(e.target.value);
                    }}
                    type="text"
                    placeholder="Url khóa học..."
                    id="url_course"
                />
            </div>{" "}
            <div className="form-course-title_image">
                <label htmlFor="">Hình ảnh thu nhỏ khóa học</label>
                <div className="input-upload_image">
                    <label
                        className="upload_file_image-course"
                        htmlFor="file_image_course_create"
                    >
                        <span class="material-symbols-outlined">upload</span>
                        <span>
                            {" "}
                            tải lên hình ảnh (hỗ trợ: jpeg, bmp, png, svg và{" "}
                            {"<"} 1 MB)
                        </span>
                    </label>

                    <input
                        style={{ visibility: "hidden" }}
                        id="file_image_course_create"
                        type="file"
                        onChange={handleFileUpload}
                        name="image"
                        // style={{ visibility: "hidden" }}
                    />
                    <div className="image_display--upload_file">
                        <img
                            src="/image/default_image.jpg"
                            className="image_file--upload"
                            alt=""
                        />
                        <div className="info_image-file">Ảnh demo</div>
                    </div>
                </div>
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
        </>
    );
};
