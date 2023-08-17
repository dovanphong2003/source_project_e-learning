import React, { useEffect, useRef } from "react";
import "../../assets/style/viewVideo/viewVideoCr.css";
import "../../assets/style/responsiveCss/resViewVideoCourse.css";
import ReactQuill from "react-quill";
import Skeleton from "react-loading-skeleton";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import imageDemo from "../../assets/image/image_demo.png";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Plyr from "plyr";
import { ToastContainer, toast } from "react-toastify"; // toast
import { CommentCpn } from "./CommentCpn";
import { VerifyToken } from "../../components/Sections/FunctionAll";
import axios from "axios";
export const ViewVideoCourse = () => {
    const clearComment = useRef(null);
    const navigation = useNavigate();
    const notifyWarning = (content) => toast.warning(content);
    const notifySuccess = (content) => toast.success(content);
    const param = useParams();
    const [dataLesson, setDataLesson] = useState({});
    const [dataModulAndLesson, setDataModuleAndLesson] = useState([]);
    const [dtComment, getDtComment] = useState([]);
    const handleGetDataLeson = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/course/getLessonCourseUseIdAPI?idLesson=${param.idvideo}`
            );
            if (response.data.data.length) {
                setDataLesson(response.data.data[0]);
            }
        } catch (error) {
            navigation("/error");
        }
    };
    const getModuleLesson = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/product/getModuleLessonDetailAPI?idCourse=${param.id}`
            );
            setDataModuleAndLesson(response.data.data);
        } catch (error) {
            navigation("/error");
        }
    };
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
        handleGetDataLeson();
        getModuleLesson();
    }, [param.idvideo]);
    const getDataComment = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_URL_BACKEND}/comment/getDataCommentAPI?id_lesson=${param.idvideo}`
        );
        getDtComment(
            response.data.data.map((el) => {
                return {
                    ...el,
                    child_el: [],
                };
            })
        );
    };
    const dataModuleLessonConfig = dataModulAndLesson.length
        ? dataModulAndLesson.reduce((arr, el) => {
              const checkFind = arr.find(
                  (element) => element.module_name === el.module_name
              );
              if (checkFind) {
                  checkFind.lesson_id.push(el.lesson_id);
                  checkFind.lesson_name.push(el.lesson_name);
              } else {
                  arr.push({
                      lesson_id: [el.lesson_id],
                      lesson_name: [el.lesson_name],
                      module_name: el.module_name,
                  });
              }
              return arr;
          }, [])
        : null;
    const [sectionTypeVideo, setSectionTypeVideo] = useState("");
    useEffect(() => {
        if (dataLesson.type_video) {
            setSectionTypeVideo(dataLesson.type_video);
        }
    }, [dataLesson]);
    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");
    const refDivParent = useRef(null);
    setTimeout(() => {
        const controls = [
            "play-large", // The large play button in the center
            "restart", // Restart playback
            "rewind", // Rewind by the seek time (default 10 seconds)
            "play", // Play/pause playback
            "fast-forward", // Fast forward by the seek time (default 10 seconds)
            "progress", // The progress bar and scrubber for playback and buffering
            "current-time", // The current time of playback
            "duration", // The full duration of the media
            "mute", // Toggle mute
            "volume", // Volume control
            "captions", // Toggle captions
            "settings", // Settings menu
            "pip", // Picture-in-picture (currently Safari only)
            "airplay", // Airplay (currently Safari only)
            "fullscreen", // Toggle fullscreen
            "quality", // Thêm tùy chọn chất lượng
        ];

        const player = new Plyr(".player", { controls });
    }, 1);
    const urlParams = new URLSearchParams(window.location.search);
    const numberLesson = urlParams.get("numberLesson");
    let numberIndex = 1;
    const indexNumberLesson = dataModulAndLesson.length
        ? dataModulAndLesson.reduce((arr, obj) => {
              arr.push(obj.lesson_id);
              return arr;
          }, [])
        : "";

    const handleLessonBefore = (event) => {
        event.preventDefault();
        const indexCurrent = Number(param.idvideo);
        if (indexCurrent || indexCurrent === 0) {
            let lastIndex;
            for (let i = 0; i < indexNumberLesson.length; i++) {
                if (indexNumberLesson[i] === indexCurrent) {
                    if (i === 0) {
                        notifyWarning("bạn đang ở bài học đầu tiên !");
                        return;
                    } else {
                        lastIndex = indexNumberLesson[i - 1];
                        navigation(
                            `/detail-course/${
                                param.id
                            }/view-video/${lastIndex}?numberLesson=${
                                Number(numberLesson) - 1
                            }`
                        );
                        window.location.reload();
                        return;
                    }
                }
            }
        }
    };
    const handleLessonNext = (event) => {
        event.preventDefault();
        const indexCurrent = Number(param.idvideo);
        if (indexCurrent || indexCurrent === 0) {
            let indexNext;
            for (let i = 0; i < indexNumberLesson.length; i++) {
                if (indexNumberLesson[i] === indexCurrent) {
                    if (i === indexNumberLesson.length - 1) {
                        notifyWarning("bạn đang ở bài học cuối !");
                        return;
                    } else {
                        indexNext = indexNumberLesson[i + 1];
                        navigation(
                            `/detail-course/${
                                param.id
                            }/view-video/${indexNext}?numberLesson=${
                                Number(numberLesson) + 1
                            }`
                        );
                        window.location.reload();
                        return;
                    }
                }
            }
        }
    };

    /////////////////////////////// comment
    const [dataUser, setDataUser] = useState({});

    // get info user - id
    const fncgetInfoUserByAccessTokenAPI = async () => {
        try {
            const response = await axios.get(
                `${
                    process.env.REACT_APP_URL_BACKEND
                }/getInfoUserByAccessTokenAPI?accessToken=${localStorage.getItem(
                    "accessToken"
                )}`
            );

            setDataUser(response.data.data);
        } catch (error) {
            if (error.response.data.ec.message === "jwt expired") {
                const funcVerifyToken = await VerifyToken();
                await funcVerifyToken();
                const response = await axios.get(
                    `${
                        process.env.REACT_APP_URL_BACKEND
                    }/getInfoUserByAccessTokenAPI?accessToken=${localStorage.getItem(
                        "accessToken"
                    )}`
                );

                setDataUser(response.data.data);
            }
        }
    };
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            fncgetInfoUserByAccessTokenAPI();
        }
    }, [localStorage.getItem("nameUser")]);
    let checkHandleComment = false;
    const handlePostComment = async (event) => {
        event.preventDefault();
        if (checkHandleComment) {
            notifyWarning("Yêu cầu đang được xử lí !");
            return;
        }
        checkHandleComment = true;
        const funcVerifyToken = await VerifyToken();
        const resultVerify = await funcVerifyToken();
        if (dataUser.id && !resultVerify) {
            notifyWarning("Không thể thực hiện hành động trên !");
            checkHandleComment = false;
            return;
        }
        if (!value || value === "<p><br></p>") {
            notifyWarning("Vui lòng điền nội dung comment !");
            checkHandleComment = false;
            return;
        }
        if (value.length > 3000) {
            notifyWarning("Độ dài vượt quá quy định !");
            checkHandleComment = false;
            return;
        }

        const data = {
            user_id: dataUser.id,
            comment_content: value,
            lesson_id: param.idvideo,
            comment_parent: null,
        };
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_URL_BACKEND}/comment/postCommentAPI`,
                data
            );
            notifySuccess("comment thành công !");
            setValue("");
            const editor = clearComment.current.getEditor();
            getDataComment();
            editor.setContents([]);
            checkHandleComment = false;
        } catch (error) {
            checkHandleComment = false;
            notifyWarning("Đã xảy ra lỗi, comment không thành công !");
        }
    };

    // handle get data comment
    useEffect(() => {
        getDataComment();
    }, [param.idvideo]);
    const funcFindParent = (arrParent, id_parent, obj) => {
        arrParent.forEach((el) => {
            if (el && el.comment_id === id_parent) {
                el.child_el.push(obj);
                return arrParent;
            } else {
                if (el.child_el && Array.isArray(el.child_el)) {
                    return funcFindParent(el.child_el, id_parent, obj);
                }
            }
        });
        return arrParent;
    };
    const [dtNew, setDtNew] = useState([]);
    useEffect(() => {
        if (dtComment.length > 0) {
            setDtNew(
                dtComment.reduce((arr, obj) => {
                    if (obj.parent_id === null) {
                        arr.push(obj);
                        return arr;
                    } else {
                        const arrNew = funcFindParent(arr, obj.parent_id, obj);
                        return arrNew;
                    }
                }, [])
            );
        } else {
            setDtNew([]);
        }
    }, [dtComment]);
    return (
        <main className="view-video_course">
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
            <div className="container-main-view-video">
                <div className="header-container_video">
                    <div className="header-video-container_video">
                        <h1 className="title-container_video">
                            {numberLesson && dataLesson.lesson_name ? (
                                `Bài ${numberLesson}: ${dataLesson.lesson_name}`
                            ) : (
                                <Skeleton
                                    width={"100%"}
                                    height={"60px"}
                                    duration={2}
                                    count={1}
                                    className="skeleton-css"
                                    baseColor="#dadada"
                                    highlightColor="#ffff"
                                />
                            )}
                        </h1>

                        <hr className="hr_video" />
                        <div className="border-video_lession">
                            <div
                                className={`video_lession ${
                                    sectionTypeVideo === "youtube"
                                        ? "db-text-center-for-video_youtube"
                                        : "db-flex-for-video_url "
                                } `}
                            >
                                {sectionTypeVideo === "youtube" ? (
                                    <div className="player ">
                                        <iframe
                                            width="560"
                                            height="215"
                                            src={`${dataLesson.video_url}`}
                                            title="YouTube video player"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowfullscreen
                                        ></iframe>
                                    </div>
                                ) : sectionTypeVideo === "Videofile" ? (
                                    <video
                                        controls
                                        data-poster={imageDemo}
                                        class="vid1 player"
                                    >
                                        <source
                                            src={`${dataLesson.video_url}`}
                                            type="video/mp4"
                                        />
                                    </video>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <script></script>
                        <hr className="hr_video" />
                        {numberLesson && dataLesson.lesson_name ? (
                            <div className="all-bnt-lession">
                                <button
                                    onClick={handleLessonBefore}
                                    className="btn-lession"
                                >
                                    <span class="material-symbols-outlined">
                                        keyboard_double_arrow_left
                                    </span>

                                    <span>Bài trước</span>
                                </button>
                                <div className="bnt-next_hidden">
                                    <button
                                        onClick={handleLessonNext}
                                        className="btn-lession mr-r-5"
                                    >
                                        <span>Bài tiếp</span>
                                        <span class="material-symbols-outlined">
                                            keyboard_double_arrow_right
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Skeleton
                                width={"100%"}
                                height={"40px"}
                                duration={2}
                                count={1}
                                className="skeleton-css"
                                baseColor="#dadada"
                                highlightColor="#ffff"
                            />
                        )}

                        <hr className="hr_video" />
                        {numberLesson && dataLesson.lesson_name ? (
                            <div className="connect-lecturers connect-lecturers-all">
                                <h3>Kết Nối Với Giảng Viên</h3>
                                <button className="mr-r-5">Chat Zalo</button>
                                <button className="mr-l-5">
                                    Chat Facebook
                                </button>
                            </div>
                        ) : (
                            <Skeleton
                                width={"40%"}
                                height={"40px"}
                                duration={2}
                                count={2}
                                className="skeleton-css"
                                baseColor="#dadada"
                                highlightColor="#ffff"
                            />
                        )}
                    </div>
                    <div className="list-lession_container-video">
                        <div className="header-ll_container-video">
                            <span class="material-symbols-outlined">
                                track_changes
                            </span>
                            <span> Hoàn Thành: 0%</span>
                        </div>
                        <div className="content_container-video">
                            {/** video */}
                            <ul className="list-root_video">
                                {dataModuleLessonConfig
                                    ? dataModuleLessonConfig.map(
                                          (el, index) => {
                                              return (
                                                  <li className="name-module_video">
                                                      <ul className="list-content-video">
                                                          <h3 className="title_list-video">
                                                              {` Module ${
                                                                  index + 1
                                                              }: ${
                                                                  el.module_name
                                                              }`}
                                                          </h3>
                                                          {el.lesson_name.map(
                                                              (
                                                                  el_child,
                                                                  indexChild
                                                              ) => {
                                                                  return (
                                                                      <li className="li_name-lesson_course">
                                                                          <input type="checkbox" />
                                                                          <Link
                                                                              to="#"
                                                                              id={`${numberIndex}`}
                                                                              onClick={(
                                                                                  e
                                                                              ) => {
                                                                                  const numberIndexLesson =
                                                                                      e
                                                                                          .target
                                                                                          .id;

                                                                                  navigation(
                                                                                      `/detail-course/${param.id}/view-video/${el.lesson_id[indexChild]}?numberLesson=${numberIndexLesson}`
                                                                                  );
                                                                                  window.location.reload();
                                                                              }}
                                                                          >
                                                                              {" "}
                                                                              {`Bài
                                                                              ${numberIndex++}:
                                                                              ${el_child}`}
                                                                          </Link>
                                                                      </li>
                                                                  );
                                                              }
                                                          )}
                                                      </ul>
                                                  </li>
                                              );
                                          }
                                      )
                                    : [1, 2, 3, 4].map((el) => {
                                          return (
                                              <>
                                                  <Skeleton
                                                      width={"100%"}
                                                      height={"40px"}
                                                      duration={2}
                                                      count={1}
                                                      className="skeleton-css"
                                                      baseColor="#dadada"
                                                      highlightColor="#ffff"
                                                  />
                                                  <Skeleton
                                                      width={"60%"}
                                                      height={"20px"}
                                                      duration={2}
                                                      count={6}
                                                      className="skeleton-css"
                                                      baseColor="#dadada"
                                                      highlightColor="#ffff"
                                                  />
                                              </>
                                          );
                                      })}
                            </ul>
                        </div>
                        {numberLesson && dataLesson.lesson_name ? (
                            <div className="connect-lecturers connect-lecturers-mobile">
                                <h3>Kết Nối Với Giảng Viên</h3>
                                <button className="mr-r-5">Chat Zalo</button>
                                <button className="mr-l-5">
                                    Chat Facebook
                                </button>
                            </div>
                        ) : (
                            <Skeleton
                                width={"40%"}
                                height={"40px"}
                                duration={2}
                                count={2}
                                className="skeleton-css"
                                baseColor="#dadada"
                                highlightColor="#ffff"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="container-main-view-video container-middle">
                <div className="comment-lession">
                    <h3>Bình Luận</h3>
                    <div className="main-comment">
                        <ReactQuill
                            style={{ minHeight: "500px" }}
                            ref={clearComment}
                            className="ql-container min-height_500-px ql-editor"
                            theme="snow"
                            // readOnly={true}
                            // value={value}
                            onChange={(content) => {
                                setValue(content);
                            }}
                            toolbar="#toolbar"
                            spellCheck={false} // tat kiem tra chinh ta
                        />
                    </div>
                    <div className="submit-comment">
                        <button onClick={handlePostComment}>Gửi</button>
                    </div>
                    <hr className="hr_video" />
                    <div className="list-comment">
                        <h3>{dtComment.length} Bình Luận</h3>
                    </div>
                    <div className="container_list-comment">
                        <CommentCpn />
                        {dtNew.length
                            ? dtNew.map((el) => {
                                  const arrayChild = el.child_el;
                                  if (el.child_el) {
                                      return (
                                          <CommentCpn
                                              data={el}
                                              getDataComment={getDataComment}
                                              refDivParent={refDivParent}
                                              cpnChild={arrayChild}
                                              isIdUser={dataUser.id}
                                          />
                                      );
                                  } else {
                                      return (
                                          <CommentCpn
                                              data={el}
                                              getDataComment={getDataComment}
                                              refDivParent={refDivParent}
                                              cpnChild={arrayChild}
                                              isIdUser={dataUser.id}
                                          />
                                      );
                                  }
                              })
                            : ""}
                    </div>
                </div>
            </div>
        </main>
    );
};
