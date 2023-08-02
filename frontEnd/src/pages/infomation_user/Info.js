import React, { useEffect, useState } from "react";
import { InfoStudent } from "./InfoStudent";
import "../../assets/style/info/infoUser.css";
import "../../assets/style/responsiveCss/resInfoUser.css";
import { InfoTeacher } from "./InfoTeacher";
import { RoleContext } from "../../context/RoleContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { RefeshToken } from "../../components/Sections/RefeshToken";
import { useNavigate } from "react-router-dom";
import { accessToken } from "../../context/AccessToken";
export const Info = () => {
    const { isAccess, getIsAccess } = useContext(accessToken);
    const param = useParams();
    const navigate = useNavigate();
    const { isRole, setUser } = useContext(RoleContext);
    const [dataUser, getDataUser] = useState({});
    const getInfoUser = async () => {
        try {
            const response = await axios.get(
                `${process.env.URL_BACKEND}/getInfoUserAPI?idUser=${param.id}`
            );
            getDataUser(response.data.dataUser);
            return response.data.dataUser;
        } catch (error) {
            console.log("error handle info user: ", error);
            navigate("/");
            return "";
        }
    };
    useEffect(() => {
        getInfoUser();
    }, [isAccess]);
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
