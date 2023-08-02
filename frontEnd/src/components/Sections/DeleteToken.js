import React from "react";
import axios from "axios";

export const DeleteCookie = async () => {
    try {
        if (localStorage.getItem("accessToken")) {
            localStorage.removeItem("nameUser");
            localStorage.removeItem("accessToken");
        }
        const deleteRefreshToken = await axios.delete(
            `${process.env.URL_BACKEND}/cleanCookieAPI`,
            { withCredentials: true }
        );
        return deleteRefreshToken;
    } catch (error) {
        console.log("er: ", error);
        return "ban  da bi loi lon roi";
    }
};
