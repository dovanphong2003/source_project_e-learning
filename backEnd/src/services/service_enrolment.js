const { pool } = require("../config/database"); // use pool

const insertDataEnrolment = async (id_student, id_course, name_course) => {
    try {
        const checkEnrolment = await pool.query(
            `SELECT count(e.enrollment_id) 
            FROM enrollments e 
            WHERE course_id = $1 AND user_id = $2`,
            [id_course, id_student]
        );
        if (Number(checkEnrolment.rows[0].count)) {
            return "enrolment exists";
        }
        const response = await pool.query(
            `INSERT INTO enrollments(user_id,course_id,name_course) VALUES($1,$2,$3)`,
            [id_student, id_course, name_course]
        );
        return "upload success";
    } catch (error) {
        return null;
    }
};

// insert many data
const insertDataEnrolments = async (id_student, ArrId_course) => {
    try {
        for (let i = 0; i < ArrId_course.length; i++) {
            await pool.query(
                `INSERT INTO enrollments(user_id,course_id,name_course) VALUES($1,$2,$3)`,
                [
                    id_student,
                    ArrId_course[i].id_course,
                    ArrId_course[i].course_name,
                ]
            );
        }
        return "upload success";
    } catch (error) {
        return null;
    }
};
const getDataEnrolment = async () => {
    try {
        const response = await pool.query(
            `SELECT e.*,u.user_email  
           FROM enrollments e 
           INNER JOIN users u  ON e.user_id = u.user_id `
        );
        return response.rows;
    } catch (error) {
        return null;
    }
};

const getDataEnrolmentRevenue = async () => {
    try {
        const response = await pool.query(
            `SELECT e.*,c.course_price 
            FROM enrollments e
            INNER JOIN courses c ON c.course_id = e.course_id 
            WHERE DATE(e.created_at) >= CURRENT_DATE - INTERVAL '7 day' AND DATE(e.created_at) <= CURRENT_DATE
            ORDER BY e.created_at ASC `
        );
        return response.rows;
    } catch (error) {
        return null;
    }
};

const getDataEnrolmentOfUser = async (user_id) => {
    try {
        const response = await pool.query(
            `SELECT course_id
           FROM enrollments 
           WHERE user_id = $1`,
            [user_id]
        );
        return response.rows;
    } catch (error) {
        return null;
    }
};

module.exports = {
    insertDataEnrolment,
    getDataEnrolment,
    insertDataEnrolments,
    getDataEnrolmentOfUser,
    getDataEnrolmentRevenue,
};
