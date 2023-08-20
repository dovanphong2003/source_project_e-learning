import React, { useState } from "react";
import { NavigationMain } from "../../navigationAdmin/NavigationMain";

export const Navigationdb = ({ forEl }) => {
    const arrInfo = [
        { icon: "dashboard", title: "Trang Chủ" },
        { icon: "queue_play_next", title: "Khóa Học" },
        { icon: "person_add", title: "Người Dùng" },
        { icon: " format_list_bulleted_add", title: "Ghi Danh" },
    ];
    const categoryNav = [
        [{ name: "", link: "/" }],
        [
            { name: "Quản lí khóa học", link: "admin-website/course" },
            { name: "Thêm khóa học mới", link: "admin-website/add-course" },
            { name: "Thêm chương mới", link: "admin-website/AddModuleCrouse" },
            { name: "Thêm bài học mới", link: "admin-website/AddLessonCourse" },
            { name: "Danh mục khóa học", link: "admin-website/ad-category" },
        ],
        [
            { name: "Quản lí Admin", link: "/admin-website/dash-broad-ad" },
            {
                name: "Quản lí học viên",
                link: "/admin-website/dash-broad-student",
            },
            {
                name: "Tạo người dùng",
                link: "/admin-website/dash-broad-add-student",
            },
        ],
        [
            {
                name: "Lịch sử ghi danh",
                link: "/admin-website/dash-broad-history-envirolment",
            },
            {
                name: "Ghi danh học viên",
                link: "/admin-website/dash-broad-add-envirolment",
            },
        ],
    ];
    let i = -1;
    const iPlus = () => {
        i++;
    };
    const [setHiddenMenu, checkSetHiddenMenu] = useState(true);
    return (
        <>
            <div
                onClick={(e) => {
                    e.preventDefault();
                    if (forEl === "mobile") {
                        checkSetHiddenMenu(!setHiddenMenu);
                    }
                }}
                className="tab-navigation-menu"
            >
                <span class="material-symbols-outlined">menu</span>
            </div>
            <div
                className={`${
                    forEl === "mobile"
                        ? "classForMenuMobile"
                        : "classForMenuAll"
                }  ${
                    forEl === "mobile" ? (setHiddenMenu ? "hidden" : "") : ""
                } navigation_dash-board`}
            >
                <div className="header-navigation_dash-board">
                    <div className="image-name_hd-nav-db">
                        <img
                            src="/image_user-default.png"
                            alt=""
                            className="img-frame-admin"
                        />
                        <span>
                            {localStorage.getItem("nameUser")
                                ? localStorage.getItem("nameUser")
                                : "loading..."}
                        </span>
                    </div>
                </div>
                <div className="main-navigation_dash-board">
                    <ul className="ul-navigation_dash-board">
                        <p>Điều Hướng</p>
                        {/**content navigation */}
                        {arrInfo.map((el) => {
                            iPlus();
                            return (
                                <NavigationMain
                                    categoryNav={categoryNav[i]}
                                    icon={el.icon}
                                    title={el.title}
                                    setHidden={setHiddenMenu}
                                    checkSetHidden={checkSetHiddenMenu}
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};
