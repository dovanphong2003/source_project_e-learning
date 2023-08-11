import React, { useEffect, useState } from "react";
import { CategoryListCard } from "../home/CategoryListCard";
import Skeleton from "react-loading-skeleton";
import { ProductCart } from "../../components/card/ProductCart";
import "../../assets/style/AllCourse/allcourse.css";
import { ToastContainer, toast } from "react-toastify"; // toast
import axios from "axios";

export const ProductList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState([]); // Mảng chứa danh sách sản phẩm
    const [BntLastActive, setBntLastActive] = useState(false);
    const limitCourse = 3;
    const notifyError = (content) => {
        toast.warning(content, {
            toastClassName: "black-toast", // Đặt lớp CSS tùy chỉnh cho thông báo toast
        });
    };
    const notifySuccess = (content) => toast.success(content);
    const [value, setValue] = useState(1);
    const [lenthCourse, getLengthCourse] = useState(0);
    useEffect(() => {
        if (
            document
                .querySelector(".ul_pagination_all-course")
                .querySelectorAll("li.active-bnt-pagination").length
        ) {
            setValue(
                document
                    .querySelector(".ul_pagination_all-course")
                    .querySelectorAll("li.active-bnt-pagination")[0].textContent
            );
        } else {
            const valueNew = value - 1;
            setValue(valueNew);
        }
    }, [page]);
    useEffect(() => {
        if (BntLastActive) {
            document
                .querySelector(".ul_pagination_all-course")
                .querySelectorAll("li")[3]
                .classList.add("active-bnt-pagination");
        }
    }, [currentPage]);
    // Hàm xử lý khi chuyển trang
    const getLengthAllCourse = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/product/getLengthAllProductsAPI`
            );

            getLengthCourse(Number(response.data.lengthCourse));
        } catch (error) {}
    };
    useEffect(() => {
        getLengthAllCourse();
    }, []);
    const pageNumber = lenthCourse ? Math.ceil(lenthCourse / limitCourse) : 1;
    const handlePageChange = async (limit, page) => {
        try {
            const respose = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/product/getAllProductLimitAPI?limit=${limit}&page=${page}`
            );

            setProducts(respose.data.data);
        } catch (error) {}
        // Gọi API hoặc thực hiện logic để lấy danh sách sản phẩm cho trang mới
        // và cập nhật giá trị của mảng products.
    };
    // Hàm để hiển thị danh sách sản phẩm cho trang hiện tại
    useEffect(() => {
        handlePageChange(limitCourse, value);
    }, [value]);
    const handleGetVlue = (event) => {
        const listBntOrigin = document.querySelector(
            ".ul_pagination_all-course"
        );
        const listBnt = listBntOrigin.querySelectorAll("li:not(.hidden)");
        const index = event.target.textContent % 4;

        // page 0
        if (index === 1) {
            listBnt[page].classList.remove("active-bnt-pagination");
            listBnt[0].classList.add("active-bnt-pagination");
            const pageNew = 0;
            setProducts([]);
            setPage(pageNew);
        }
        // page 1
        if (index === 2) {
            listBnt[page].classList.remove("active-bnt-pagination");
            listBnt[1].classList.add("active-bnt-pagination");
            const pageNew = 1;
            setProducts([]);
            setPage(pageNew);
        }
        // page 2
        if (index === 3) {
            listBnt[page].classList.remove("active-bnt-pagination");
            listBnt[2].classList.add("active-bnt-pagination");
            const pageNew = 2;
            setProducts([]);
            setPage(pageNew);
        }
        //page 3
        if (index === 0) {
            listBnt[page].classList.remove("active-bnt-pagination");
            listBnt[3].classList.add("active-bnt-pagination");
            const pageNew = 3;
            setProducts([]);
            setPage(pageNew);
        }
    };
    // Hàm để tạo các nút phân trang
    const renderPagination = () => {
        if (pageNumber === 1) {
            return (
                <ul className="ul_pagination_all-course">
                    <li
                        onClick={handleGetVlue}
                        className={`active-bnt-pagination li_pagination_all-course`}
                    >
                        1
                    </li>
                </ul>
            );
        }
        if (pageNumber === 2) {
            return (
                <ul className="ul_pagination_all-course">
                    <li
                        onClick={handleGetVlue}
                        className={`active-bnt-pagination li_pagination_all-course`}
                    >
                        1
                    </li>
                    <li
                        onClick={handleGetVlue}
                        className={` li_pagination_all-course`}
                    >
                        2
                    </li>
                </ul>
            );
        }
        if (pageNumber === 3) {
            return (
                <ul className="ul_pagination_all-course">
                    <li
                        onClick={handleGetVlue}
                        className={`active-bnt-pagination li_pagination_all-course`}
                    >
                        1
                    </li>
                    <li
                        onClick={handleGetVlue}
                        className={` li_pagination_all-course`}
                    >
                        2
                    </li>
                    <li
                        onClick={handleGetVlue}
                        className={` li_pagination_all-course`}
                    >
                        3
                    </li>
                </ul>
            );
        }
        if (pageNumber === 4) {
            return (
                <ul className="ul_pagination_all-course">
                    <li
                        onClick={handleGetVlue}
                        className={`active-bnt-pagination li_pagination_all-course`}
                    >
                        1
                    </li>
                    <li
                        onClick={handleGetVlue}
                        className={` li_pagination_all-course`}
                    >
                        2
                    </li>
                    <li
                        onClick={handleGetVlue}
                        className={` li_pagination_all-course`}
                    >
                        3
                    </li>
                    <li
                        onClick={handleGetVlue}
                        className={` li_pagination_all-course`}
                    >
                        4
                    </li>
                </ul>
            );
        }
        if (pageNumber > 4) {
            return (
                <ul className="ul_pagination_all-course">
                    <li
                        onClick={handleGetVlue}
                        className={`active-bnt-pagination li_pagination_all-course`}
                    >
                        {currentPage}
                    </li>
                    <li
                        onClick={handleGetVlue}
                        className={`${
                            currentPage + 1 > pageNumber ? "hidden" : ""
                        } li_pagination_all-course`}
                    >
                        {currentPage + 1}
                    </li>
                    <li
                        onClick={handleGetVlue}
                        className={`${
                            currentPage + 2 > pageNumber ? "hidden" : ""
                        } li_pagination_all-course`}
                    >
                        {currentPage + 2}
                    </li>
                    <li
                        onClick={handleGetVlue}
                        className={`${
                            currentPage + 3 > pageNumber ? "hidden" : ""
                        } li_pagination_all-course`}
                    >
                        {currentPage + 3}
                    </li>
                </ul>
            );
        }
        // Tính toán số trang và tạo các nút phân trang dựa trên số lượng sản phẩm và số lượng sản phẩm trên mỗi trang.
        // Trả về các phần tử HTML hoặc component để hiển thị các nút phân trang.
        // Gắn sự kiện onClick cho mỗi nút và gọi hàm handlePageChange khi nút được nhấp.
    };

    const handleClickBack = async () => {
        setBntLastActive(false);
        const listBntOrigin = document.querySelector(
            ".ul_pagination_all-course"
        );
        const listBnt = listBntOrigin.querySelectorAll("li:not(.hidden)");

        // th1: page = first
        if (page === 0) {
            if (currentPage === 1) {
                notifyError("Đây là trang đầu, không thể lùi lại !");
            }
            if (currentPage > 1) {
                listBnt[0].classList.remove("active-bnt-pagination");
                // listBnt[2].classList.add("active-bnt-pagination");
                const newPages = 3;
                setProducts([]);
                await setPage(newPages);
                const newCurrentPage = currentPage - 4;
                setCurrentPage(newCurrentPage);
                setBntLastActive(true);
            }
        }

        // th2: page = last, page chi co 1

        if (page === listBnt.length - 1) {
            setProducts([]);
            if (page === 0) {
                listBnt[page].classList.remove("active-bnt-pagination");
                const newPage = 3;
                setPage(newPage);
            } else {
                listBnt[page].classList.remove("active-bnt-pagination");
                listBnt[page - 1].classList.add("active-bnt-pagination");
                const newPage = page - 1;
                setPage(newPage);
            }
        }

        // th3: page not first not last
        if (page !== 0 && page !== listBnt.length - 1) {
            listBnt[page].classList.remove("active-bnt-pagination");
            listBnt[page - 1].classList.add("active-bnt-pagination");
            const pageNew = page - 1;
            setProducts([]);
            setPage(pageNew);
        }
    };
    const handleClickNext = () => {
        setBntLastActive(false);
        const listBntOrigin = document.querySelector(
            ".ul_pagination_all-course"
        );
        const listBnt = listBntOrigin.querySelectorAll("li:not(.hidden)");

        // th1: page = first
        if (currentPage + page === pageNumber) {
            notifyError("Đã đến trang tối đa !");
            return;
        }
        if (page === 0) {
            listBnt[0].classList.remove("active-bnt-pagination");
            listBnt[1].classList.add("active-bnt-pagination");
            setProducts([]);
            const pageNew = page + 1;
            setPage(pageNew);
        }

        // th2: page = last
        if (page === listBnt.length - 1) {
            // page limit uith ...
            if (pageNumber <= 4) {
            }
            if (pageNumber > 4) {
                listBnt[listBnt.length - 1].classList.remove(
                    "active-bnt-pagination"
                );
                listBnt[0].classList.add("active-bnt-pagination");
                const pageNew = 0;
                setProducts([]);
                setPage(pageNew);
                const currentNews = currentPage + listBnt.length;
                setCurrentPage(currentNews);
            }
        }

        // th3: page not first not last
        if (page !== 0 && page !== listBnt.length - 1) {
            listBnt[page].classList.remove("active-bnt-pagination");
            listBnt[page + 1].classList.add("active-bnt-pagination");
            const pageNew = page + 1;
            setProducts([]);
            setPage(pageNew);
        }
    };
    return (
        <main>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="container-main">
                <div style={{ textAlign: "center", paddingTop: "20px" }}>
                    {" "}
                    <h1
                        style={{
                            backgroundColor: "#e5eaf5",
                            fontWeight: "500",
                            // fontSize: "28px",
                        }}
                    >
                        Tất Cả Khóa Học
                    </h1>
                </div>

                <div className="content-main_homePage">
                    {products.length ? (
                        <div className="list-course_best-seller">
                            {products.map((el) => {
                                return <ProductCart data={el} />;
                            })}
                        </div>
                    ) : (
                        <div className="skeleton-container">
                            <Skeleton
                                width={"100%"}
                                height={"260px"}
                                duration={1}
                                count={1}
                                className="skeleton-css"
                                baseColor="#efefef"
                                highlightColor="#cecece"
                            />
                            <Skeleton
                                width={"100%"}
                                height={"260px"}
                                duration={1}
                                count={1}
                                className="skeleton-css"
                                baseColor="#efefef"
                                highlightColor="#cecece"
                            />
                            <Skeleton
                                width={"100%"}
                                height={"260px"}
                                duration={1}
                                count={1}
                                className="skeleton-css"
                                baseColor="#efefef"
                                highlightColor="#cecece"
                            />
                        </div>
                    )}

                    <div className="pagination_all-course">
                        <span
                            onClick={handleClickBack}
                            class="material-symbols-outlined left-pagination_all-course"
                        >
                            chevron_left
                        </span>
                        {renderPagination()}
                        <span
                            onClick={handleClickNext}
                            class="right-pagination_all-course material-symbols-outlined"
                        >
                            chevron_right
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
};
