import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import Select from "react-select";
import { useState } from "react";
import { useCreateCourseDataContext } from "../../../../../context/CreateCourseData";
import axios from "axios";
export const FormBasic = ({ selectInputRefs, checkFree, setCheckFree }) => {
    const [dataCategory, setDataCategory] = useState([]);

    // get data category...
    const getDataCategory = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_URL_BACKEND}/category/getCategoryAPI`
        );
        setDataCategory(response.data.data);
    };

    useEffect(() => {
        getDataCategory();
    }, []);
    // setting arr with format {vale,label} for optionsCategory
    const newArr = dataCategory
        ? dataCategory.map((el) => {
              return { value: el.category_id, label: el.category_name };
          })
        : dataCategory;
    const optionsCategory = newArr;
    const optionLevels = [
        { value: "Cho người mới", label: "Cho người mới" },
        { value: "Mức trung bình", label: "Mức trung bình" },
        { value: "Nâng cao", label: "Nâng cao" },
    ];

    const listInstructor = [{ value: "53951160", label: "Tạ Hoàng An" }];

    // context get data form basic
    const {
        setTitle_name,
        setDescripton,
        setCategory,
        setLevel,
        setInstructor,
        setPrice,
    } = useCreateCourseDataContext();

    return (
        <div className="form_info-fasic-add_course">
            <div className="form-course-title">
                <label htmlFor="">Tiêu đề khóa học</label>
                <input
                    id="title_form-create_course"
                    onChange={(e) => {
                        setTitle_name(e.target.value);
                    }}
                    type="text"
                    placeholder="Tiêu đề..."
                />
            </div>
            <div className="form-course-title">
                <label htmlFor="">Mô tả chi tiết</label>
                <div className="des-form-course">
                    <ReactQuill
                        className="ql-container ql-editor ql-reset_value"
                        id="config-w-h"
                        theme="snow"
                        ref={(ref) => (selectInputRefs.current[3] = ref)}
                        spellCheck="false" // tat kiem tra chinh ta
                        placeholder="Nhập mô tả chi tiết..."
                        onChange={(content) => {
                            if (content) {
                                setDescripton(content);
                            } else {
                                setDescripton("");
                            }
                        }}
                    />
                </div>
            </div>
            <div className="form-course-title">
                <label htmlFor="">Danh mục</label>
                <Select
                    className="select_form-course_title"
                    id="select_form-course_category"
                    options={optionsCategory}
                    isSearchable
                    ref={(ref) => (selectInputRefs.current[0] = ref)}
                    closeMenuOnSelect={true}
                    placeholder="Chọn một danh mục"
                    onChange={(value) => {
                        if (value) {
                            setCategory(value.value);
                        } else {
                            setCategory("");
                        }
                    }}
                />
            </div>
            <div className="form-course-title">
                <label htmlFor="">Cấp độ</label>
                <Select
                    className="select_form-course_title"
                    id="select_form-course_level"
                    options={optionLevels}
                    isSearchable
                    ref={(ref) => (selectInputRefs.current[1] = ref)}
                    closeMenuOnSelect={true}
                    placeholder="Chọn cấp độ"
                    onChange={(value) => {
                        if (value) {
                            setLevel(value.value);
                        } else {
                            setLevel("");
                        }
                    }}
                />
            </div>
            <div className="form-course-title">
                <label htmlFor="">Giảng viên khóa học</label>
                <Select
                    className="select_form-course_title"
                    id="select_form-course_constructor"
                    options={listInstructor}
                    isSearchable
                    ref={(ref) => (selectInputRefs.current[2] = ref)}
                    closeMenuOnSelect={true}
                    placeholder="Danh sách giảng viên"
                    onChange={(value) => {
                        if (value) {
                            setInstructor(value.value);
                        } else {
                            setInstructor("");
                        }
                    }}
                />
            </div>
            <div className="form-course-title postion-rele">
                <label htmlFor="">Nhập giá bán (vnđ)</label>
                <input
                    disabled={`${checkFree ? "true" : ""}`}
                    className={`${checkFree ? "text-dc-line" : ""}`}
                    type="text"
                    placeholder="ví dụ: 200,000 "
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                    id="input_get-price_course"
                />

                <div className="bnt-check-free">
                    <span>Nếu miễn phí: </span>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setCheckFree(!checkFree);
                            document.getElementById(
                                "input_get-price_course"
                            ).value = "";
                            setPrice("free");
                        }}
                        className="bnt-form-course_price"
                        type="button"
                    >
                        Click
                    </button>
                </div>
            </div>
        </div>
    );
};
