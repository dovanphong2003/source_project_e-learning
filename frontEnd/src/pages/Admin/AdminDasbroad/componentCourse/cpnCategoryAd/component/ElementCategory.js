import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ElementCategory = ({
    handleUpdateDataCategory,
    data,
    courseOfCategory,
}) => {
    const [dataCourse, getDataCourse] = useState([]);
    useEffect(() => {
        getDataCourse(
            courseOfCategory.filter((el) => {
                return el.category_id === data.category_id;
            })
        );
    }, []);
    const navigate = useNavigate();
    const handleDeleteCategory = async () => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_URL_BACKEND}/category/deleteCategoryAPI?id=${data.category_id}&name_image=${data.image_category}`
            );
            return response.data.result;
        } catch (error) {
            return null;
        }
    };
    return (
        <>
            <div className="element_category-admin">
                <div className="image_element-category-admin">
                    <img src={`${data.image_category}`} alt="" />
                </div>
                <div className="name-category_admin">
                    <div className="content_name-category_admin">
                        <span class="material-symbols-outlined">category</span>
                        <p>{data.category_name}</p>
                    </div>
                    <div className="additional-content_category_admin">
                        <i>
                            {dataCourse.length
                                ? `${dataCourse.length} Khóa học`
                                : `0 khóa học`}
                        </i>
                    </div>
                </div>
                <div className="sub-category_content_admin">
                    <ul>
                        {dataCourse.length
                            ? dataCourse.map((el) => (
                                  <li>
                                      {"->"} {el.course_name}
                                  </li>
                              ))
                            : "Không có khóa học nào"}
                    </ul>
                    <div className="dispay-two_btn">
                        <div className="two_bnt-sub_category two_bnt-sub_category-mobile">
                            <button
                                onClick={() => {
                                    navigate(
                                        `/admin-website/ad-category/${data.category_id}`
                                    );
                                }}
                                className="bnt-sub_categor_edit"
                            >
                                Sửa
                            </button>
                            <button
                                onClick={async () => {
                                    const response = await Swal.fire({
                                        title: "Bạn có chắc chắn muốn xóa?",
                                        text: "Bạn sẽ không thể khôi phục điều này!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "vâng, tôi chắc!",
                                    });

                                    if (response.isConfirmed) {
                                        await handleDeleteCategory();
                                        handleUpdateDataCategory(
                                            data.category_id
                                        );
                                        const result = await Swal.fire(
                                            "Xóa!",
                                            "Bạn đã xóa thành công dữ liệu.",
                                            "success"
                                        );
                                    }
                                }}
                                className="bnt-sub_categor_delete hidden"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
