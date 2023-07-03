const {
    handleGetAllCourse,
    handleGetNameAndIdAPI,
    handlePostModuleAPI,
    handleGetNameModuledAPI,
    handleCreateLessonOne,
    getDataForCourse,
    hanleSetBestSeller,
    getCourseBSellerAndNews,
} = require("../services/CRUD_course");
const getAllCourseAPI = async (req, res) => {
    const response = await handleGetAllCourse();
    res.status(200).json({ EC: 0, data: response });
};
const getDataForCourseAPI = async (req, res) => {
    const response = await getDataForCourse();
    res.status(200).json({ EC: 0, data: response });
};
const getNameAndIdAPI = async (req, res) => {
    const response = await handleGetNameAndIdAPI();
    res.status(200).json({ EC: 0, data: response });
};
const getNameModuleAPI = async (req, res) => {
    const id = req.query.id;
    const response = await handleGetNameModuledAPI(id);
    if (response === "Khóa học này chưa có chương nào cả !") {
        res.status(200).json({
            EC: 0,
            message: "Khóa học này chưa có chương nào cả !",
        });
    } else {
        res.status(200).json({ EC: 0, data: response });
    }
};
const postModuleAPI = async (req, res) => {
    console.log("data: ", req.body);
    const { name_module, id_course } = req.body;
    const response = await handlePostModuleAPI(name_module, id_course);
    if (response) {
        res.status(200).json({ message: "update success !" });
    } else {
        res.status(200).json({ message: "update false !" });
    }
};

const postLessonAPI = async (req, res) => {
    const response = await handleCreateLessonOne(req.body);
    if (response) {
        res.status(200).json({ message: "upload thành công !" });
    } else {
        res.status(200).json({
            message: "Lỗi không xác định, upload không thành công",
        });
    }
};

const setBesellerAPI = async (req, res) => {
    const { id_course, action } = req.body;
    const response = await hanleSetBestSeller(id_course, action);
    if (response) {
        res.status(200).json({ message: "thay đổi thành công !" });
    } else {
        res.status(200).json({
            message: "Lỗi không xác định, thay đổi không thành công",
        });
    }
};
const getCourseBSellerAndNewsAPI = async (req, res) => {
    const response = await getCourseBSellerAndNews();
    if (response) {
        res.status(200).json({ EC: 0, data: response });
    } else {
        res.status(400).json({ EC: "error not defined" });
    }
};
module.exports = {
    getAllCourseAPI,
    getNameAndIdAPI,
    postModuleAPI,
    getNameModuleAPI,
    postLessonAPI,
    getDataForCourseAPI,
    setBesellerAPI,
    getCourseBSellerAndNewsAPI,
};
