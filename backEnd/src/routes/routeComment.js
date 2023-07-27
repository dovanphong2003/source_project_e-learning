const express = require("express");
const {
    postCommentAPI,
    getDataCommentAPI,
    deleteDataCommentAPI,
} = require("../controllers/CRUD_comment");
const routerComment = express.Router();

routerComment.post("/postCommentAPI", postCommentAPI);
routerComment.get("/getDataCommentAPI", getDataCommentAPI);
routerComment.delete("/deleteDataCommentAPI", deleteDataCommentAPI);

module.exports = {
    routerComment,
};
