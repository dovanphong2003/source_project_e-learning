import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCart } from "../../components/card/ProductCart";
export const CategoryCourse = () => {
    const param = useParams();
    const [listCourse, setListCourse] = useState([]);
    const getCourseCategory = async () => {
        const url = `http://localhost:8081/product/getProductAPI?id=${param.id}`;
        const response = await axios.get(url);
        setListCourse(response.data.data);
    };
    useEffect(() => {
        getCourseCategory();
    }, [param.id]);
    return (
        <main>
            <div className="container-main">
                <div className="content-main_homePage">
                    <h2>
                        {listCourse[0]
                            ? `Danh Mục: ${listCourse[0].category_name}`
                            : "Không có kết quả nào cho danh mục này !"}
                    </h2>
                    <div className="list-course_best-seller">
                        {listCourse.map((element) => {
                            return <ProductCart data={element} />;
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
};
