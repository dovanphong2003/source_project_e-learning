import React from "react";
import { useEffect, useState } from "react";
import "../../assets/style/HomePage/homePage.css";
import "../../assets/style/responsiveCss/resHomePage.css";
import { Banner } from "./Banner";
import Skeleton from "react-loading-skeleton";
import { CategoryListCard } from "./CategoryListCard";
import { ListCardOfUser } from "./ListCardOfUser";
import axios from "axios";
import { VerifyToken } from "../../components/Sections/FunctionAll";
export const HomePage = () => {
    const [dataCourseSeller, setDataCourseSeller] = useState([]);
    const [dataCourseNews, setDataCourseNews] = useState([]);
    const [dataUser, setDataUser] = useState({});

    // get id and info user use accesstoken
    const fncgetInfoUserByAccessTokenAPI = async () => {
        try {
            const response = await axios.get(
                `${
                    process.env.REACT_APP_URL_BACKEND
                }/getInfoUserByAccessTokenAPI?accessToken=${localStorage.getItem(
                    "accessToken"
                )}`
            );
            setDataUser(response.data.data);
        } catch (error) {
            if (error.response.data.ec.message === "jwt expired") {
                const funcVerifyToken = await VerifyToken();
                await funcVerifyToken();
                fncgetInfoUserByAccessTokenAPI();
            }
        }
    };
    useEffect(() => {
        if (
            localStorage.getItem("accessToken") &&
            localStorage.getItem("nameUser")
        ) {
            fncgetInfoUserByAccessTokenAPI();
        }
    }, [localStorage.getItem("nameUser")]);

    const getCourseBSellerAndNews = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/course/getCourseBSellerAndNewsAPI`
            );
            setDataCourseNews(response.data.data.dataCourseNews);
            setDataCourseSeller(response.data.data.dataCourseSeller);
        } catch (error) {}
    };
    useEffect(() => {
        getCourseBSellerAndNews();
    }, []);

    // get data cart of user
    const [dataCourseOfUser, setDataCourseOfUser] = useState(["false"]);
    const getCourseOfUser = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/course/getCourseOfUserAPI?isIdUser=${dataUser.id}`
            );
            if (response.data) {
                setDataCourseOfUser(response.data.data);
            }
        } catch (error) {}
    };
    useEffect(() => {
        if (dataUser.id) {
            getCourseOfUser();
        }
    }, [dataUser.id]);
    return (
        <main>
            <Banner />
            {localStorage.getItem("nameUser") ? (
                dataCourseOfUser[0] !== "false" ? (
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
                )
            ) : (
                ""
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
