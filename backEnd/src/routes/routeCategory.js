const express = require("express");
const fs = require("fs");
const {
    handleCreateCategory,
    handleEditCategory,
} = require("../services/CRUD_Categories");
const { pool } = require("../config/database"); // use pool
const {
    getCategoryAPI,
    getOneCategoryAPI,
    getCourseOfCategoryAPI,
} = require("../controllers/CRUD_category");
// config upload image
const multer = require("multer"); // use multer upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../frontend/public/imageCategory");
    },
    filename: function (req, file, cb) {
        console.log("file: ", file);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});
async function fileFilter(req, file, cb) {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    // console.log(req.body);

    console.log("fiels::::::", file);
    const result = await handleCreateCategory(req.query.title, "", 1);
    if (result === "danh mục đã tồn tại") {
        const error = new Error("danh mục đã tồn tại");
        error.status = 400; // Thiết lập mã lỗi HTTP tùy chọn
        cb(error, false);
    } else {
        cb(null, true);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024, // max file image: 1mb
    },
    fileFilter: fileFilter,
});
const routeAPICategory = express.Router();

///////////////////////////////// route

//post category
routeAPICategory.post(
    "/addCategoryAPI",
    (req, res, next) => {
        // check loi,
        /**
         * trong trường hợp này, upload.single("image") là một middleware function,
         *  và sau đó chúng ta gọi nó ngay lập tức bằng cách truyền req, res và
         *  callback function vào trong cặp dấu ngoặc đơn tiếp theo (...).
         */
        upload.single("image")(req, res, async function (err) {
            if (err) {
                console.log("errrrrrrrrrr: ", err.message);
                if (err.message === "danh mục đã tồn tại") {
                    res.status(400).json({ result: err.message });
                } else {
                    if (err.message === "File too large") {
                        res.status(413).json({
                            error: "Kích thước file vượt quá quy định",
                        });
                    } else {
                        // Handle other multer errors
                        res.status(500).json({
                            error: "Có lỗi xảy ra trong quá trình xử lý file",
                        });
                    }
                }
            } else {
                // File is valid, continue with further processing
                next();
            }
        });
    },
    async function (req, res) {
        // Handle successful processing
        const title = req.body.title;
        const imageName = req.file.filename;
        const response = await handleCreateCategory(title, imageName, 2);
        if (response === "update success !") {
            res.status(200).json({ data: req.file });
        } else {
            res.status(500).json({
                result: "Có lỗi xảy ra trong quá trình xử lý file",
            });
        }
    }
);

// edit category
routeAPICategory.post(
    "/editCategoryAPI",
    (req, res, next) => {
        // neu khong co file nao duoc tai len --> no se vao thang else luon
        upload.single("image")(req, res, async function (err) {
            if (err) {
                console.log("errrrrrrrrrr: ", err.message);
                if (err.message === "danh mục đã tồn tại") {
                    res.status(400).json({ result: err.message });
                } else {
                    if (err.message === "File too large") {
                        res.status(413).json({
                            error: "Kích thước file vượt quá quy định",
                        });
                    } else {
                        // Handle other multer errors
                        res.status(500).json({
                            error: "Có lỗi xảy ra trong quá trình xử lý file",
                        });
                    }
                }
            } else {
                // File is valid, continue with further processing\
                next();
            }
        });
    },
    async function (req, res) {
        // Handle successful processing
        const title = req.body.title;
        console.log("file:::::", req.file);
        const imageName = req.file ? req.file.filename : null;
        const id = req.query.id;
        const response = await handleEditCategory(title, imageName, id);
        if (response === "danh mục đã tồn tại") {
            res.status(400).json({ result: "danh mục đã tồn tại" });
        } else if (response === "update success !") {
            res.status(200).json({ data: req.file, title: title });
        } else {
            res.status(500).json({
                result: "Có lỗi xảy ra trong quá trình xử lý file",
            });
        }
    }
);

// get category
routeAPICategory.get("/getCategoryAPI", getCategoryAPI);
routeAPICategory.get("/getCourseOfCategoryAPI", getCourseOfCategoryAPI);
routeAPICategory.get("/getOneCategoryAPI", getOneCategoryAPI);

// delete category
routeAPICategory.delete("/deleteCategoryAPI", async (req, res) => {
    try {
        const name_image = req.query.name_image;
        if (req.query.id && req.query.id !== "null") {
            const response = await pool.query(
                "DELETE FROM coursecategories WHERE category_id = $1",
                [req.query.id]
            );
            if (response && response.rowCount == 0) {
                res.status(404).json({
                    EC: "không tìm thấy danh mục",
                });
                return;
            }
        }
        fs.unlink(`../frontend/public/imageCategory/${name_image}`, (err) => {
            if (err) {
                console.log("err delete category: ", err);
                res.status(400).json({ err: "Lỗi file ảnh không tồn tại" });
            } else {
                res.status(200).json({
                    result: "Xóa thành công",
                });
            }
        });
    } catch (error) {
        console.log("err delete category: ", error);
        res.status(400).json({ err: "Lỗi file ảnh không tồn tại" });
    }
});

module.exports = {
    routeAPICategory,
};
