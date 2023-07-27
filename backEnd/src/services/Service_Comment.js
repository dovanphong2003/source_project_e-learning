const { pool } = require("../config/database"); // use pool
const handlePostComment = async (
    user_id,
    comment_content,
    comment_parent,
    lesson_id
) => {
    try {
        const result = await pool.query(
            `INSERT INTO "comments"(user_id,comment_content,parent_id,lesson_id) 
    VALUES($1,$2,$3,$4)`,
            [user_id, comment_content, comment_parent, lesson_id]
        );
        return "post success";
    } catch (error) {
        console.log("error post comment: ", error);
        return null;
    }
};
const handleGetComment = async (lesson_id) => {
    try {
        const result = await pool.query(
            `
        SELECT c.*,u.user_name 
        FROM "comments" c
        INNER JOIN users u ON u.user_Id = c.user_id
        WHERE lesson_id = $1
        `,
            [lesson_id]
        );
        // console.log("data result: ", result);
        return result.rows;
    } catch (error) {
        console.log("error get data comment: ", error);
        return null;
    }
};
const handleDeleteComment = async (id_comment, id_comment_child) => {
    const arrNew = id_comment_child.split(",");
    console.log("hehehaha boy: ", arrNew);
    console.log("hehe boy: ", ...arrNew);
    console.log("data delete: ", id_comment_child);
    try {
        if (arrNew && arrNew[0] !== "") {
            const responseDeleteParent = await pool.query(
                `DELETE FROM comments
        WHERE comment_id IN (${id_comment_child})`
            );
        }
        const responseDeleteChild = await pool.query(
            `DELETE FROM "comments" WHERE comment_id = $1`,
            [id_comment]
        );
        return 1;
    } catch (error) {
        console.log("error delete comment: ", error);
        return null;
    }
};
module.exports = {
    handlePostComment,
    handleGetComment,
    handleDeleteComment,
};
