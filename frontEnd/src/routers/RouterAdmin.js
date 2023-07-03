import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { MainDashboard } from "../pages/Admin/AdminDasbroad/component/MainDashboard";
import { ManagerCoutse } from "../pages/Admin/AdminDasbroad/componentCourse/ManagerCoutse";
import { MainAddCourse } from "../pages/Admin/AdminDasbroad/componentCourse/cpnAddCourse/MainAddCourse";
import { AddModuleCrouse } from "../pages/Admin/AdminDasbroad/AddModuleCrouse";
import { AddLessonCourse } from "../pages/Admin/AdminDasbroad/AddLessonCourse";
import { CategoryAd } from "../pages/Admin/AdminDasbroad/componentCourse/cpnCategoryAd/CategoryAd";
import { EditCategory } from "../pages/Admin/AdminDasbroad/componentCourse/cpnCategoryAd/component/EditCategory";
import { AđdCategory } from "../pages/Admin/AdminDasbroad/componentCourse/cpnCategoryAd/component/AđdCategory";
import { DashBAdmin } from "../pages/Admin/AdminDasbroad/componentUser/cpnDashbroadAdmin/DashBAdmin";
import { DashBStudent } from "../pages/Admin/AdminDasbroad/componentUser/cpnDashBroadStudent/DashBStudent";
import { AddStudentDB } from "../pages/Admin/AdminDasbroad/componentUser/cpnDashBroadStudent/AddStudentDB";
import { EnvirolmentHistory } from "../pages/Admin/AdminDasbroad/cpnEnvirolment/EnvirolmentHistory";
import { AddEnvirolment } from "../pages/Admin/AdminDasbroad/cpnEnvirolment/AddEnvirolment";
import { PageNotFound } from "../components/PageNotFound";
export const RouterAdmin = () => {
    return (
        <Routes>
            <Route path="/" element={<MainDashboard />}></Route>
            <Route
                path="/admin-website/course"
                element={<ManagerCoutse />}
            ></Route>
            <Route
                path="/admin-website/add-course"
                element={<MainAddCourse />}
            ></Route>
            <Route
                path="/admin-website/AddModuleCrouse"
                element={<AddModuleCrouse />}
            ></Route>
            <Route
                path="/admin-website/AddLessonCourse"
                element={<AddLessonCourse />}
            ></Route>
            <Route
                path="/admin-website/ad-category"
                element={<CategoryAd />}
            ></Route>
            <Route
                path="/admin-website/ad-category/:id"
                element={<EditCategory />}
            ></Route>
            <Route
                path="/admin-website/ad-category/add-category"
                element={<AđdCategory />}
            ></Route>
            <Route
                path="/admin-website/dash-broad-ad"
                element={<DashBAdmin />}
            ></Route>
            <Route
                path="/admin-website/dash-broad-student"
                element={<DashBStudent />}
            ></Route>
            <Route
                path="/admin-website/dash-broad-add-student"
                element={<AddStudentDB />}
            ></Route>
            <Route
                path="/admin-website/dash-broad-history-envirolment"
                element={<EnvirolmentHistory />}
            ></Route>
            <Route
                path="/admin-website/dash-broad-add-envirolment"
                element={<AddEnvirolment />}
            ></Route>
            <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
    );
};
