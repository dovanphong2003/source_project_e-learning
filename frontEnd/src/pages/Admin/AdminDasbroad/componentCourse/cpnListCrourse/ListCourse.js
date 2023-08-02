import React, { useRef } from "react";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./styleListCourse.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
export const ListCourse = ({ infoBasicCourse }) => {
    const [clHidden, setClHidden] = useState(false);
    const notifyError = (content) => toast.error(content);
    const notifySuccess = (content) => toast.success(content);
    const setBestSeller = async (id_course, action) => {
        const response = await axios.post(
            `${process.env.URL_BACKEND}/course/setBesellerAPI`,
            { id_course, action }
        );
        if (response.data) {
            notifySuccess(response.data.message);
        } else {
            notifyError("có lỗi khi thay đổi");
        }
    };
    const columns = [
        {
            name: "Tên khóa học",
            cell: (row) => (
                <Link
                    to={"/"}
                    className="tag_p-title_course_manager"
                    style={{
                        padding: "0px",
                        color: "#000",
                        textAlign: "center",
                        fontSize: "14px",
                    }}
                >
                    {row.course_name}
                </Link>
            ),
        },
        {
            name: "giá khóa học",
            cell: (row) => (
                <p
                    className="tag_p-title_course_manager"
                    style={{
                        padding: "0px",
                        color: "#000",
                        textAlign: "center",
                        fontSize: "14px",
                    }}
                >
                    {row.course_price}
                </p>
            ),
        },
        {
            name: "Giảng viên",
            cell: (row) => (
                <p
                    className="tag_p-title_course_manager"
                    style={{
                        padding: "0px",
                        color: "#000",
                        textAlign: "center",
                        fontSize: "14px",
                    }}
                >
                    {row.course_instructor}
                </p>
            ),
        },
        {
            name: "Ảnh",
            cell: (row) => (
                <img
                    style={{
                        borderRadius: "10px",
                        border: "1px solid #000",
                        objectFit: "cover",
                    }}
                    src={`/imageCourse/${row.image_course}`}
                    alt={`Image ${row.id}`}
                    width="80"
                    height="60"
                />
            ),
        },
        {
            name: "Trạng Thái",
            cell: (row) => (
                <p className="status_course_manager_table">{row.status}</p>
            ),
        },
        {
            name: "Sửa",
            cell: (row) => (
                <button
                    onClick={(e) => {
                        let valueId = e.target.className.split(" ")[0];
                        if (valueId) {
                            const divElement = document.getElementById(
                                `edit_cl_${row.course_id}`
                            );
                            divElement.classList.toggle("hidden");
                        }
                        // document.getElementById();
                        setClHidden(!clHidden);
                    }}
                    className={`cl_${row.course_id} bnt-course-edit`}
                >
                    <span
                        class={`cl_${row.course_id} material-symbols-outlined`}
                    >
                        more_vert
                    </span>
                    <div
                        id={`edit_cl_${row.course_id}`}
                        className={`hidden container_edit-course`}
                    >
                        <ul>
                            <li
                                onClick={(e) => {
                                    if (
                                        e.target.textContent ===
                                        "Đặt Làm Best seller"
                                    ) {
                                        setBestSeller(row.course_id, "set");
                                        e.target.textContent = "Gỡ best seller";
                                        const parentElement =
                                            e.target.parentNode.parentNode;
                                        parentElement.classList.toggle(
                                            "hidden"
                                        );
                                    } else if (
                                        e.target.textContent ===
                                        "Gỡ best seller"
                                    ) {
                                        setBestSeller(row.course_id, "delete");
                                        e.target.textContent =
                                            "Đặt Làm Best seller";
                                        const parentElement =
                                            e.target.parentNode;
                                        parentElement.classList.toggle(
                                            "hidden"
                                        );
                                    }
                                }}
                            >
                                {row.bestseller
                                    ? "Gỡ best seller"
                                    : "Đặt Làm Best seller"}
                            </li>
                            <li>Sửa giá khóa học</li>
                        </ul>
                    </div>
                </button>
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="course-list_course">
                <div className="list_course-admin">
                    <DataTable
                        title="Danh Sách Khóa Học"
                        columns={columns}
                        data={infoBasicCourse}
                        direction="auto"
                        fixedHeader
                        fixedHeaderScrollHeight="400px"
                        highlightOnHover
                        responsive
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
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
                        // onClick={async () => {
                        //     if (selectedRow.length > 0) {
                        //         const response = await Swal.fire({
                        //             title: "Bạn có chắc chắn muốn xóa?",
                        //             text: "Bạn sẽ không thể khôi phục điều này!",
                        //             icon: "warning",
                        //             showCancelButton: true,
                        //             confirmButtonColor: "#3085d6",
                        //             cancelButtonColor: "#d33",
                        //             confirmButtonText: "vâng, tôi chắc!",
                        //         });
                        //         if (response.isConfirmed) {
                        //             const result = await Swal.fire(
                        //                 "Xóa!",
                        //                 "Bạn đã xóa thành công dữ liệu.",
                        //                 "success"
                        //             );
                        //             if (result) {
                        //                 const resultData = rows.filter((el) => {
                        //                     let yacobac = true;
                        //                     for (
                        //                         let i = 0;
                        //                         i < selectedRow.length;
                        //                         i++
                        //                     ) {
                        //                         if (el === selectedRow[i]) {
                        //                             yacobac = false;
                        //                             break;
                        //                         }
                        //                     }
                        //                     if (yacobac) return el;
                        //                 });
                        //                 setRows(resultData);
                        //                 handleClearRows();
                        //             }
                        //         }
                        //     }
                        // }}
                        className={`bnt-list_course-admin`}
                    >
                        XÓA KHÓA HỌC
                    </button>
                </div>
            </div>
        </>
    );
};
