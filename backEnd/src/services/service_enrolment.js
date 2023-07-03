const { pool } = require("../config/database"); // use pool

const insertDataEnrolment = async (id_student, id_course, name_course) => {
    try {
        const checkEnrolment = await pool.query(
            `SELECT count(e.enrollment_id) 
            FROM enrollments e 
            WHERE course_id = $1 AND user_id = $2`,
            [id_course, id_student]
        );
        console.log("hehe boy: ", checkEnrolment);
        if (Number(checkEnrolment.rows[0].count)) {
            console.log(" khóa học này đã ghi danh rồi !");
            return "enrolment exists";
        }
        const response = await pool.query(
            `INSERT INTO enrollments(user_id,course_id,name_course) VALUES($1,$2,$3)`,
            [id_student, id_course, name_course]
        );
        return "upload success";
    } catch (error) {
        console.log("error upload enrolment: ", error);
        return null;
    }
};
const getDataEnrolment = async (res) => {
    try {
        const response = await pool.query(
            `SELECT e.*,u.user_email  
           FROM enrollments e 
           INNER JOIN users u  ON e.user_id = u.user_id `
        );
        console.log("Data: ", response.rows);
        return response.rows;
    } catch (error) {
        console.log("Err get data enrolment: ", error);
        return null;
    }
};
module.exports = {
    insertDataEnrolment,
    getDataEnrolment,
};
