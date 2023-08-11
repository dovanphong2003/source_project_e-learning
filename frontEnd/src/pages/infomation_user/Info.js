import React, { useEffect, useState } from "react";
import { InfoStudent } from "./InfoStudent";
import "../../assets/style/info/infoUser.css";
import "../../assets/style/responsiveCss/resInfoUser.css";
import { InfoTeacher } from "./InfoTeacher";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VerifyToken } from "../../components/Sections/FunctionAll";
export const Info = () => {
    const param = useParams();
    const navigate = useNavigate();
    const isRole = localStorage.getItem("role")
        ? localStorage.getItem("role")
        : null;

    const [getDataIdUser, setDataIdUser] = useState({});
    const fncgetInfoUserByAccessTokenAPI = async () => {
        try {
            const response = await axios.get(
                `${
                    process.env.REACT_APP_URL_BACKEND
                }/getInfoUserByAccessTokenAPI?accessToken=${localStorage.getItem(
                    "accessToken"
                )}`
            );
            setDataIdUser(response.data.data);
        } catch (error) {
            if (error.response.data.ec.message === "jwt expired") {
                const funcVerifyToken = await VerifyToken();
                await funcVerifyToken();
                fncgetInfoUserByAccessTokenAPI();
            }
        }
    };
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            fncgetInfoUserByAccessTokenAPI();
        }
    }, [localStorage.getItem("nameUser")]);
    const [dataUser, getDataUser] = useState({});
    const getInfoUser = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/getInfoUserAPI?idUser=${getDataIdUser.id}`
            );
            getDataUser(response.data.dataUser);
            return response.data.dataUser;
        } catch (error) {
            navigate("/");
            return "";
        }
    };
    useEffect(() => {
        if (getDataIdUser.id) {
            getInfoUser();
        }
    }, [getDataIdUser.id]);
    if (isRole === "student") {
        return (
            <main>
                <InfoStudent data={dataUser} />
            </main>
        );
    }
    if (isRole === "instructor") {
        return (
            <main>
                <InfoTeacher data={dataUser} />
            </main>
        );
    }
};
