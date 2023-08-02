import React, { useContext, useEffect, useState } from "react";
import { HeaderAdmin } from "../../components/Layout/HeaderAdmin";
import { RouterAdmin } from "../../routers/RouterAdmin";
import { MainDashboard } from "../../pages/Admin/AdminDasbroad/component/MainDashboard";
import { Navigationdb } from "../../pages/Admin/AdminDasbroad/component/Navigationdb";
import "../../assets/style/admin/dashboard.css";
import "../../assets/style/responsiveCss/resDashBroadAd.css";
import { RoleContext } from "../../context/RoleContext";
import axios from "axios";

export const DisplayAdmin = () => {
    const { checkVerify, setCheckVerify } = useContext(RoleContext);
    const [dataUser, setDaTaUser] = useState({});

    const getInfoUser = async () => {
        try {
            const getInfUserAPI = await axios.get(
                `${
                    process.env.REACT_APP_URL_BACKEND
                }/getInfoUserByAccessTokenAPI?accessToken=${localStorage.getItem(
                    "accessToken"
                )}`
            );
            setDaTaUser(getInfUserAPI.data.data);
        } catch (error) {
            console.log("error get ìnouserAPI: ", error);
        }
    };
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            getInfoUser();
        }
    }, [checkVerify]);
    console.log("data user: ", dataUser);
    return (
        <>
            <HeaderAdmin dataUser={dataUser} />
            <main className="main_dash-board">
                <div className="dash-board">
                    <Navigationdb dataUser={dataUser} forEl="all" />
                    <Navigationdb dataUser={dataUser} forEl="mobile" />
                    <div className="content-main-dash-board">
                        <div className="title_content-main-db">
                            <h4>
                                <span class="material-symbols-outlined">
                                    dashboard
                                </span>
                                <p>Bảng điều khiển</p>
                            </h4>
                        </div>
                        <RouterAdmin />
                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            </main>
        </>
    );
};
