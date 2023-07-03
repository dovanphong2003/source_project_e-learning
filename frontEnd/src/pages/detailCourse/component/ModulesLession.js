import React from "react";
import { useState } from "react";

export const ModulesLession = ({ title }) => {
    const [hiddenContentModule, setHiddenContentModule] = useState(true);
    const [checkAddAndRemove, setCheckAddAndRemove] = useState(true);
    const addAndRemoveModule = (e) => {
        setHiddenContentModule(!hiddenContentModule);
        setCheckAddAndRemove(!checkAddAndRemove);
    };
    return (
        <div className="container-main_module-detail">
            <div onClick={addAndRemoveModule} className=" title-container-main">
                <h3>{title}</h3>
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
                <a href="">
                    <li className="li-lesson_detail">
                        <span class="arrow-li-lesson material-symbols-outlined">
                            play_arrow
                        </span>
                        <span className="li-lesson_detail-title">
                            Bài 01: Regular Expression là gì? Ý nghĩa của
                            Regular Expression
                        </span>
                        <span class="vision-li-lession  material-symbols-outlined">
                            visibility
                        </span>
                    </li>
                </a>
                <a href="">
                    <li className="li-lesson_detail">
                        <span class="arrow-li-lesson material-symbols-outlined">
                            play_arrow
                        </span>
                        <span className="li-lesson_detail-title">
                            Bài 02: Khớp độ dài trong Regular Expression
                        </span>
                        <span class="vision-li-lession  material-symbols-outlined">
                            visibility
                        </span>
                    </li>
                </a>
                <a href="">
                    <li className="li-lesson_detail">
                        <span class="arrow-li-lesson material-symbols-outlined">
                            play_arrow
                        </span>
                        <span className="li-lesson_detail-title">
                            Bài 03: Website kiểm tra Regular Expression
                        </span>
                        <span class="vision-li-lession material-symbols-outlined">
                            visibility
                        </span>
                    </li>
                </a>
                <a href="">
                    <li className="li-lesson_detail">
                        <span class="arrow-li-lesson material-symbols-outlined">
                            play_arrow
                        </span>
                        <span className="li-lesson_detail-title">
                            Bài 04: Các ký hiệu cơ bản trong Regular Expression
                        </span>
                        <span class="vision-li-lession  material-symbols-outlined">
                            visibility
                        </span>
                    </li>
                </a>
                <a href="">
                    <li className="li-lesson_detail">
                        <span class="arrow-li-lesson  material-symbols-outlined">
                            play_arrow
                        </span>
                        <span className="li-lesson_detail-title">
                            Bài 05: Khớp đầu và cuối chuỗi trong Regular
                            Expression
                        </span>
                        <span class="vision-li-lession  material-symbols-outlined">
                            visibility
                        </span>
                    </li>
                </a>
            </ul>
        </div>
    );
};
