import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import Parser from "html-react-parser"; // change string ( html ) --> to html
import { ToastContainer, toast } from "react-toastify"; // toast
import axios from "axios";
import { RoleContext } from "../../context/RoleContext";
export const CommentCpn = ({
    data,
    getDataComment,
    refDivParent,
    cpnChild,
    isIdUser,
}) => {
    const [value2, setValue2] = useState("");
    const [setHidden, checkSetHidden] = useState(true);
    const refDivParent2 = useRef(null);
    const notifyWarning = (content) => toast.warning(content);
    const notifySuccess = (content) => toast.success(content);
    const refComment = useRef(null);
    const handleRepComment = async (event) => {
        event.preventDefault();
        if (!value2 || value2 === "<p><br></p>") {
            notifyWarning("Vui lòng điền nội dung comment !");
            return;
        }
        if (value2.length > 3000) {
            notifyWarning("Độ dài vượt quá quy định !");
            return;
        }

        if (data) {
            const dataUser = {
                user_id: isIdUser,
                comment_content: value2,
                lesson_id: data.lesson_id,
                comment_parent: data.comment_id,
            };
            try {
                const response = await axios.post(
                    `${process.env.URL_BACKEND}/comment/postCommentAPI`,
                    dataUser
                );
                console.log("res: ", response);
                notifySuccess("comment thành công !");
                setValue2("");
                const editor = refComment.current.getEditor();
                getDataComment();
                editor.setContents([]);
                checkSetHidden(!setHidden);
            } catch (error) {
                notifyWarning("Đã xảy ra lỗi, comment không thành công !");
                console.log("Err: ", error);
            }
            // check comment error
        }
    };
    const arrCommentChild = [];
    const getCommentChild = (parent) => {
        if (parent.child_el && parent.child_el.length !== 0) {
            parent.child_el.map((el) => {
                arrCommentChild.push(el.comment_id);
                if (Array.isArray(el.child_el) && el.child_el.length) {
                    getCommentChild(el);
                }
            });
        }
    };

    // delete comment
    const handleDeleteComment = async (event) => {
        event.preventDefault();
        getCommentChild(data);
        try {
            const dataArrCommentChild = arrCommentChild.join(",");
            const response = await axios.delete(
                `${process.env.URL_BACKEND}/comment/deleteDataCommentAPI?id_comment=${data.comment_id}&id_comment_child=${dataArrCommentChild}`
            );
            getDataComment();
        } catch (error) {
            console.log("error delete comment:  ", error);
        }
    };
    return (
        <ul className={`${data ? "" : "hidden"} container_list-comment-ul`}>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <li
                id={`id_li-${data ? data.comment_id : ""}`}
                className="container_list-comment-ul-li"
                ref={refDivParent}
            >
                <div className="container_list-comment-li">
                    <img
                        src="/imageUserDefault.png"
                        alt=""
                        className="img-user_comment"
                    />
                    <div className="content-comment-user">
                        <div className="info-basic-comment">
                            <div>
                                <span className="date_time-info_basic-comment">
                                    {data ? data.created_at : ""},
                                </span>
                                <span className="name-user_comment">
                                    {data ? data.user_name : ""}
                                </span>
                            </div>
                            <div className="div-delete-add-comment-all">
                                <button
                                    onClick={handleDeleteComment}
                                    className={`${
                                        data && isIdUser === data.user_id
                                            ? ""
                                            : "hidden"
                                    } delete-comment-user`}
                                >
                                    <i>Xóa bình luận</i>
                                </button>
                                <button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        checkSetHidden(!setHidden);
                                    }}
                                    className="reply-comment-user"
                                >
                                    <i>Trả lời</i>
                                </button>
                            </div>
                        </div>
                        <div className="main-content-comment">
                            <div className="container_list-comment-p">
                                {data ? Parser(data.comment_content) : ""}
                            </div>
                        </div>
                        <div className="div-delete-add-comment-mobile">
                            <button
                                onClick={handleDeleteComment}
                                className={`${
                                    data && isIdUser === data.user_id
                                        ? ""
                                        : "hidden"
                                } delete-comment-user`}
                            >
                                <i>Xóa bình luận</i>
                            </button>
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    checkSetHidden(!setHidden);
                                }}
                                className="reply-comment-user"
                            >
                                <i>Trả lời</i>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`${
                        setHidden ? "hidden" : ""
                    } container-reply-comment`}
                >
                    <div className="reply_comment-input">
                        <ReactQuill
                            className="ql-container editor-reply-comment ql-editor"
                            theme="bubble"
                            value={value2}
                            onChange={setValue2}
                            toolbar="#toolbar"
                            spellCheck={false}
                            placeholder="Trả lời bình luận..."
                            ref={refComment}
                        />
                        <button onClick={handleRepComment}>
                            <span class="send_data-reply-comment material-symbols-outlined">
                                send
                            </span>
                        </button>
                    </div>
                </div>
            </li>
            {cpnChild && cpnChild.length
                ? cpnChild.map((el) => {
                      const arrayChild = el.child_el;

                      return (
                          <CommentCpn
                              data={el}
                              getDataComment={getDataComment}
                              refDivParent={refDivParent}
                              cpnChild={arrayChild}
                              isIdUser={isIdUser}
                          />
                      );
                  })
                : ""}
        </ul>
    );
};
