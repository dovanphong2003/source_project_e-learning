import React, { useEffect, useState } from "react";
import { CategoryListCard } from "../home/CategoryListCard";
import { ProductCart } from "../../components/card/ProductCart";
import "../../assets/style/AllCourse/allcourse.css";
export const ProductList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]); // Mảng chứa danh sách sản phẩm

    // Hàm xử lý khi chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Gọi API hoặc thực hiện logic để lấy danh sách sản phẩm cho trang mới
        // và cập nhật giá trị của mảng products.
    };

    // Hàm để hiển thị danh sách sản phẩm cho trang hiện tại
    const renderProductList = () => {
        // Logic để lấy danh sách sản phẩm dựa trên currentPage và products array.
        // Trả về các phần tử HTML hoặc component để hiển thị danh sách sản phẩm.
    };

    // Hàm để tạo các nút phân trang
    const renderPagination = () => {
        // Tính toán số trang và tạo các nút phân trang dựa trên số lượng sản phẩm và số lượng sản phẩm trên mỗi trang.
        // Trả về các phần tử HTML hoặc component để hiển thị các nút phân trang.
        // Gắn sự kiện onClick cho mỗi nút và gọi hàm handlePageChange khi nút được nhấp.
    };
    return (
        <main>
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
                    <div className="list-course_best-seller">
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                        <ProductCart />
                    </div>
                    <div className="pagination_all-course">
                        <span class="material-symbols-outlined left-pagination_all-course">
                            chevron_left
                        </span>
                        <ul className="ul_pagination_all-course">
                            <li
                                className={`active-bnt-pagination li_pagination_all-course`}
                            ></li>
                            <li className={` li_pagination_all-course`}></li>
                            <li className={` li_pagination_all-course`}></li>
                            <li className={` li_pagination_all-course`}></li>
                            <li className={`li_pagination_all-course`}></li>
                            <li className={`li_pagination_all-course`}>...</li>
                        </ul>
                        <span class="right-pagination_all-course material-symbols-outlined">
                            chevron_right
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
};
