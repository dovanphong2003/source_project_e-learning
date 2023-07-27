const express = require("express");
const {
    getAllProductAPI,
    getProductAPI,
    getLessonCourseAPI,
    getModuleLessonDetailAPI,
    getAllProductLimitAPI,
    getLengthAllProductsAPI,
} = require("../services/CRUD_Categories");
const routeAPIProduct = express.Router();
routeAPIProduct.get("/getAllProductAPI", getAllProductAPI);
routeAPIProduct.get("/getAllProductLimitAPI", getAllProductLimitAPI);
routeAPIProduct.get("/getLengthAllProductsAPI", getLengthAllProductsAPI);
routeAPIProduct.get("/getProductAPI", getProductAPI);
routeAPIProduct.get("/getLessonCourseAPI", getLessonCourseAPI);
routeAPIProduct.get("/getModuleLessonDetailAPI", getModuleLessonDetailAPI);
module.exports = {
    routeAPIProduct,
};
