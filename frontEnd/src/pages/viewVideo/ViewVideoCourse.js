import React, { useEffect } from "react";
import "../../assets/style/viewVideo/viewVideoCr.css";
import ReactMarkdown from "react-markdown";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import Parser from "html-react-parser";
import video from "../../assets/video/music_very_hay.mp4";
import lancuoi from "../../assets/video/music_lan_cuoi.mp4";
import imageDemo from "../../assets/image/image_demo.png";
import Plyr from "plyr";
import "https://cdnjs.cloudflare.com/ajax/libs/plyr/3.6.7/plyr.min.js";
// import { ControlVideo } from "./component/ControlVideo";
export const ViewVideoCourse = () => {
    const [checkClasslist, setCheckClasslist] = useState("");
    const [sectionTypeVideo, setSectionTypeVideo] = useState("youtube");
    const [value, setValue] = useState("");
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
    return (
        <main className="view-video_course">
            <div className="container-main-view-video">
                <div className="header-container_video">
                    <div className="header-video-container_video">
                        <h1 className="title-container_video">
                            Bài 04: Kiểm tra thông tin PHP - phpinfo()
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
                                            height="315"
                                            src="https://www.youtube.com/watch?v=2Tuo5u39qM8&t=706s"
                                            title="YouTube video player"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowfullscreen
                                        ></iframe>
                                    </div>
                                ) : sectionTypeVideo === "url" ? (
                                    <video
                                        controls
                                        data-poster={imageDemo}
                                        class="vid1 player"
                                    >
                                        <source
                                            src="https://firebasestorage.googleapis.com/v0/b/upload-video-to-firebase-f9d48.appspot.com/o/bandicam%202021-10-30%2019-48-34-224.mp4?alt=media&token=a5fb745a-432d-4691-a07e-ecac34486105"
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
                        <div className="all-bnt-lession">
                            <button className="btn-lession">
                                <span class="material-symbols-outlined">
                                    keyboard_double_arrow_left
                                </span>
                                <span>Bài trước</span>
                            </button>
                            <div className="bnt-next_hidden">
                                <button className="btn-lession mr-r-5">
                                    <span class="material-symbols-outlined">
                                        keyboard_double_arrow_right
                                    </span>
                                    <span>Bài tiếp</span>
                                </button>
                                <button className="btn-lession mr-l-5">
                                    <span>Ẩn bài học</span>
                                </button>
                            </div>
                        </div>
                        <hr className="hr_video" />
                        <div className="connect-lecturers">
                            <h3>Kết Nối Với Giảng Viên</h3>
                            <button className="mr-r-5">Chat Zalo</button>
                            <button className="mr-l-5">Chat Facebook</button>
                        </div>
                    </div>
                    <div className="list-lession_container-video">
                        <div className="header-ll_container-video">
                            <span class="material-symbols-outlined">
                                track_changes
                            </span>
                            <span> Hoàn Thành: 13.23%</span>
                        </div>
                        <div className="content_container-video">
                            <ul className="list-root_video">
                                <li className="name-module_video">
                                    <ul className="list-content-video">
                                        <h3 className="title_list-video">
                                            Module 01: Nhập môn lập trình PHP
                                        </h3>
                                        <li>
                                            <input type="checkbox" />
                                            <a href="">
                                                {" "}
                                                Bài 01: Giới thiệu ngôn ngữ PHP
                                            </a>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <a href="">
                                                {" "}
                                                Bài 02: Lộ trình - Phương pháp
                                                học PHP & MySQL hiệu quả
                                            </a>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <a href="">
                                                {" "}
                                                Bài 03: Cài đặt công cụ - môi
                                                trường cần thiết
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="name-module_video">
                                    <ul className="list-content-video">
                                        <h3 className="title_list-video">
                                            Module 02: Cơ sở dữ liệu và ngôn ngữ
                                            truy vấn SQL
                                        </h3>
                                        <li>
                                            <input type="checkbox" />
                                            <a href="">
                                                {" "}
                                                Bài 01: Giới thiệu ngôn ngữ PHP
                                            </a>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <a href="">
                                                {" "}
                                                Bài 02: Lộ trình - Phương pháp
                                                học PHP & MySQL hiệu quả
                                            </a>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <a href="">
                                                {" "}
                                                Bài 03: Cài đặt công cụ - môi
                                                trường cần thiết
                                            </a>
                                        </li>
                                    </ul>
                                </li>{" "}
                                <li className="name-module_video">
                                    <ul className="list-content-video">
                                        <h3 className="title_list-video">
                                            Module 03: Nhập môn lập trình PHP
                                        </h3>
                                        <li>
                                            <input type="checkbox" />
                                            <a href="">
                                                {" "}
                                                Bài 01: Giới thiệu ngôn ngữ PHP
                                            </a>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <a href="">
                                                {" "}
                                                Bài 02: Lộ trình - Phương pháp
                                                học PHP & MySQL hiệu quả
                                            </a>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <a href="">
                                                {" "}
                                                Bài 03: Cài đặt công cụ - môi
                                                trường cần thiết
                                            </a>
                                        </li>
                                    </ul>
                                </li>{" "}
                                <li className="name-module_video">
                                    <ul className="list-content-video">
                                        <h3 className="title_list-video">
                                            Module 04: Nhập môn lập trình PHP
                                        </h3>
                                        <li>
                                            <input type="checkbox" />
                                            <a href="">
                                                {" "}
                                                Bài 01: Giới thiệu ngôn ngữ PHP
                                            </a>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <a href="">
                                                {" "}
                                                Bài 02: Lộ trình - Phương pháp
                                                học PHP & MySQL hiệu quả
                                            </a>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <a href="">
                                                {" "}
                                                Bài 03: Cài đặt công cụ - môi
                                                trường cần thiết
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-main-view-video container-middle">
                <div className="comment-lession">
                    <h3>Bình Luận</h3>
                    <div className="main-comment">
                        <ReactQuill
                            style={{ minHeight: "500px" }}
                            className="ql-container min-height_500-px ql-editor"
                            theme="snow"
                            // readOnly={true}
                            value={value}
                            onChange={setValue}
                            toolbar="#toolbar"
                            spellCheck={false} // tat kiem tra chinh ta
                        />
                    </div>
                    <div className="submit-comment">
                        <button
                            onClick={() => {
                                setValue("");
                            }}
                        >
                            Gửi
                        </button>
                    </div>
                    <hr className="hr_video" />
                    <div className="list-comment">
                        <h3>0 Bình Luận</h3>
                    </div>
                </div>
            </div>
        </main>
    );
};
