const fs = require("fs");
const {
    getCategory,
    getOneCategory,
    getCourseOfCategory,
} = require("../services/CRUD_Categories");
const getCategoryAPI = async (req, res) => {
    const response = await getCategory();
    res.status(200).json({ EC: 0, data: response });
};
const getCourseOfCategoryAPI = async (req, res) => {
    const response = await getCourseOfCategory();
    res.status(200).json({ EC: 0, data: response });
};
const getOneCategoryAPI = async (req, res) => {
    try {
        const id = req.query.id;
        if (id) {
            const response = await getOneCategory(id);
            if (response === "id không hợp lệ" || response === null) {
                res.status(401).json({ EC: "error of param" });
            } else {
                res.status(200).json({ EC: 0, data: response });
            }
        } else {
            res.status(401).json({ EC: "error of param" });
        }
    } catch (error) {
        res.status(404).json({ EC: error });
    }
};
module.exports = {
    getCategoryAPI,
    getOneCategoryAPI,
    getCourseOfCategoryAPI,
};
