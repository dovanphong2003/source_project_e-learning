const express = require("express");
const {
    getAllProductAPI,
    getProductAPI,
    getLessonCourseAPI,
    getModuleLessonAPI,
} = require("../services/CRUD_Categories");
const routeAPIProduct = express.Router();
routeAPIProduct.get("/getAllProductAPI", getAllProductAPI);
routeAPIProduct.get("/getProductAPI", getProductAPI);
routeAPIProduct.get("/getLessonCourseAPI", getLessonCourseAPI);
routeAPIProduct.get("/getModuleLessonAPI", getModuleLessonAPI);
module.exports = {
    routeAPIProduct,
};
