import React, { useEffect, useState } from "react";
import { InfoStudent } from "./InfoStudent";
import "../../assets/style/info/infoUser.css";
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
                `http://localhost:8081/getInfoUserAPI?idUser=${param.id}&accessToken=${isAccess}`
            );
            getDataUser(response.data.dataUser);
            return response.data.dataUser;
        } catch (error) {
            if (error.response.data) {
                if (error.response.data.message === "jwt expired") {
                    const newtoken = await RefeshToken();
                    getIsAccess(newtoken);
                    localStorage.setItem("accessToken", newtoken);
                    navigate(`/info-user/${param.id}`);
                }
            } else if (error.response.data.ec) {
                navigate("/");
                return "";
            }
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
