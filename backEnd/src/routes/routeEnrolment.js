const express = require("express");
const {
    upDataEnrolmentAPI,
    getDataEnrolmentAPI,
    upDataEnrolmentsAPI,
    getDataEnrolmentOfUserAPI,
    getDataEnrolmentRevenueAPI,
} = require("../controllers/CRUD_enrolment");

const routeAPIEnrolment = express.Router();
routeAPIEnrolment.post("/upDataEnrolmentAPI", upDataEnrolmentAPI);

// update many
routeAPIEnrolment.post("/upDataEnrolmentsAPI", upDataEnrolmentsAPI);
routeAPIEnrolment.get("/getDataEnrolmentAPI", getDataEnrolmentAPI);
routeAPIEnrolment.get(
    "/getDataEnrolmentRevenueAPI",
    getDataEnrolmentRevenueAPI
);
routeAPIEnrolment.get("/getDataEnrolmentOfUserAPI", getDataEnrolmentOfUserAPI);
module.exports = {
    routeAPIEnrolment,
};
