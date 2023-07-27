const {
    handlePostComment,
    handleGetComment,
    handleDeleteComment,
} = require("../services/Service_Comment");
const postCommentAPI = async (req, res) => {
    const { user_id, comment_content, lesson_id, comment_parent } = req.body;
    console.log(user_id, comment_content, lesson_id, comment_parent);
    const response = await handlePostComment(
        user_id,
        comment_content,
        comment_parent,
        lesson_id
    );
    if (response) {
        res.status(200).json({ message: "upload success !" });
    } else {
        res.status(400).json({ message: "uload false !" });
    }
};

const getDataCommentAPI = async (req, res) => {
    const id_lesson = req.query.id_lesson;
    const heheBoy = req.query;
    console.log("hehe boy: ", heheBoy);
    console.log("id: ", id_lesson);
    const response = await handleGetComment(id_lesson);
    if (response) {
        res.status(200).json({ EC: 0, data: response });
    } else {
        res.status(400).json({ message: "get data false" });
    }
};

const deleteDataCommentAPI = async (req, res) => {
    const id_comment = req.query.id_comment;
    console.log("id comment: ", id_comment);
    const id_comment_child = req.query.id_comment_child;
    console.log("id: ", req.query);
    const response = await handleDeleteComment(id_comment, id_comment_child);
    if (response) {
        res.status(200).json({
            message: "delete success !",
        });
    } else {
        res.status(400).json({ message: "delete false" });
    }
};
module.exports = {
    postCommentAPI,
    getDataCommentAPI,
    deleteDataCommentAPI,
};
