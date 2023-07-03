import React from "react";
import { HeaderAdmin } from "../../components/Layout/HeaderAdmin";
import { RouterAdmin } from "../../routers/RouterAdmin";
import { MainDashboard } from "../../pages/Admin/AdminDasbroad/component/MainDashboard";
import { Navigationdb } from "../../pages/Admin/AdminDasbroad/component/Navigationdb";
import "../../assets/style/admin/dashboard.css";
export const DisplayAdmin = () => {
    return (
        <>
            <HeaderAdmin />
            <main className="main_dash-board">
                <div className="dash-board">
                    <Navigationdb />
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
