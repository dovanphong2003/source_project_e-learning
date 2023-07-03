import React from "react";
import "../../assets/style/cart/cart.css";
export const ShoppingCart = () => {
    return (
        <main>
            <div className="container-cart_course">
                <h1 className="title_container-cart">Giỏ hàng (3 khóa học)</h1>
                <div className="container-cart_check-out-cart">
                    <div className="container-cart">
                        <div className="header-container_cart">
                            <p>2 khóa học trong giỏ hàng</p>
                            <button>Xóa tất cả</button>
                        </div>
                        <hr />
                        <div className="info_course-cart">
                            <div className="image_price-course">
                                <div className="image_course-cart">
                                    <img src="/image/image_admin.jpg" alt="" />
                                </div>
                                <div className="info-title-course-author">
                                    <span className="info-title_course">
                                        Khóa học lập trình hướng đối tượng
                                    </span>
                                    <span className="author-course_cart">
                                        Giảng viên: Tạ Hoàng An
                                    </span>
                                </div>
                            </div>
                            <div className="price_delete-el_cart">
                                <div className="price-course_info">
                                    500.000đ
                                </div>
                                <button>
                                    <span class="material-symbols-outlined">
                                        close
                                    </span>
                                </button>
                            </div>
                        </div>
                        <hr />
                        <div className="info_course-cart">
                            <div className="image_price-course">
                                <div className="image_course-cart">
                                    <img src="/image/image_admin.jpg" alt="" />
                                </div>
                                <div className="info-title-course-author">
                                    <span className="info-title_course">
                                        Khóa học lập trình hướng đối tượng
                                    </span>
                                    <span className="author-course_cart">
                                        Giảng viên: Tạ Hoàng An
                                    </span>
                                </div>
                            </div>
                            <div className="price_delete-el_cart">
                                <div className="price-course_info">
                                    500.000đ
                                </div>
                                <button>
                                    <span class="material-symbols-outlined">
                                        close
                                    </span>
                                </button>
                            </div>
                        </div>
                        <hr />
                        <div className="info_course-cart">
                            <div className="image_price-course">
                                <div className="image_course-cart">
                                    <img
                                        src="https://ducthanh.edu.vn/hinh-nen-facebook-dep-nhat/imager_7_2572_700.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="info-title-course-author">
                                    <span className="info-title_course">
                                        Khóa học lập trình hướng đối tượng
                                    </span>
                                    <span className="author-course_cart">
                                        Giảng viên: Tạ Hoàng An
                                    </span>
                                </div>
                            </div>
                            <div className="price_delete-el_cart">
                                <div className="price-course_info">
                                    500.000đ
                                </div>
                                <button>
                                    <span class="material-symbols-outlined">
                                        close
                                    </span>
                                </button>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="pay-cart_course">
                        <p>Tổng :</p>
                        <h2>4,698,000₫</h2>
                        <button>Thanh toán</button>
                    </div>
                </div>
            </div>
        </main>
    );
};
