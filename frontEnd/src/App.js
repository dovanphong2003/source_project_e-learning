import React, { useEffect, useState } from "react";
import { DisplayUser } from "./assets/display/DisplayUser";
import { DisplayAdmin } from "./assets/display/DisplayAdmin";
import AutoScrollTop from "./components/Sections/AutoScrollTop";
import axios from "axios";
import { VerifyToken } from "./components/Sections/FunctionAll";
const App = function () {
    const [roleUser, setRoleUser] = useState("student");
    // get info user - id
    const fncgetInfoUserByAccessTokenAPI = async () => {
        try {
            const response = await axios.get(
                `${
                    process.env.REACT_APP_URL_BACKEND
                }/getInfoUserByAccessTokenAPI?accessToken=${localStorage.getItem(
                    "accessToken"
                )}`
            );
            localStorage.setItem("role", response.data.data.role);
            setRoleUser(response.data.data.role);
            return response.data.data;
        } catch (error) {
            if (error.response.data.ec.message === "jwt expired") {
                const funcVerifyToken = await VerifyToken();
                const checkVerify = await funcVerifyToken();
                if (checkVerify) {
                    try {
                        const response = await axios.get(
                            `${
                                process.env.REACT_APP_URL_BACKEND
                            }/getInfoUserByAccessTokenAPI?accessToken=${localStorage.getItem(
                                "accessToken"
                            )}`
                        );
                        localStorage.setItem("role", response.data.data.role);
                        setRoleUser(response.data.data.role);
                        return response.data.data;
                    } catch (error) {}
                }
            }
        }
    };
    useEffect(() => {
        if (
            localStorage.getItem("accessToken") &&
            localStorage.getItem("role") &&
            localStorage.getItem("role") !== "virtualUser"
        ) {
            fncgetInfoUserByAccessTokenAPI();
        }
    }, [localStorage.getItem("role")]);
    ////////////////////////////
    return (localStorage.getItem("role") &&
        localStorage.getItem("role") === "admin") ||
        roleUser === "admin" ? (
        <>
            <AutoScrollTop />
            <DisplayAdmin setRoleUser={setRoleUser} />
        </>
    ) : (localStorage.getItem("role") &&
          localStorage.getItem("role") === "virtualUser") ||
      roleUser === "virtualUser" ? (
        <>
            <AutoScrollTop />
            <DisplayUser
                isVirtualUser="virtualUser"
                setRoleUser={setRoleUser}
            />
        </>
    ) : (
        <>
            <AutoScrollTop />
            <DisplayUser setRoleUser={setRoleUser} />
        </>
    );
};

export default App;
