import "../../assets/style/HomePage/banner.css";
import banner from "../../assets/image/banner2.png";
import { Link } from "react-router-dom";

export const Banner = () => {
    return (
        <>
            <div className="banner banner-all">
                <img
                    className="banner-main"
                    src="/education-banner.jpg"
                    alt="banner website"
                />
                <div className="bnt-all_course">
                    <Link to="/all-Course">
                        <button className="bnt-banner">
                            Xem Tất Cả Khóa Học Tại Đây!
                        </button>
                    </Link>
                </div>
            </div>
            <div className="banner banner-mobile">
                <img
                    className="banner-main banner-main-mobile"
                    src="/banner_mobile.png"
                    alt="banner website"
                />
                <div className="bnt-all_course">
                    <Link to="/all-Course">
                        <button className="bnt-banner">
                            Xem Tất Cả Khóa Học Tại Đây!
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};
