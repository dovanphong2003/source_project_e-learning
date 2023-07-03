import React from "react";
import { useEffect } from "react";
import Chart from "chart.js/auto";
export const CharCrOverview = ({ total_pending, total_handle }) => {
    let ctx;
    let mycharOverview;
    const dataChar = {
        // labels: ["Khóa học đã kích hoạt", "Khóa học chờ kích hoạt"],
        datasets: [
            {
                label: "Số Lượng",
                data: [total_pending, total_handle],
                backgroundColor: ["#0acf97", "#ffbc00"],
                hoverOffset: 4,
                borderWidth: 3,
            },
        ],
    };
    useEffect(() => {
        ctx = document.getElementById("myChartOverview");
        mycharOverview = new Chart(ctx, {
            type: "doughnut",
            data: dataChar,
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 16,
                                weight: 300,
                            },
                        },
                    },
                },
            },
        });

        return () => {
            mycharOverview.destroy();
        };
    }, [dataChar]);
    return (
        <div className="cart-char_revenue-admin">
            <div className="title-cart-char">Tổng Quan Về Xử Lí Khóa Học</div>
            <div className="charOverview">
                <div>
                    <canvas id="myChartOverview"></canvas>
                </div>
            </div>
            <div className="info-charOverview">
                <div className="trending-grow">
                    <span class="material-symbols-outlined">trending_up</span>
                    <h5>{total_pending}</h5>
                    <p>Khóa học đang hoạt động</p>
                </div>
                <div className="trending-down">
                    <span class="material-symbols-outlined">trending_down</span>
                    <h5>{total_handle}</h5>
                    <p>Khóa học đang bị ẩn, không hoạt động</p>
                </div>
            </div>
        </div>
    );
};
