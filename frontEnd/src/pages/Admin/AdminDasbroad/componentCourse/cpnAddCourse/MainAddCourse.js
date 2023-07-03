import React, { useState } from "react";
import "../../cssPageAdmin/courseCss/addCourse.css";
import { FormInfoAll } from "./FormInfoAll";
export const MainAddCourse = () => {
    let i = 1;
    const [selectTag, setSelectTag] = useState(i);
    return (
        <>
            <div className="db-add_course">
                <h3 className="title_db-add_course">Thêm mới khóa học</h3>
                <div className="tage-add_course">
                    <span
                        className={`tage_1 ${
                            selectTag === 1 ? "active-course_add" : ""
                        }`}
                    >
                        Khai báo cơ bản
                    </span>
                    <span className="tage_2">kết quả đạt được</span>
                    <span className="tage_3">thông tin video</span>
                </div>
                <FormInfoAll form={selectTag} setForm={setSelectTag} />
                <div className="next-component">
                    <div
                        onClick={() => {
                            const elementIn =
                                document.querySelector(".active-course_add");
                            if (elementIn) {
                                elementIn.classList.remove("active-course_add");
                            }
                            if (selectTag > 1) {
                                i = selectTag - 1;
                                setSelectTag(i);

                                const elementOut = document.querySelector(
                                    `.tage_${i}`
                                );
                                if (elementOut) {
                                    elementOut.classList.add(
                                        "active-course_add"
                                    );
                                }
                            } else {
                                setSelectTag(3);
                                document
                                    .querySelector(`.tage_3`)
                                    .classList.add("active-course_add");
                            }
                        }}
                        className="box-next next-left"
                    >
                        <span class="material-symbols-outlined">
                            arrow_back_ios
                        </span>
                    </div>
                    <div
                        onClick={() => {
                            const elementIn =
                                document.querySelector(".active-course_add");
                            if (elementIn) {
                                elementIn.classList.remove("active-course_add");
                            }
                            if (selectTag < 3) {
                                i = selectTag + 1;
                                setSelectTag(i);
                                const elementOut = document.querySelector(
                                    `.tage_${i}`
                                );
                                if (elementOut) {
                                    elementOut.classList.add(
                                        "active-course_add"
                                    );
                                }
                            } else {
                                setSelectTag(1);
                            }
                        }}
                        className="box-next next-right"
                    >
                        <span class="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};
