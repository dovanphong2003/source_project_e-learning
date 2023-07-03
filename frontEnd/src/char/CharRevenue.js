import React from "react";
import { useEffect } from "react";
import Chart from "chart.js/auto";
export const CharRevenue = () => {
    let ctx;
    let mychar;
    useEffect(() => {
        ctx = document.getElementById("myChartRevenue");
        mychar = new Chart(ctx, {
            type: "line",
            data: {
                labels: [
                    "Thứ 2",
                    "Thứ 3",
                    "Thứ 4",
                    "Thứ 5",
                    "Thứ 6",
                    "Thứ 7",
                    "Chủ nhật",
                ],
                datasets: [
                    {
                        label: "Doanh Thu Theo Tuần",
                        data: [10, 4, 13, 2, 21, 5, 11],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 14,
                                weight: 500,
                            },
                        },
                    },
                },
            },
        });

        return () => {
            mychar.destroy();
        };
    }, []);
    return (
        <div className="cart-char_revenue-admin">
            <div className="title-cart-char">Quản Trị Doanh Thu Tuần Này</div>
            <div className="char">
                <div>
                    <canvas id="myChartRevenue"></canvas>
                </div>
            </div>
        </div>
    );
};
