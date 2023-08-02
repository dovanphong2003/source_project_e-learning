import React from "react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../cssCpnUsers/cssdbADmin.css";
import axios from "axios";
export const DashBAdmin = () => {
    const [dataAdmin, setDataAdmin] = useState([]);
    const [checkAdminRoot, setCheckAdminRoot] = useState(false);
    const getInfoAdmin = async () => {
        const response = await axios.get(
            `${process.env.URL_BACKEND}/getInfoAdminAPI`
        );
        setDataAdmin(
            response.data.dataUser.map((el) => ({
                user_id: el.user_id,
                name: el.user_name,
                email: el.user_email,
                create: el.created_at,
            }))
        );
    };
    console.log(dataAdmin);

    useEffect(() => {
        getInfoAdmin();
    }, []);
    const columns = [
        {
            name: "Id",
            selector: (row) => row.user_id,
        },
        {
            name: "Tên",
            cell: (row) => (
                <p
                    style={{
                        fontSize: "14px",
                        display: "block",
                        color: "#000",
                    }}
                >
                    {row.name}
                </p>
            ),
        },
        {
            name: "Email",
            cell: (row) => (
                <p
                    style={{
                        fontSize: "14px",
                        display: "block",
                        color: "#000",
                    }}
                >
                    {row.email}
                </p>
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

    // {
    //     name: "action",
    //     cell: (row) => (
    //         <p
    //             className={`${
    //                 row.action === "root admin"
    //                     ? "root_list_admin"
    //                     : "admin-branch_list_admin"
    //             } `}
    //             style={{
    //                 fontSize: "14px",
    //                 display: "block",
    //             }}
    //         >
    //             {row.action}
    //         </p>
    //     ),
    // },
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
    const [rows, setRows] = useState([]);
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
                            title="Danh Sách Quản Trị Viên"
                            columns={columns}
                            data={dataAdmin}
                            direction="auto"
                            fixedHeader
                            fixedHeaderScrollHeight="400px"
                            highlightOnHover
                            responsive
                            pagination
                            paginationComponentOptions={
                                paginationComponentOptions
                            }
                            disabled={`${checkAdminRoot ? "" : "true"}`}
                            selectableRows
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
                            // contextActions={contextActions}
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
                                            "Xóa!",
                                            "Bạn đã xóa thành công dữ liệu.",
                                            "success"
                                        );
                                        if (result) {
                                            const resultData = rows.filter(
                                                (el) => {
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
                                                }
                                            );
                                            setRows(resultData);
                                            handleClearRows();
                                        }
                                    }
                                }
                            }}
                            className={`${
                                checkAdminRoot ? "" : "under_line-mid"
                            } bnt-list_course-admin`}
                        >
                            XÓA Quản Trị Viên
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
