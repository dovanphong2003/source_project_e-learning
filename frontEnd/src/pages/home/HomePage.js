import { useContext, useEffect, useState } from "react";

import "../../assets/style/HomePage/homePage.css";
import { Banner } from "./Banner";
import { CategoryListCard } from "./CategoryListCard";
import { ListCardOfUser } from "./ListCardOfUser";
import axios from "axios";
export const HomePage = () => {
    const [dataCourseSeller, setDataCourseSeller] = useState([]);
    const [dataCourseNews, setDataCourseNews] = useState([]);
    const getCourseBSellerAndNews = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8081/course/getCourseBSellerAndNewsAPI"
            );
            setDataCourseNews(response.data.data.dataCourseNews);
            setDataCourseSeller(response.data.data.dataCourseSeller);
        } catch (error) {
            console.log("error get data course seller and news: ", error);
        }
    };
    useEffect(() => {
        getCourseBSellerAndNews();
    }, []);
    return (
        <main>
            <Banner />
            <div className="course_our_user">
                <div className="container-main">
                    <h2 style={{ color: "#da0b4e" }}>Khóa Học Của Tôi</h2>
                    <ListCardOfUser />
                </div>
            </div>
            <div className="container-main">
                <CategoryListCard
                    data={dataCourseNews}
                    title="KHÓA HỌC MỚI NHẤT"
                />
                <CategoryListCard data={dataCourseSeller} title="SIÊU ƯU ĐÃI" />
            </div>
        </main>
    );
};
