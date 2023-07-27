import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
export const NavigationMain = ({
    icon,
    title,
    categoryNav,
    setHidden,
    checkSetHidden,
}) => {
    const [checkHidden, setCheckHidden] = useState(true);
    const [checkDb, setCheckDb] = useState(false);
    useEffect(() => {
        if (title === "Trang Chủ") {
            setCheckDb(true);
        }
    }, []);
    const { link } = categoryNav;
    return (
        <li>
            <div
                onClick={() => {
                    setCheckHidden(!checkHidden);
                }}
                className="title-category-dash-boad"
            >
                <Link
                    to={`${checkDb ? "/" : "#"}`}
                    className="info-dash-board_icon"
                >
                    <span class="icon-dash_board material-symbols-outlined">
                        {icon}
                    </span>
                    <span className="content-info-dash_board">{title}</span>
                </Link>
                <span
                    class={`${
                        checkDb
                            ? "hidden"
                            : checkHidden
                            ? "rotate--90"
                            : "rotate-90"
                    } mr-r-20px material-symbols-outlined`}
                >
                    chevron_right
                </span>
            </div>
            <ul
                className={`${
                    checkDb ? "hidden" : checkHidden ? "hidden" : ""
                } ul-nav_2-content-info`}
            >
                {categoryNav.map((el) => {
                    const { name, link } = el;
                    return (
                        <li
                            onClick={(e) => {
                                e.preventDefault();
                                checkSetHidden(!setHidden);
                            }}
                        >
                            <span class={`material-symbols-outlined`}>
                                arrow_right
                            </span>{" "}
                            <Link to={link}>{name}</Link>
                        </li>
                    );
                })}
            </ul>
        </li>
    );
};
