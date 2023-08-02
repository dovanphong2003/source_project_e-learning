import React from "react";
import { useEffect, useState } from "react";
import "../../assets/style/HomePage/homePage.css";
import "../../assets/style/responsiveCss/resHomePage.css";
import { Banner } from "./Banner";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { CategoryListCard } from "./CategoryListCard";
import { ListCardOfUser } from "./ListCardOfUser";
import { useContext } from "react";
import axios from "axios";
import { RoleContext } from "../../context/RoleContext";
export const HomePage = () => {
    const [dataCourseSeller, setDataCourseSeller] = useState([]);
    const [dataCourseNews, setDataCourseNews] = useState([]);
    const { isIdUser } = useContext(RoleContext);
    const getCourseBSellerAndNews = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/course/getCourseBSellerAndNewsAPI`
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

    // get data cart of user
    const [dataCourseOfUser, setDataCourseOfUser] = useState([false]);
    const getCourseOfUser = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/course/getCourseOfUserAPI?isIdUser=${isIdUser}`
            );
            if (response.data) {
                setDataCourseOfUser(response.data.data);
            }
        } catch (error) {
            console.log("error handle get course of user: ", error);
        }
    };
    useEffect(() => {
        getCourseOfUser();
    }, [isIdUser]);
    console.log("data course user have buy : ", dataCourseOfUser);
    return (
        <main>
            <Banner />
            {dataCourseOfUser[0] !== false ? (
                dataCourseOfUser.length ? (
                    <div className="course_our_user">
                        <div className="container-main">
                            <h2 style={{ color: "#da0b4e" }}>
                                Khóa Học Của Tôi
                            </h2>
                            <ListCardOfUser data={dataCourseOfUser} />
                        </div>
                    </div>
                ) : (
                    ""
                )
            ) : (
                <Skeleton
                    width={"100%"}
                    height={"200px"}
                    duration={2}
                    count={1}
                    className="skeleton-css"
                    baseColor="#faf9ff"
                    highlightColor="#dadada"
                />
            )}
            <div className="container-main">
                <CategoryListCard
                    data={dataCourseNews.length === 0 ? false : dataCourseNews}
                    title="KHÓA HỌC MỚI NHẤT"
                    checkCourseNew={true}
                />
                <CategoryListCard
                    data={
                        dataCourseSeller.length === 0 ? false : dataCourseSeller
                    }
                    title="SIÊU ƯU ĐÃI"
                    checkCourseNew={false}
                />
            </div>
        </main>
    );
};
