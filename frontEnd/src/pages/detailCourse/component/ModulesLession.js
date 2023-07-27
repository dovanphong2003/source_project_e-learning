import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const ModulesLession = ({
    title,
    arrLesson,
    indexModule,
    arrIdLesson,
    id_course,
    numberIndex,
    checkBuyCourse,
}) => {
    const [hiddenContentModule, setHiddenContentModule] = useState(true);
    const [checkAddAndRemove, setCheckAddAndRemove] = useState(true);
    const addAndRemoveModule = (e) => {
        setHiddenContentModule(!hiddenContentModule);
        setCheckAddAndRemove(!checkAddAndRemove);
    };
    const notifyWarning = (content) => toast.warning(content);

    return (
        <div className="container-main_module-detail">
            <div onClick={addAndRemoveModule} className=" title-container-main">
                <h3>{`Chương ${indexModule}: ${title}`}</h3>
                {checkAddAndRemove ? (
                    <span class=" material-symbols-outlined">add</span>
                ) : (
                    <span class=" material-symbols-outlined">remove</span>
                )}
            </div>
            <ul
                className={`${
                    hiddenContentModule ? "hidden" : ""
                } ul-container-main_detail`}
            >
                {arrLesson.map((el, index) => {
                    return (
                        <Link
                            onClick={() => {
                                console.log("check:  ", checkBuyCourse);
                                if (!checkBuyCourse) {
                                    notifyWarning(
                                        "Bạn hãy mua khóa học để xem video !"
                                    );
                                }
                            }}
                            to={
                                checkBuyCourse
                                    ? `/detail-course/${id_course}/view-video/${arrIdLesson[index]}?numberLesson=${numberIndex}`
                                    : "#"
                            }
                        >
                            <li className="li-lesson_detail">
                                <span class="arrow-li-lesson material-symbols-outlined">
                                    play_arrow
                                </span>
                                <span className="li-lesson_detail-title">
                                    {`Bài ${numberIndex++}: ${el}`}
                                </span>
                                <span class="vision-li-lession  material-symbols-outlined">
                                    visibility
                                </span>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};
