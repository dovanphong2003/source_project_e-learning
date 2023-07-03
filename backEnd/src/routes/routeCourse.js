const express = require("express");
const { pool } = require("../config/database"); // use pool
const {
    handleCheckCreateCourse,
    handleCreateCourse,
    handleCreateLesson,
} = require("../services/CRUD_course");
const {
    getAllCourseAPI,
    getNameAndIdAPI,
    postModuleAPI,
    setBesellerAPI,
    getNameModuleAPI,
    postLessonAPI,
    getDataForCourseAPI,
    getCourseBSellerAndNewsAPI,
} = require("../controllers/CRUD_Course");
// config upload image
const multer = require("multer"); // use multer upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(1);
        cb(null, "../frontend/public/imageCourse");
        console.log(2);
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
    const result = await handleCheckCreateCourse(req.query.title_name);
    if (result === "Tên khóa học đã tồn tại") {
        const error = new Error("Tên khóa học đã tồn tại");
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

////////////////////////////////////////////////////// route
// set route
const routeAPICourse = express.Router();

// create course

//post course
routeAPICourse.post(
    "/createCourseAPI",
    (req, res, next) => {
        // check loi,
        /**
         * trong trường hợp này, upload.single("image") là một middleware function,
         *  và sau đó chúng ta gọi nó ngay lập tức bằng cách truyền req, res và
         *  callback function vào trong cặp dấu ngoặc đơn tiếp theo (...).
         * req và res được lấy ở bên trên.
         */
        // upload.single("ten_chua_file_anh_dua_vao");
        upload.single("image_course")(req, res, async function (err) {
            if (err) {
                console.log("errrrrrrrrrr: ", err.message);
                if (err.message === "Tên khóa học đã tồn tại") {
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
        console.log("data: ", req.body);
        const response = await handleCreateCourse(req.body, req.file);
        if (response === "update success !") {
            res.status(200).json({ message: "upload thành công !" });
        } else {
            res.status(500).json({
                result: "Có lỗi xảy ra trong quá trình xử lý file",
            });
        }
    }
);

// post module
routeAPICourse.post("/postModuleAPI", postModuleAPI);
routeAPICourse.post("/setBesellerAPI", setBesellerAPI);

// getAllCourse
routeAPICourse.get("/getAllCourseAPI", getAllCourseAPI);
routeAPICourse.get("/getNameAndIdAPI", getNameAndIdAPI);
routeAPICourse.get("/getNameModuleAPI", getNameModuleAPI);
routeAPICourse.get("/getDataForCourseAPI", getDataForCourseAPI);
routeAPICourse.get("/getCourseBSellerAndNewsAPI", getCourseBSellerAndNewsAPI);
// POST lesson
routeAPICourse.post("/postLessonOneAPI", postLessonAPI);

///////////////////////////////////////////////
const firebase = require("firebase/app"); // get firebase
const {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} = require("firebase/storage");

// conffig firebase ( lay config khi tao project tren firebase)
const firebaseConfig = {
    apiKey: "AIzaSyA1mvjVf45GUiyYy3RHT1NruFfXdiRgeDM",
    authDomain: "upload-video-to-firebase-f9d48.firebaseapp.com",
    projectId: "upload-video-to-firebase-f9d48",
    storageBucket: "upload-video-to-firebase-f9d48.appspot.com",
    messagingSenderId: "620684388407",
    appId: "1:620684388407:web:615612e566f672f44b77b2",
    measurementId: "G-SVXHT8H28Y",
};
firebase.initializeApp(firebaseConfig); // connect config

const storageCourse = getStorage(); // get strorage

// config upload file
const uploadCourse = multer({
    storageCourse: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 20, // max file image: 1mb
    },
});

routeAPICourse.post(
    "/postLessonTwoAPI",
    (req, res, next) => {
        // upload filem, check err
        uploadCourse.single("file_video")(req, res, async function (err) {
            if (err) {
                console.log("errrrrrrrrrr: ", err.message);
                if (err.message === "Tên khóa học đã tồn tại") {
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
        console.log("data: ", req.body);
        console.log("file:", req.file);
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
                    console.log("url: ", url);
                    const response = await handleCreateLesson(req.body, url);
                    if (response) {
                        res.status(200).json({
                            message: "upload thành công !",
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
        ////////////////////////////////////////////////////////////////////////////
    }
);

module.exports = {
    routeAPICourse,
};
