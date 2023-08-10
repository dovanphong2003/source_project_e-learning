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
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "../frontend/public/imageCategory");
//     },
//     filename: function (req, file, cb) {
//         console.log("file: ", file);
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + "-" + file.originalname);
//     },
// });

// firebase
const {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} = require("firebase/storage");

// conffig firebase ( lay config khi tao project tren firebase)
const { initializeApp } = require("firebase/app");
const firebaseConfig = {
    apiKey: "AIzaSyA1mvjVf45GUiyYy3RHT1NruFfXdiRgeDM",
    authDomain: "upload-video-to-firebase-f9d48.firebaseapp.com",
    projectId: "upload-video-to-firebase-f9d48",
    storageBucket: "upload-video-to-firebase-f9d48.appspot.com",
    messagingSenderId: "620684388407",
    appId: "1:620684388407:web:615612e566f672f44b77b2",
    measurementId: "G-SVXHT8H28Y",
};
const app = initializeApp(firebaseConfig);
const storageCourse = getStorage(); // get strorage
async function fileFilter(req, file, cb) {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    // console.log(req.body);
    const result = await handleCreateCategory(req.query.title, "", 1);
    if (result === "danh mục đã tồn tại") {
        const error = new Error("danh mục đã tồn tại");
        error.status = 400; // Thiết lập mã lỗi HTTP tùy chọn
        cb(error, false);
    } else {
        cb(null, true);
    }
}

const uploadCourse = multer({
    storageCourse: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5, // max file image: 5mb
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
        uploadCourse.single("image")(req, res, async function (err) {
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
        const file = req.file;
        const strorageRef = ref(storageCourse, req.file.originalname);
        const metadata = {
            contentType: file.mimetype,
        };
        // if no error -->
        uploadBytes(strorageRef, req.file.buffer, metadata).then(() => {
            // get url
            getDownloadURL(strorageRef)
                .then(async (url) => {
                    // success !
                    console.log("url course: ", url);
                    const response = await handleCreateCategory(title, url, 2);
                    if (response) {
                        res.status(200).json({
                            data: req.file,
                            url: url,
                        });
                    } else {
                        res.status(404).json({ mesage: "Error not defined" });
                    }
                })
                .catch((err) => {
                    console.log("loi lon roi: ", err);
                    res.status(500).json({
                        message: "upload khong thanh cong",
                    });
                });
        });
    }
);

// edit category
routeAPICategory.post(
    "/editCategoryAPI",
    (req, res, next) => {
        // neu khong co file nao duoc tai len --> no se vao thang else luon
        uploadCourse.single("image")(req, res, async function (err) {
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
        const id = req.query.id;
        if (!req.file) {
            const response = await handleEditCategory(title, null, id);
            if (response) {
                res.status(200).json({
                    data: req.file,
                    title: title,
                });
            } else {
                res.status(404).json({ mesage: "Error not defined" });
            }
            return;
        }
        const strorageRef = ref(storageCourse, req.file.originalname);
        const metadata = {
            contentType: file.mimetype,
        };
        // if no error -->
        uploadBytes(strorageRef, req.file.buffer, metadata).then(() => {
            // get url
            getDownloadURL(strorageRef)
                .then(async (url) => {
                    // success !
                    console.log("url course: ", url);
                    const response = await handleEditCategory(title, url, id);
                    if (response) {
                        res.status(200).json({
                            data: req.file,
                            title: title,
                            url: url,
                        });
                    } else {
                        res.status(404).json({ mesage: "Error not defined" });
                    }
                })
                .catch((err) => {
                    console.log("loi lon roi: ", err);
                    res.status(500).json({
                        message: "upload khong thanh cong",
                    });
                });
        });
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
