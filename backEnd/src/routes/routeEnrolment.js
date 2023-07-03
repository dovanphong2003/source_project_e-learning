const express = require("express");
const {
    upDataEnrolmentAPI,
    getDataEnrolmentAPI,
} = require("../controllers/CRUD_enrolment");

const routeAPIEnrolment = express.Router();
routeAPIEnrolment.post("/upDataEnrolmentAPI", upDataEnrolmentAPI);
routeAPIEnrolment.get("/getDataEnrolmentAPI", getDataEnrolmentAPI);
module.exports = {
    routeAPIEnrolment,
};
