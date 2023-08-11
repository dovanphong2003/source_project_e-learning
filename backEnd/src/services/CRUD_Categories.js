const { pool } = require("../config/database"); // use pool
const getAllProductAPI = async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM coursecategories");
        res.status(200).json({
            EC: 0,
            data: data.rows,
        });
    } catch (error) {
        res.status(404).json({
            EC: error,
        });
    }
};
const getProductAPI = async (req, res) => {
    const idCategory = req.query.id;
    try {
        const response = await pool.query(
            `SELECT c.*, cc.category_name AS category_name, u.user_name AS name_author 
            FROM courses c 
            INNER JOIN coursecategories cc ON c.category_id  = cc.category_id 
            INNER JOIN users u ON u.user_id = c.instructor_id 
            WHERE c.category_id = $1`,
            [idCategory]
        );
        res.status(200).json({
            EC: 0,
            data: response.rows,
        });
    } catch (error) {
        res.status(404).json({
            EC: error,
        });
    }
};
const getLessonCourseAPI = async (req, res) => {
    const idCourse = req.query.idCourse;
    try {
        const responseLesson = await pool.query(
            `SELECT  count(lesson_id) FROM lesson l
        INNER JOIN modulelesson m ON  l.module_id = m.module_id
        INNER JOIN courses c ON c.course_id  = m.course_id
        WHERE c.course_id = $1`,
            [idCourse]
        );
        res.status(200).json({
            EC: 0,
            Countlesson: responseLesson.rows[0].count,
        });
    } catch (error) {
        res.status(404).json({
            EC: error,
        });
    }
};
const getModuleLessonDetailAPI = async (req, res) => {
    try {
        const response = await pool.query(
            `SELECT m.module_name, l.lesson_name,l.lesson_id FROM modulelesson m 
            INNER JOIN lesson l ON l.module_id  = m.module_id
            INNER JOIN courses c ON c.course_id  = m.course_id 
            WHERE c.course_id  = $1 ORDER BY m.module_id ASC, l.lesson_id ASC `,
            [req.query.idCourse]
        );
        res.status(200).json({
            EC: 0,
            data: response.rows,
        });
    } catch (error) {
        res.status(404).json({
            EC: error,
        });
    }
};
const handleCreateCategory = async (title, url, handle) => {
    try {
        if (handle === 1) {
            const checkNameCategory = await pool.query(
                `SELECT category_name FROM coursecategories`
            );
            for (let i = 0; i < checkNameCategory.rows.length; i++) {
                if (checkNameCategory.rows[i].category_name === title) {
                    return "danh mục đã tồn tại";
                }
            }
            return "không bị trùng danh mục";
        }
        if (handle === 2) {
            const queryUpload = await pool.query(
                `INSERT INTO coursecategories(category_name,image_category)
     VALUES($1,$2)`,
                [title, url]
            );
            return "update success !";
        }
        return "handle không xác định";
    } catch (error) {
        return null;
    }
};
const handleEditCategory = async (title, url, id) => {
    try {
        if (title && url) {
            const queryUpload = await pool.query(
                `UPDATE coursecategories SET category_name = $1,image_category  = $2 WHERE category_id=$3`,
                [title, url, id]
            );
        } else if (title) {
            const queryUpload = await pool.query(
                `UPDATE coursecategories SET category_name = $1 WHERE category_id=$2`,
                [title, id]
            );
        } else if (url) {
            const queryUpload = await pool.query(
                `UPDATE coursecategories SET image_category  = $1 WHERE category_id=$2`,
                [url, id]
            );
        }
        return "update success !";
    } catch (error) {
        return null;
    }
};
const getCategory = async () => {
    try {
        const response = await pool.query(
            "SELECT * FROM coursecategories ORDER BY category_id ASC"
        );
        return response.rows;
    } catch (error) {
        return null;
    }
};
const getCourseOfCategory = async () => {
    try {
        const response = await pool.query(
            `SELECT c2.course_name ,c2.category_id ,c2.course_id  
          FROM courses c2 
          INNER JOIN coursecategories c 
          ON c.category_id = c2.category_id  
          ORDER BY c2.course_id`
        );
        return response.rows;
    } catch (error) {
        return null;
    }
};
const getOneCategory = async (id) => {
    try {
        const response = await pool.query(
            "SELECT category_name,image_category FROM coursecategories WHERE category_id = $1",
            [id]
        );

        if (response.rowCount) {
            return response.rows;
        } else {
            return "id không hợp lệ";
        }
    } catch (error) {
        return null;
    }
};
const getAllProductLimitAPI = async (req, res) => {
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const offset = limit * (page - 1);
    try {
        const response = await pool.query(
            `SELECT c.*, u.user_name AS name_author 
            FROM courses c 
            INNER JOIN users u ON u.user_id = c.instructor_id
    ORDER BY c.course_id
    LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        res.status(200).json({ data: response.rows });
    } catch (error) {
        res.status(400).json({ err: error });
    }
};
const getLengthAllProductsAPI = async (req, res) => {
    const response = await pool.query(`SELECT COUNT(course_id) FROM courses`);
    res.status(200).json({ lengthCourse: response.rows[0].count });
};
module.exports = {
    getAllProductAPI,
    getProductAPI,
    getLessonCourseAPI,
    getModuleLessonDetailAPI,
    handleCreateCategory,
    getCategory,
    getOneCategory,
    handleEditCategory,
    getCourseOfCategory,
    getAllProductLimitAPI,
    getLengthAllProductsAPI,
};
