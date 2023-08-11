import React, { useState } from "react";
export const AddResultCrs = ({ Mykey, id }) => {
    return (
        <li
            key={Mykey}
            className={`result-ecr-input_plus div_course-result_li`}
        >
            <input
                placeholder="kết quả sau khi hoàn thành khóa học..."
                className="plus_result_end"
                type="text"
            />
            <span
                onClick={(e) => {
                    const ulElement = document.getElementById(
                        "node-list_result_course"
                    );
                    const liEl = e.target.parentNode; // parenr target onclick ( tag li )
                    const liIndex = Array.from(
                        liEl.parentNode.children
                    ).indexOf(liEl);
                    const childToRemove = ulElement.children[liIndex]; // Lấy con thứ 3 (index 2)
                    ulElement.removeChild(childToRemove);
                }}
                className="icon_plus_delete material-symbols-outlined"
            >
                remove
            </span>
        </li>
    );
};
