const { pool } = require("../config/database"); // use pool

const handleCheckCreateCourse = async (title_course) => {
    console.log("title: ", title_course);
    try {
        const checkNameCourse = await pool.query(
            `SELECT course_name FROM courses WHERE course_name = $1 `,
            [title_course]
        );
        if (checkNameCourse.rowCount) {
            return "Tên khóa học đã tồn tại";
        } else {
            return "không bị trùng tên khóa học";
        }
    } catch (error) {
        console.log("error create category: ", error);
        return null;
    }
};
const handleCreateCourse = async (data, data_file) => {
    const {
        title_name,
        description,
        category,
        level,
        instructor,
        price,
        result_course,
        url_course,
    } = data;
    const { filename } = data_file;
    try {
        const queryUpload = await pool.query(
            `INSERT INTO courses(course_name,course_description,category_id,level_course,instructor_id,course_price,resultcourse,image_course,path_course,status)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [
                title_name,
                description,
                category,
                level,
                instructor,
                price,
                result_course,
                filename,
                url_course,
                "pending",
            ]
        );
        return "update success !";
    } catch (error) {
        console.log("error create category: ", error);
        return null;
    }
};

const handleGetAllCourse = async () => {
    try {
        const response = await pool.query(
            "SELECT  c.*, u.user_name  FROM  courses c INNER JOIN users u ON c.instructor_id = u.user_id "
        );
        return response.rows;
    } catch (error) {
        console.log("err getAllCourse: ", error);
        return null;
    }
};

const getDataForCourse = async () => {
    try {
        const response = await pool.query(
            `SELECT
           (SELECT COUNT(course_id) FROM courses) AS total_courses,
           (SELECT COUNT(lesson_id) FROM lesson) AS total_lessons,
           (SELECT COUNT(user_id) FROM users) AS total_users,
           (SELECT COUNT(enrollment_id) FROM enrollments) AS total_enrollments,
           (SELECT COUNT(course_id) FROM courses WHERE status = 'pending') AS total_pending,
           (SELECT COUNT(course_id) FROM courses WHERE status = 'handle') AS total_handle`
        );
        console.log("data: ", response);
        return response.rows;
    } catch (error) {
        console.log("err getAllCourse: ", error);
        return null;
    }
};
const handleGetNameAndIdAPI = async () => {
    try {
        const response = await pool.query(
            "SELECT course_id ,course_name FROM courses c "
        );
        return response.rows;
    } catch (error) {
        console.log("err getAllCourse: ", error);
        return null;
    }
};
const handlePostModuleAPI = async (name_module, id_course) => {
    try {
        const response = await pool.query(
            `INSERT INTO modulelesson (module_name,course_id) VALUES($1,$2)`,
            [name_module, id_course]
        );
        return "success ";
    } catch (error) {
        console.log("err getAllCourse: ", error);
        return null;
    }
};

const handleGetNameModuledAPI = async (idCourse) => {
    try {
        const response = await pool.query(
            `SELECT course_id ,module_name,module_id  
            FROM modulelesson m  
            WHERE course_id = $1 
            ORDER BY module_id ASC`,
            [idCourse]
        );
        if (response.rowCount) {
            return response.rows;
        } else {
            return "Khóa học này chưa có chương nào cả !";
        }
    } catch (error) {
        console.log("err get name module: ", error);
        return null;
    }
};
const handleCreateLessonOne = async (data) => {
    const { title, module, type_video, url_video } = data;
    try {
        const queryUpload = await pool.query(
            `INSERT INTO lesson (lesson_name,video_url,module_id,type_video) 
            VALUES ($1,$2,$3,$4)`,
            [title, url_video, module, type_video]
        );
        return "update success !";
    } catch (error) {
        console.log("error create category: ", error);
        return null;
    }
};

const hanleSetBestSeller = async (id_course, action) => {
    try {
        if (action === "set") {
            const response = await pool.query(
                `UPDATE courses
            SET bestseller = $1
            WHERE course_id= $2`,
                [true, id_course]
            );
            return "set up thành công";
        } else if (action === "delete") {
            const response = await pool.query(
                `UPDATE courses
            SET bestseller = $1
            WHERE course_id= $2`,
                [false, id_course]
            );
            return "set up thành công";
        } else {
            return null;
        }
    } catch (error) {
        console.log("error handle set best seller: ", error);
        return null;
    }
};
const handleCreateLesson = async (data, url_video) => {
    const { title, module, type_video } = data;
    try {
        const queryUpload = await pool.query(
            `INSERT INTO lesson (lesson_name,video_url,module_id,type_video) 
            VALUES ($1,$2,$3,$4)`,
            [title, url_video, module, type_video]
        );
        return "update success !";
    } catch (error) {
        console.log("error create category: ", error);
        return null;
    }
};
const getCourseBSellerAndNews = async () => {
    const data = {
        dataCourseNews: null,
        dataCourseSeller: null,
    };
    try {
        const dataCourseNews = await pool.query(`SELECT * FROM courses
        WHERE created_at BETWEEN current_date - interval '7 days' AND current_date`);
        data.dataCourseNews = dataCourseNews.rows;
        const dataCourseSeller = await pool.query(
            `SELECT * FROM courses c WHERE c.bestseller = TRUE`
        );
        data.dataCourseSeller = dataCourseSeller.rows;
        return data;
    } catch (error) {
        console.log("error get course best seller anhd news: ", error);
        return null;
    }
};

module.exports = {
    handleCheckCreateCourse,
    handleCreateCourse,
    handleGetAllCourse,
    getDataForCourse,
    handleGetNameAndIdAPI,
    handlePostModuleAPI,
    handleGetNameModuledAPI,
    handleCreateLesson,
    handleCreateLessonOne,
    hanleSetBestSeller,
    getCourseBSellerAndNews,
};
