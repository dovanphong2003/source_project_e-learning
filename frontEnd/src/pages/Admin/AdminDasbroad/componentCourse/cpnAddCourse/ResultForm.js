import React, { useEffect, useState } from "react";
import { AddResultCrs } from "./AddResultCrs";
export const ResultForm = () => {
    let i = 1;
    const increaseI = () => {
        i++;
    };
    const [listResultEndCourse, setListResultEndCourse] = useState([]);
    return (
        <>
            <div className="result-end_course">
                <h4>Kết Quả Đạt Được</h4>
                <ul id="node-list_result_course">
                    <li className="result-ecr-input_plus div_course-result_li">
                        <input
                            placeholder="kết quả sau khi hoàn thành khóa học..."
                            className="plus_result_end"
                            id="input_default_one_result-course"
                            type="text"
                        />
                        <span
                            onClick={() => {
                                const newList = [...listResultEndCourse, i];
                                increaseI();
                                setListResultEndCourse(newList);
                            }}
                            class="icon_plus_result material-symbols-outlined"
                        >
                            add
                        </span>
                    </li>
                    {listResultEndCourse.map((el) => {
                        increaseI();
                        return <AddResultCrs Mykey={el} id={el} />;
                    })}
                </ul>
            </div>
        </>
    );
};
