import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCart } from "../../components/card/ProductCart";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export const CategoryCourse = () => {
    const param = useParams();
    const [listCourse, setListCourse] = useState([false]);
    const getCourseCategory = async () => {
        const url = `${process.env.REACT_APP_URL_BACKEND}/product/getProductAPI?id=${param.id}`;
        const response = await axios.get(url);
        setListCourse(response.data.data);
    };
    useEffect(() => {
        setListCourse([false]);
        getCourseCategory();
    }, [param.id]);
    return (
        <main>
            <div className="container-main">
                <div className="content-main_homePage">
                    <h2>
                        {listCourse[0] === false ? (
                            <Skeleton
                                width={"100%"}
                                height={"40px"}
                                duration={2}
                                count={1}
                                className="skeleton-css"
                                baseColor="#faf9ff"
                                highlightColor="#dadada"
                            />
                        ) : listCourse[0] !== false && listCourse[0] ? (
                            `Danh Mục: ${listCourse[0].category_name}`
                        ) : (
                            "Không có kết quả nào cho danh mục này !"
                        )}
                    </h2>
                    {listCourse[0] !== false && listCourse.length ? (
                        <div className="list-course_best-seller">
                            {listCourse.map((element) => {
                                return <ProductCart data={element} />;
                            })}
                        </div>
                    ) : listCourse[0] === false ? (
                        <>
                            <Skeleton
                                width={"100%"}
                                height={"200px"}
                                duration={2}
                                count={1}
                                className="skeleton-css"
                                baseColor="#faf9ff"
                                highlightColor="#dadada"
                            />
                            <Skeleton
                                width={"100%"}
                                height={"200px"}
                                duration={2}
                                count={1}
                                className="skeleton-css"
                                baseColor="#faf9ff"
                                highlightColor="#dadada"
                            />
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </main>
    );
};
