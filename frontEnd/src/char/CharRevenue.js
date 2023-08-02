import React, { useState } from "react";
import { useEffect } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
export const CharRevenue = () => {
    let ctx;
    let mychar;
    const [dataRevenue, setDataRevenue] = useState([]);

    // get day
    const getDayOfDateTime = (dateStr) => {
        // const dateStr = dataRevenue[i].created_at;
        const date = new Date(dateStr);
        const dayOfWeek = date.getUTCDay();
        const weekdays = [
            "Chủ nhật",
            "Thứ hai",
            "Thứ ba",
            "Thứ tư",
            "Thứ năm",
            "Thứ sáu",
            "Thứ bảy",
        ];
        const dayName = weekdays[dayOfWeek];
        return dayName;
    };
    const handleTotal =
        dataRevenue && dataRevenue.length
            ? dataRevenue
                  .reduce((arr, obj) => {
                      const getDay = getDayOfDateTime(obj.created_at);
                      const getTotalEl = Number(
                          obj.course_price
                              .split(".")
                              .join("")
                              .split("đ")
                              .join("")
                              .split(",")
                              .join("")
                      );
                      if (!arr.length) {
                          arr.push({ day: getDay, total: getTotalEl });
                      } else {
                          const check = arr.find((el) => el.day === getDay);
                          if (check) {
                              if (obj.course_price === "free") {
                                  return arr;
                              }
                              check.total += getTotalEl;
                          } else {
                              arr.push({ day: getDay, total: getTotalEl });
                          }
                      }
                      return arr;
                  }, [])
                  .reduce(
                      (arr, obj) => {
                          arr[0].push(obj.day);
                          arr[1].push(obj.total);
                          return arr;
                      },
                      [[], []]
                  )
            : "";

    // get current
    const getCurrentDayOfWeek = () => {
        const daysOfWeek = [
            "Chủ nhật",
            "Thứ hai",
            "Thứ ba",
            "Thứ tư",
            "Thứ năm",
            "Thứ sáu",
            "Thứ bảy",
        ];
        const todayIndex = new Date().getDay();
        const currentDayOfWeek = daysOfWeek[todayIndex];
        return currentDayOfWeek;
    };

    const currentDay = getCurrentDayOfWeek();

    const funcGet = () => {
        // index handleTotal
        let i = 0;
        // index arr day
        let j = 0;
        const arrDay = [
            [
                "Thứ hai",
                "Thứ ba",
                "Thứ tư",
                "Thứ năm",
                "Thứ sáu",
                "Thứ bảy",
                "Chủ nhật",
            ],
            [],
        ];
        while (i < arrDay[0].length) {
            const dataOfDay = handleTotal[0].find((el, index) => {
                return el === arrDay[0][i];
            });
            if (dataOfDay) {
                arrDay[1].push(
                    handleTotal[1][handleTotal[0].indexOf(dataOfDay)]
                );
                i++;
            } else {
                arrDay[1].push(0);
                i++;
            }
        }
        const arrNew = [arrDay[0]];
        const indexCurrent = arrDay[0].indexOf(currentDay);
        arrNew.push(
            arrDay[1].map((el, index) => {
                return index > indexCurrent ? 0 : el;
            })
        );
        return arrNew;
    };

    const dataSevenDay = handleTotal && handleTotal.length ? funcGet() : [];
    console.log("handle date Time: ", dataSevenDay);
    const getDataEnrolment = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_URL_BACKEND}/enrolment/getDataEnrolmentRevenueAPI`
        );
        setDataRevenue(response.data.data);
    };
    useEffect(() => {
        getDataEnrolment();
    }, []);
    useEffect(() => {
        ctx = document.getElementById("myChartRevenue");

        // config char
        mychar = new Chart(ctx, {
            type: "line",
            data: {
                labels: dataSevenDay.length
                    ? dataSevenDay[0]
                    : [
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
                        label: "Biểu Đồ Doanh Thu Trong Tuần",
                        data: dataSevenDay.length
                            ? dataSevenDay[1]
                            : [0, 0, 0, 0, 0, 0, 0],
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
    }, [handleTotal]);
    return (
        <div className="cart-char_revenue-admin">
            <div className="title-cart-char">Quản Trị Doanh Thu Tuần Này</div>
            <div className="char">
                <div>
                    <canvas
                        id="myChartRevenue"
                        style={{ display: "inline-block !important" }}
                    ></canvas>
                </div>
            </div>
        </div>
    );
};
