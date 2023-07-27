import React, { useEffect, useState } from "react";
import "../../cssPageAdmin/courseCss/addCategory.css";
import "../../../../../assets/style/responsiveCss/resCategoryCourse.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ElementCategory } from "./component/ElementCategory";
import axios from "axios";
export const CategoryAd = () => {
    const [dataCategory, setDataCategory] = useState([]);
    const [courseOfCategory, setCourseOfCategory] = useState([]);
    const handleUpdateDataCategory = (idDataRemove) => {
        const newData = dataCategory.filter(
            (el) => el.category_id !== idDataRemove
        );
        setDataCategory(newData);
    };
    const getDataCategory = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8081/category/getCategoryAPI"
            );
            // console.log("res: ", response);
            setDataCategory(response.data.data);
        } catch (error) {
            console.log("error get category: ", error);
            return "";
        }
    };
    useEffect(() => {
        getDataCategory();
    }, []);
    const getCourseOfCategory = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8081/category/getCourseOfCategoryAPI"
            );
            // console.log("ressssssssssssssssssssssss: ", response);
            setCourseOfCategory(response.data.data);
        } catch (error) {
            console.log("error get category: ", error);
            return "";
        }
    };
    useEffect(() => {
        getCourseOfCategory();
    }, []);
    console.log(courseOfCategory);
    const navigate = useNavigate();
    return (
        <div className="category_list-admin">
            <div className="haeder_category_list-admin">
                <h2>Tất cả danh mục</h2>
                <button
                    onClick={() => {
                        navigate("/admin-website/ad-category/add-category");
                    }}
                    className="add_new_category"
                >
                    + Thêm danh mục mới
                </button>
            </div>
            <div className="main_category-list_admin">
                {dataCategory.length
                    ? dataCategory.map((el) => {
                          return (
                              <ElementCategory
                                  handleUpdateDataCategory={
                                      handleUpdateDataCategory
                                  }
                                  courseOfCategory={courseOfCategory}
                                  data={el}
                              />
                          );
                      })
                    : ""}
            </div>
        </div>
    );
};
