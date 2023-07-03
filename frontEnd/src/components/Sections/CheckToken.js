import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
export const CheckToken = async () => {
    const location = useLocation();
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        try {
            const responseVerify = await axios.post(
                "http://localhost:8081/verifyTokenAPI",
                { accessToken, location: location.pathname }
            );
            const dataResult = {
                id: responseVerify.data.idUser,
                role: responseVerify.data.roleUser,
            };
            return dataResult;
        } catch (error) {
            if (error.response.data.ec.message === "jwt expired") {
                return "jwt expired";
            } else if (error.response.data.ec.message === "jwt malformed") {
                return "jwt malformed";
            } else {
                return "không xác định";
            }
        }
    } else {
        return "access token not defined";
    }
};
