import React from "react";
import axios from "axios";

export const DeleteCookie = async () => {
    try {
        if (localStorage.getItem("accessToken")) {
            localStorage.removeItem("nameUser");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("login");
            localStorage.removeItem("role");
        }
        const deleteRefreshToken = await axios.delete(
            `${process.env.REACT_APP_URL_BACKEND}/cleanCookieAPI`,
            { withCredentials: true }
        );
        return deleteRefreshToken;
    } catch (error) {
        return "ban  da bi loi lon roi";
    }
};
