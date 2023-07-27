const {
    insertDataEnrolment,
    getDataEnrolment,
    insertDataEnrolments,
    getDataEnrolmentOfUser,
    getDataEnrolmentRevenue,
} = require("../services/service_enrolment");
const upDataEnrolmentAPI = async (req, res) => {
    console.log("data: ", req.body);
    const { id_student, id_course, name_course } = req.body;
    const data = await insertDataEnrolment(id_student, id_course, name_course);
    if (data === "upload success") {
        res.status(200).json({ EC: 0, message: "upload success !" });
    } else if (data === "enrolment exists") {
        res.status(400).json({ message: "Ghi danh đã tồn tại !" });
    } else {
        res.status(401).json({ message: "upload false !" });
    }
};

// update many
const upDataEnrolmentsAPI = async (req, res) => {
    console.log("data: ", req.body);
    const { id_student, ArrId_course } = req.body;
    const data = await insertDataEnrolments(id_student, ArrId_course);
    if (data === "upload success") {
        res.status(200).json({ EC: 0, message: "upload success !" });
    } else {
        res.status(401).json({ message: "upload false !" });
    }
};
const getDataEnrolmentAPI = async (req, res) => {
    const data = await getDataEnrolment();
    if (data) {
        res.status(200).json({ EC: 0, data: data });
    } else {
        res.status(400).json({ message: "Error not defined" });
    }
};
const getDataEnrolmentRevenueAPI = async (req, res) => {
    const data = await getDataEnrolmentRevenue();
    if (data) {
        res.status(200).json({ EC: 0, data: data });
    } else {
        res.status(400).json({ message: "Error not defined" });
    }
};

const getDataEnrolmentOfUserAPI = async (req, res) => {
    const user_id = req.query.user_id;
    console.log("userid: ", user_id);
    const data = await getDataEnrolmentOfUser(user_id);
    if (data) {
        res.status(200).json({ EC: 0, data: data });
    } else {
        res.status(400).json({ message: "Error not defined" });
    }
};

module.exports = {
    upDataEnrolmentAPI,
    getDataEnrolmentAPI,
    upDataEnrolmentsAPI,
    getDataEnrolmentOfUserAPI,
    getDataEnrolmentRevenueAPI,
};
