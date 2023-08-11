import React from "react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../cssCpnUsers/cssADminStudent.css";
import axios from "axios";
export const DashBStudent = () => {
    const [dataStudent, setDataStudent] = useState([]);
    const [dataCourseHaveBuy, setDataCourseHaveBuy] = useState([]);
    const getInfoStudent = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_URL_BACKEND}/getInfoStudentAPI`
        );
        setDataStudent(
            response.data.dataUser.map((el) => ({
                user_id: el.user_id,
                name: el.user_name,
                email: el.user_email,
                create: el.created_at,
                courseHaveBuy: [],
            }))
        );
    };
    const getCourseUserHaveBuy = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/enrolment/getDataEnrolmentAPI`
            );
            setDataCourseHaveBuy(response.data.data);
        } catch (error) {}
    };

    // handle use id_user -> get course of user
    const fncHandleData = (id_user, dataCourseHaveBuy, arrData) => {
        const checkData = dataCourseHaveBuy.find(
            (el) => el.user_id === id_user
        );
        if (checkData) {
            arrData.push(checkData.name_course);
            const dataNew = dataCourseHaveBuy.filter(
                (element) => element.name_course !== checkData.name_course
            );
            return fncHandleData(id_user, dataNew, arrData);
        } else {
            return arrData;
        }
    };
    useEffect(() => {
        getInfoStudent();
        getCourseUserHaveBuy();
    }, []);
    const columns = [
        {
            name: "id",
            selector: (row) => row.user_id,
        },
        {
            name: "name",
            selector: (row) => row.name,
        },
        {
            name: "email",
            cell: (row) => (
                <p
                    style={{
                        fontSize: "14px",
                        display: "block",
                    }}
                >
                    {row.email}
                </p>
            ),
        },
        {
            name: "Khóa học đã mua",
            cell: (row) => (
                <ul className="ul_course-was_buy">
                    {" "}
                    {row.courseHaveBuy.length ? (
                        row.courseHaveBuy.map((el) => {
                            return (
                                <li style={{ color: "#727cf5" }}>
                                    <span class="span_icon_arrow-right material-symbols-outlined">
                                        arrow_right_alt
                                    </span>
                                    <span>{el}</span>
                                </li>
                            );
                        })
                    ) : (
                        <p style={{ fontSize: "14px" }}>
                            Chưa có khóa học nào !
                        </p>
                    )}
                </ul>
            ),
        },
        {
            name: "Ngày tạo tài khoản",
            cell: (row) => (
                <p
                    style={{
                        fontSize: "14px",
                        display: "block",
                    }}
                >
                    {row.create}
                </p>
            ),
        },
    ];
    ///////////////// customer config
    const customStyles = {
        title: {
            fontSize: "18px",
        },
        rows: {
            style: {
                minHeight: "74px",
                color: "#6c757d", // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: "8px", // override the cell padding for head cells
                paddingRight: "8px",
                fontSize: "16px",
            },
        },
        cells: {
            style: {
                paddingLeft: "8px", // override the cell padding for data cells
                paddingRight: "8px",
                fontSize: "14px",
            },
        },
    };
    const [pending, setPending] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setPending(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);
    const paginationComponentOptions = {
        rowsPerPageText: "Hiển Thị",
        rangeSeparatorText: "Trong",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Tất Cả",
    };
    const [selectedRow, setSelectedRows] = useState(false);
    const [toggledClearRows, setToggleClearRows] = useState(false);

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
    };

    const handleClearRows = () => {
        setToggleClearRows(!toggledClearRows);
    };
    //////////////////////////////////////
    return (
        <>
            <div className="list_admin-course">
                <div className="course-list_course">
                    <div className="list_course-admin">
                        <DataTable
                            title="Danh Sách Học Viên"
                            columns={columns}
                            data={
                                dataStudent.length && dataCourseHaveBuy.length
                                    ? dataStudent.map((el) => {
                                          const getDataCourseOfUser =
                                              fncHandleData(
                                                  el.user_id,
                                                  dataCourseHaveBuy,
                                                  []
                                              );
                                          return {
                                              ...el,
                                              courseHaveBuy:
                                                  getDataCourseOfUser,
                                          };
                                      })
                                    : ""
                            }
                            direction="auto"
                            fixedHeader
                            fixedHeaderScrollHeight="400px"
                            highlightOnHover
                            responsive
                            pagination
                            paginationComponentOptions={
                                paginationComponentOptions
                            }
                            selectableRowsHighlight
                            selectableRowsNoSelectAll
                            selectableRowsRadio="checkbox"
                            selectableRowsVisibleOnly
                            subHeaderAlign="right"
                            subHeaderWrap
                            customStyles={customStyles}
                            progressPending={pending}
                            pointerOnHover
                            onSelectedRowsChange={handleChange}
                            clearSelectedRows={toggledClearRows}
                        />
                        <button
                            onClick={async () => {
                                if (selectedRow.length > 0) {
                                    const response = await Swal.fire({
                                        title: "Bạn có chắc chắn muốn xóa?",
                                        text: "Bạn sẽ không thể khôi phục điều này!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "vâng, tôi chắc!",
                                    });
                                    if (response.isConfirmed) {
                                        const result = await Swal.fire(
                                            "Vô hiệu hóa!",
                                            "Bạn đã vô hiệu hóa thành công tài khoản trên.",
                                            "success"
                                        );
                                        if (result) {
                                            const resultData =
                                                dataStudent.filter((el) => {
                                                    let yacobac = true;
                                                    for (
                                                        let i = 0;
                                                        i < selectedRow.length;
                                                        i++
                                                    ) {
                                                        if (
                                                            el ===
                                                            selectedRow[i]
                                                        ) {
                                                            yacobac = false;
                                                            break;
                                                        }
                                                    }
                                                    if (yacobac) return el;
                                                });
                                            setDataStudent(resultData);
                                            handleClearRows();
                                        }
                                    }
                                }
                            }}
                            className={`bnt-list_course-admin`}
                        >
                            Vô hiệu hóa tài khoản
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
