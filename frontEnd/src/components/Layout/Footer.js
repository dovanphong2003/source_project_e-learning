import "../../assets/style/Footer.css";
import iconF from "../../assets/image/facebook.svg";
import iconT from "../../assets/image/twitter.svg";
import iconI from "../../assets/image/instagram.svg";
export const Footer = () => {
    return (
        <>
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="footer-col">
                            <h4>Công ty</h4>
                            <ul>
                                <li>
                                    <a href="#">Giới Thiệu Về JDG</a>
                                </li>
                                <li>
                                    <a href="#">Dịch Vụ</a>
                                </li>
                                <li>
                                    <a href="#">Chính Sách Bảo Mật</a>
                                </li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>Trợ Giúp</h4>
                            <ul>
                                <li>
                                    <a href="#">FAQ</a>
                                </li>
                                <li>
                                    <a href="#">Kích Hoạt Khóa Học</a>
                                </li>
                                <li>
                                    <a href="#">Hướng Dẫn Thanh Toán</a>
                                </li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>Hợp tác liên kết</h4>
                            <ul>
                                <li>
                                    <a href="#">Đăng ký giảng viên</a>
                                </li>
                                <li>
                                    <a href="#">Giải pháp e-learning</a>
                                </li>
                                <li>
                                    <a href="#">Quay dựng video</a>
                                </li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>Theo Dõi Chúng Tôi</h4>
                            <div class="social-links">
                                <a className="pd-6" href="#">
                                    <img src={iconF} alt="" />
                                </a>
                                <a className="pd-6" href="#">
                                    <img src={iconT} alt="" />
                                </a>
                                <a className="pd-6" href="#">
                                    <img src={iconI} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
