import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { HomePage } from "../pages/home/HomePage";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ForgetPw } from "../pages/ForgetPw";
import { ProductList } from "../pages/products/ProductList";
import { SearchCourse } from "../components/search/SearchCourse";
import { DetailCourse } from "../pages/detailCourse/DetailCourse";
import { ViewVideoCourse } from "../pages/viewVideo/ViewVideoCourse";
import { Info } from "../pages/infomation_user/Info";
import { ShoppingCart } from "../pages/cart/ShoppingCart";
import { PageNotFound } from "../components/PageNotFound";
import { CategoryCourse } from "../pages/products/CategoryCourse";
export const AllRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="log-in" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="forgetPassword" element={<ForgetPw />}></Route>
            <Route path="all-Course" element={<ProductList />}></Route>
            <Route path="search" element={<SearchCourse />}></Route>
            <Route path="detail-course/:id" element={<DetailCourse />}></Route>
            <Route
                path="/detail-course/:id/view-video/:idvideo"
                element={<ViewVideoCourse />}
            ></Route>
            <Route path="/info-user/:id" element={<Info />}></Route>
            <Route path="/cart" element={<ShoppingCart />}></Route>
            <Route
                path="/caregories-course/:id"
                element={<CategoryCourse />}
            ></Route>
            <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
    );
};
