import React, { useEffect, useState } from "react";
import "../../assets/style/detailCourse/detailCr.css";
import { ModulesLession } from "./component/ModulesLession";
import { useParams } from "react-router-dom";
import axios from "axios";
export const DetailCourse = () => {
    const param = useParams();
    const arrTitle = [
        "Module 01: Biểu thức chính quy (Regular Expression)",
        "Module 02: Lập trình hướng đối tượng (OOP)",
        "Module 03: Làm việc với cURL trong PHP",
        "Module 04: Làm việc với File - Folder",
        "Module 05: Xây dựng mô hình MVC",
    ];
    const getModuleLesson = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8081/product/getModuleLessonAPI?idCourse=${param.id}`
            );
        } catch (error) {
            console.log("error where detailCourse: ", error);
        }
    };
    useEffect(() => {
        getModuleLesson();
    }, [param.id]);
    return (
        <main>
            <div className="title_header-detal-cr">
                <h1 className="title_DetailCourse">
                    Lập Trình PHP Nâng Cao - Chuyên Sâu Để Đi Làm
                </h1>
            </div>
            <div className="container-main">
                <div className="header_container-main">
                    <div className="content_container-main">
                        <div className="detail-describe">
                            <h2>Mô Tả</h2>
                            <p className="info-detail_cr">
                                Khoá học PHP nâng cao trang bị cho học viên các
                                kiến thức nâng cao về ngôn ngữ lập trình PHP để
                                chuẩn bị đi làm và học nâng cao lên các PHP
                                Framework
                            </p>
                            <ul>
                                <span className="will-learn_detail-cr">
                                    Bạn sẽ học được gì ?
                                </span>
                                <li>
                                    <span class="material-symbols-outlined icon_done">
                                        done
                                    </span>
                                    <span className="detail_list-des">
                                        Biểu thức chính quy (Regular Expression)
                                    </span>
                                </li>
                                <li>
                                    <span class="material-symbols-outlined icon_done">
                                        done
                                    </span>
                                    <span className="detail_list-des">
                                        Lập trình hướng đối tượng
                                    </span>
                                </li>
                                <li>
                                    <span class="material-symbols-outlined icon_done">
                                        done
                                    </span>
                                    <span className="detail_list-des">
                                        Thao tác với File - Folder
                                    </span>
                                </li>
                                <li>
                                    <span class="material-symbols-outlined icon_done">
                                        done
                                    </span>
                                    <span className="detail_list-des">
                                        Mô hình MVC - HMVC
                                    </span>
                                </li>
                                <li>
                                    <span class="material-symbols-outlined icon_done">
                                        done
                                    </span>
                                    <span className="detail_list-des">
                                        XML - DOM - JSON
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="detail-describe">
                            <h2>Bài Học</h2>
                            {/**cart */}
                            {arrTitle.map((el) => {
                                return <ModulesLession title={el} />;
                            })}
                        </div>
                    </div>
                    <div className="detail-info">
                        <div className="image-detail">
                            <img
                                className="img_course-detail"
                                src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg"
                                alt=""
                            />
                        </div>
                        <div className="detail-price">500.000đ</div>
                        <p>Giảng viên: Hoàng An Unicode</p>
                        <p>Không giới hạn thời gian</p>
                        <div className="detail_button">
                            <a href="">
                                <button>Mua Khóa Học</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
