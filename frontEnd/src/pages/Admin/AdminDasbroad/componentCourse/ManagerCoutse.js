import React from "react";
import { ListCourse } from "./cpnListCrourse/ListCourse";
import "../cssPageAdmin/courseCss/managerCourse.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export const ManagerCoutse = () => {
    const [dataAllCourse, setDataAllCourse] = useState([]);
    const [infoBasicCourse, setInfoBasicCourse] = useState([]);
    const getDataAllCourse = async () => {
        const response = await axios.get(
            "http://localhost:8081/course/getAllCourseAPI"
        );
        console.log("data: ", response.data.data);
        if (response.data) {
            setDataAllCourse(response.data.data);
            setInfoBasicCourse(
                response.data.data.map((el) => ({
                    course_id: el.course_id,
                    course_name: el.course_name,
                    course_price: el.course_price,
                    course_instructor: el.user_name,
                    image_course: el.image_course,
                    status: el.status,
                    bestseller: el.bestseller,
                }))
            );
        }
    };
    useEffect(() => {
        getDataAllCourse();
    }, []);

    // get course pending
    const CoursePending = dataAllCourse
        ? dataAllCourse.filter((el) => el.status === "pending").length
        : "";

    // get course handle
    const courseHandle =
        dataAllCourse && CoursePending
            ? dataAllCourse.length - CoursePending
            : "";

    // get course free
    const CourseFree = dataAllCourse
        ? dataAllCourse.filter((el) => el.course_price === "free").length
        : "";

    // get course pay fees
    const coursePayFees =
        dataAllCourse && CoursePending ? dataAllCourse.length - CourseFree : "";

    // get data info basic course

    return (
        <>
            <div className="card-info_dash-board border-norm">
                <Link
                    to="#"
                    className="border_bottom border_right el-cartd-info_db"
                >
                    <span class="material-symbols-outlined">check_circle</span>
                    <p>{CoursePending}</p>
                    <h5 className="h5-manage-course">Khóa học đã kích hoạt</h5>
                </Link>
                <Link to="#" className="border_bottom el-cartd-info_db">
                    <span class="material-symbols-outlined">
                        pending_actions
                    </span>
                    <p>{courseHandle}</p>
                    <h5 className="h5-manage-course">Khóa học chờ xử lí</h5>
                </Link>
                <Link
                    to="#"
                    className="border_bottom border_right el-cartd-info_db"
                >
                    <span class="material-symbols-outlined">new_releases</span>
                    <p>{CourseFree}</p>
                    <h5 className="h5-manage-course">Khóa học miễn phí</h5>
                </Link>
                <Link to="#" className="border_bottom el-cartd-info_db">
                    <span class="material-symbols-outlined">paid</span>
                    <p>{coursePayFees}</p>
                    <h5 className="h5-manage-course">khóa học trả phí</h5>
                </Link>
            </div>
            <ListCourse infoBasicCourse={infoBasicCourse} />
        </>
    );
};
