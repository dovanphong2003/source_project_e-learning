const { pool } = require("../config/database"); // use pool
const getAllProductAPI = async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM coursecategories");
        res.status(200).json({
            EC: 0,
            data: data.rows,
        });
    } catch (error) {
        console.log("erroo:::::::::", error);
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
        console.log("error: ", error);
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
        console.log("error: ", error);
        res.status(404).json({
            EC: error,
        });
    }
};
const getModuleLessonAPI = async (req, res) => {
    try {
        const response = await pool.query(
            `SELECT m.module_name, l.lesson_name  FROM modulelesson m 
            INNER JOIN lesson l ON l.module_id  = m.module_id
            INNER JOIN courses c ON c.course_id  = m.course_id 
            WHERE c.course_id  = $1`,
            [req.query.idCourse]
        );
        res.status(200).json({
            EC: 0,
            data: response,
        });
    } catch (error) {
        res.status(404).json({
            EC: error,
        });
    }
};
const handleCreateCategory = async (title, imageName, handle) => {
    console.log("title: ", title);
    console.log("imageName: ", imageName);
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
                [title, imageName]
            );
            return "update success !";
        }
        return "handle không xác định";
    } catch (error) {
        console.log("error create category: ", error);
        return null;
    }
};
const handleEditCategory = async (title, imageName, id) => {
    console.log("title: ", title);
    console.log("imageName: ", imageName);
    try {
        const checkNameCategory = await pool.query(
            `SELECT category_name FROM coursecategories WHERE category_id != $1`,
            [id]
        );
        console.log("name: ", title);
        for (let i = 0; i < checkNameCategory.rows.length; i++) {
            if (checkNameCategory.rows[i].category_name === title) {
                return "danh mục đã tồn tại";
            }
        }
        console.log(234);
        if (title && imageName) {
            console.log(1);
            const queryUpload = await pool.query(
                `UPDATE coursecategories SET category_name = $1,image_category  = $2 WHERE category_id=$3`,
                [title, imageName, id]
            );
        } else if (title) {
            console.log(3);

            const queryUpload = await pool.query(
                `UPDATE coursecategories SET category_name = $1 WHERE category_id=$2`,
                [title, id]
            );
        } else if (imageName) {
            console.log(3);

            const queryUpload = await pool.query(
                `UPDATE coursecategories SET image_category  = $1 WHERE category_id=$2`,
                [imageName, id]
            );
        }
        return "update success !";
    } catch (error) {
        console.log("error create category: ", error);
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
        console.log("error getcategory: ", error);
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
        console.log("error getcategory: ", error);
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
        console.log("error getcategory: ", error);
        return null;
    }
};
module.exports = {
    getAllProductAPI,
    getProductAPI,
    getLessonCourseAPI,
    getModuleLessonAPI,
    handleCreateCategory,
    getCategory,
    getOneCategory,
    handleEditCategory,
    getCourseOfCategory,
};
