import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AutoScrollTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi địa chỉ URL thay đổi
    }, [pathname]);

    return null; // Không cần render gì cả, chỉ cần cuộn lên khi địa chỉ URL thay đổi
};

export default AutoScrollTop;
