const {
    handleGetAllCourse,
    handleGetNameAndIdAPI,
    handlePostModuleAPI,
    handleGetNameModuledAPI,
    handleCreateLessonOne,
    getDataForCourse,
    hanleSetBestSeller,
    getCourseBSellerAndNews,
    handleGetInfoCourseUseIdAPI,
    handleGetLessonCourseUseIdAPI,
    handleGetDataSeach,
    handleAddCourseToCart,
    handleGetCartItems,
    handleDeleteCourseToCart,
    handleDeleteAllCourseToCart,
    handleGetAllCourseOfUser,
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
const getInfoCourseUseIdAPI = async (req, res) => {
    const id_course = req.query.idCourse;
    const response = await handleGetInfoCourseUseIdAPI(id_course);
    if (response) {
        res.status(200).json({ EC: 0, data: response });
    } else {
        res.status(404).json({ ER: " error not defined !" });
    }
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
const getLessonCourseUseIdAPI = async (req, res) => {
    const id_lesson = req.query.idLesson;
    const response = await handleGetLessonCourseUseIdAPI(id_lesson);
    if (response) {
        res.status(200).json({ EC: 0, data: response });
    } else {
        res.status(404).json({ ER: " error not defined !" });
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

const getDataSearchAPI = async (req, res) => {
    const key_word = req.query.key_word;
    const response = await handleGetDataSeach(key_word);
    if (response) {
        if (response === "zero course") {
            res.status(200).json({ EC: 0, data: 0 });
        } else {
            res.status(200).json({ EC: 0, data: response });
        }
    } else {
        res.status(400).json({ message: "error, get data not defined" });
    }
};
const addCourseToCartAPI = async (req, res) => {
    const { idCourse, id_user } = req.query;
    const response = await handleAddCourseToCart(idCourse, id_user);
    if (response) {
        res.status(200).json({ message: "add success" });
    } else {
        res.status(400).json({ message: "add false !" });
    }
};
const deleteCourseCartAPI = async (req, res) => {
    const { idCourse, id_user } = req.query;
    const response = await handleDeleteCourseToCart(idCourse, id_user);
    if (response) {
        res.status(200).json({ message: "delete success" });
    } else {
        res.status(400).json({ message: "delete false !" });
    }
};

const deleteAllCourseCartAPI = async (req, res) => {
    const { id_user } = req.query;
    console.log("id user: ", id_user);
    const response = await handleDeleteAllCourseToCart(id_user);
    if (response) {
        res.status(200).json({ message: "delete success" });
    } else {
        res.status(400).json({ message: "delete false !" });
    }
};

const getCartItemsAPI = async (req, res) => {
    const isIdUser = req.query.isIdUser;
    const response = await handleGetCartItems(isIdUser);
    if (response) {
        res.status(200).json({ EC: 0, data: response });
    } else {
        res.status(400).json({ message: "error" });
    }
};
const getCourseOfUserAPI = async (req, res) => {
    const isIdUser = req.query.isIdUser;
    const response = await handleGetAllCourseOfUser(isIdUser);
    if (response) {
        res.status(200).json({ EC: 0, data: response });
    } else {
        res.status(400).json({ message: "error !" });
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
    getInfoCourseUseIdAPI,
    getLessonCourseUseIdAPI,
    getDataSearchAPI,
    addCourseToCartAPI,
    getCartItemsAPI,
    deleteCourseCartAPI,
    deleteAllCourseCartAPI,
    getCourseOfUserAPI,
};
