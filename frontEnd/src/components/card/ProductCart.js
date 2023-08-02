import React, { useEffect, useState } from "react";
import "../../assets/style/HomePage/Card.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
export const ProductCart = ({ courseHaveBuy, data }) => {
    const [lessonCourse, setlessonCourse] = useState([]);
    const handleFormatNumber = (number) => {
        // convert to string
        let strNumber = String(number);

        // reverse
        strNumber = strNumber.split("").reverse().join("");

        // create arr save
        let formattedArr = [];

        for (let i = 0; i < strNumber.length; i++) {
            if (i % 3 === 0 && i !== 0) {
                formattedArr.push(".");
            }
            formattedArr.push(strNumber[i]);
        }
        // convert reverse -> to origin
        formattedArr = formattedArr.reverse();

        // add đ end
        const formattedNumber = formattedArr.join("") + "đ";
        return formattedNumber;
    };
    useEffect(() => {
        if (data) {
            console.log("dataaaa; ", data);
            console.log(data.course_id);
            const getLessonCourse = async () => {
                const url = `${process.env.REACT_APP_URL_BACKEND}/product/getLessonCourseAPI?idCourse=${data.course_id}`;
                const response = await axios.get(url);
                setlessonCourse(response.data.Countlesson);
            };
            getLessonCourse();
        }
    }, [data]);

    // settime out sleketon
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        // Set timeout after 2 seconds to hide the Skeleton and show the <h3> element
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 1100);

        // Clean up the timer on component unmount
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className={`card`}>
            <div
                className={`br-card ${courseHaveBuy ? "course_have-buy" : ""}`}
            >
                <div className="img_card">
                    <Link
                        className="link_course_img-card"
                        to={data ? `/detail-course/${data.course_id}` : "/"}
                    >
                        {data && data.image_course ? (
                            showSkeleton ? (
                                <>
                                    <Skeleton
                                        width={"100%"}
                                        height={"100%"}
                                        duration={1}
                                        count={1}
                                        className="skeleton-css-mr-0"
                                        baseColor="#ffecd2 "
                                        highlightColor="#eebcac"
                                    />
                                </>
                            ) : (
                                <img
                                    className="img_course"
                                    src={`/imageCourse/${data.image_course}`}
                                    alt=""
                                />
                            )
                        ) : (
                            <Skeleton
                                width={"100%"}
                                height={"100%"}
                                duration={1}
                                count={1}
                                className="skeleton-css-mr-0"
                                baseColor="#ffecd2 "
                                highlightColor="#eebcac"
                            />
                        )}
                    </Link>
                    <Link to={data ? `/detail-course/${data.course_id}` : "/"}>
                        <div
                            className={`bnt-go-course ${
                                courseHaveBuy ? "" : "hidden"
                            }`}
                        >
                            <span class="pay_go-to-course material-symbols-outlined">
                                play_arrow
                            </span>
                        </div>
                    </Link>
                    <div
                        className={`${
                            courseHaveBuy ? "hidden" : ""
                        } note_card debuted`}
                    >
                        {data ? data.course_price : ""}
                    </div>
                    <div
                        className={`${
                            courseHaveBuy ? "hidden" : ""
                        } note_card undebuted`}
                    >
                        {data ? data.level_course : ""}
                    </div>
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
