import React, { useEffect, useState } from "react";
import { CharRevenue } from "../../../../char/CharRevenue";
import { CharCrOverview } from "../../../../char/CharCrOverview";
import axios from "axios";
import { Link } from "react-router-dom";
export const MainDashboard = () => {
    const [dataNumberCourse, setDataNumberCourse] = useState({});
    const getNumberData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/course/getDataForCourseAPI`
            );
            setDataNumberCourse(response.data.data[0]);
        } catch (error) {}
    };

    useEffect(() => {
        getNumberData();
    }, []);
    return (
        <>
            <CharRevenue />
            <div className="card-info_dash-board">
                <Link
                    to="/admin-website/course"
                    className="border_bottom border_right el-cartd-info_db"
                >
                    <span class="material-symbols-outlined">
                        queue_play_next
                    </span>
                    <p>
                        {dataNumberCourse
                            ? dataNumberCourse.total_courses
                            : "error"}
                    </p>
                    <h5>Số lượng khóa học</h5>
                </Link>
                <Link to="#" className="border_bottom el-cartd-info_db">
                    <span class="material-symbols-outlined">
                        emergency_recording
                    </span>
                    <p>
                        {dataNumberCourse
                            ? dataNumberCourse.total_lessons
                            : "error"}
                    </p>
                    <h5>Số lượng bài học</h5>
                </Link>
                <Link
                    to="/admin-website/dash-broad-history-envirolment"
                    className="border_bottom border_right el-cartd-info_db"
                >
                    <span class="material-symbols-outlined">
                        format_list_bulleted_add
                    </span>
                    <p>
                        {dataNumberCourse
                            ? dataNumberCourse.total_enrollments
                            : "error"}
                    </p>
                    <h5>Số lượng ghi danh</h5>
                </Link>
                <Link
                    to="/admin-website/dash-broad-student   "
                    className="border_bottom el-cartd-info_db"
                >
                    <span class="material-symbols-outlined">person</span>
                    <p>
                        {dataNumberCourse
                            ? dataNumberCourse.total_users
                            : "error"}
                    </p>
                    <h5>Số lượng học viên</h5>
                </Link>
            </div>
            <CharCrOverview
                total_pending={Number(dataNumberCourse.total_pending)}
                total_handle={Number(dataNumberCourse.total_handle)}
            />
        </>
    );
};
