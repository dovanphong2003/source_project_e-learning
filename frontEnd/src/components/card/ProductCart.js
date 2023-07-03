import React, { useEffect, useState } from "react";
import "../../assets/style/HomePage/Card.css";
import { Link } from "react-router-dom";
import axios from "axios";
export const ProductCart = ({ courseHaveBuy, data }) => {
    const [lessonCourse, setlessonCourse] = useState([]);
    useEffect(() => {
        if (data) {
            const getLessonCourse = async () => {
                const url = `http://localhost:8081/product/getLessonCourseAPI?idCourse=${data.course_id}`;
                const response = await axios.get(url);
                setlessonCourse(response.data.Countlesson);
            };
            getLessonCourse();
        }
    }, [data ? data.course_id : ""]);
    return (
        <div className="card">
            <div className="br-card">
                <div className="img_card">
                    <Link to={data ? `/detail-course/${data.course_id}` : "/"}>
                        <img
                            className="img_course"
                            src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                            alt=""
                        />
                    </Link>
                    <div
                        className={`${
                            courseHaveBuy ? "hidden" : ""
                        } note_card debuted`}
                    >
                        {data ? data.course_price : ""}đ
                    </div>
                    <div
                        className={`${
                            courseHaveBuy ? "hidden" : ""
                        } note_card undebuted`}
                    >
                        {data ? data.level_course : ""}
                    </div>
                    {/* 1 of 2 */}
                    {/* <div className="note_card undebuted">đã ra mắt</div> */}
                </div>
                <div className="title_card">
                    <h3 className="title">
                        <Link
                            to={data ? `/detail-course/${data.course_id}` : "/"}
                        >
                            {data ? data.course_name : ""}
                        </Link>
                    </h3>
                </div>
                <div className="info_card">
                    <div className="name-author">
                        <Link
                            to={data ? `/detail-course/${data.course_id}` : "/"}
                        >
                            {data ? data.name_author : ""}
                        </Link>
                    </div>
                    <div className="info_lecture">
                        <span class="material-symbols-outlined">skip_next</span>
                        <span class="">
                            {lessonCourse ? lessonCourse : ""} bài học
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
