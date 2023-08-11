import React, { useState } from "react";
import star from "../../assets/image/star.png";
import "../../assets/style/Search/filterSearch.css";
import star_no from "../../assets/image/star-no.png";
import axios from "axios";
export const FilterSearch = ({ hdfilter, dataSearch, setDataSearch }) => {
    const [ratingEx, setRatingEx] = useState(false);
    const [topicEx, setTopicEx] = useState(false);
    const [rotato2, setRotato2] = useState(false);
    const [checkRating, setCheckRating] = useState("");
    const [checkTopic, setCheckTopic] = useState("");
    const [dataCategory, setDataCategory] = useState([]);
    const handleCategory = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL_BACKEND}/category/getCategoryAPI`
            );
            setDataCategory(response.data.data);
        } catch (error) {}
    };
    return (
        <div className={`${hdfilter ? "" : "hidden"} filter_specifically`}>
            {/* <div className="block_filter-child">
                <div className="header_block_filter-child">
                    <h2 className="filter-rating">Đánh Giá </h2>
                    <span
                        onClick={(e) => {
                            e.preventDefault();
                            setRatingEx(!ratingEx);
                            setRotato1(!rotato1);
                        }}
                        class={`${
                            rotato1 ? "rotate-effect2" : "rotate-effect"
                        } material-symbols-outlined`}
                    >
                        expand_less
                    </span>
                </div>
                <div className={`${ratingEx ? "" : "hidden"} all_rating`}>
                    <form
                        onChange={(e) => {
                            const value =
                                document.getElementsByName("select-rating");
                            const result = Array.from(value).filter(
                                (element) => {
                                    return element.checked === true;
                                }
                            );
                            if (result) {
                                setCheckRating(result[0].id);
                            }
                        }}
                        action=""
                    >
                        <div className="block_select-rating">
                            <input
                                id="select-rating5"
                                className="select-rating_input"
                                type="radio"
                                name="select-rating"
                            />
                            <div className="list-star">
                                <img src={star} alt="" className="star" />
                                <img src={star} alt="" className="star" />
                                <img src={star} alt="" className="star" />
                                <img src={star} alt="" className="star" />
                                <img src={star} alt="" className="star" />
                            </div>
                        </div>
                        <div className="block_select-rating">
                            <input
                                id="select-rating4"
                                className="select-rating_input"
                                type="radio"
                                name="select-rating"
                            />
                            <div className="list-star">
                                <img src={star} alt="" className="star" />
                                <img src={star} alt="" className="star" />
                                <img src={star} alt="" className="star" />
                                <img src={star} alt="" className="star" />
                                <img src={star_no} alt="" className="star" />
                            </div>
                        </div>
                        <div className="block_select-rating">
                            <input
                                id="select-rating3"
                                className="select-rating_input"
                                type="radio"
                                name="select-rating"
                            />
                            <div className="list-star">
                                <img src={star} alt="" className="star" />
                                <img src={star} alt="" className="star" />
                                <img src={star} alt="" className="star" />
                                <img src={star_no} alt="" className="star" />
                                <img src={star_no} alt="" className="star" />
                            </div>
                        </div>
                        <div className="block_select-rating">
                            <input
                                id="select-rating2"
                                className="select-rating_input"
                                type="radio"
                                name="select-rating"
                            />
                            <div className="list-star">
                                <img src={star} alt="" className="star" />
                                <img src={star} alt="" className="star" />
                                <img src={star_no} alt="" className="star" />
                                <img src={star_no} alt="" className="star" />
                                <img src={star_no} alt="" className="star" />
                            </div>
                        </div>
                        <div className="block_select-rating">
                            <input
                                id="select-rating1"
                                className="select-rating_input"
                                type="radio"
                                name="select-rating"
                            />
                            <div className="list-star">
                                <img src={star} alt="" className="star" />
                                <img src={star_no} alt="" className="star" />
                                <img src={star_no} alt="" className="star" />
                                <img src={star_no} alt="" className="star" />
                                <img src={star_no} alt="" className="star" />
                            </div>
                        </div>
                    </form>
                </div>
            </div> */}
            <hr className="hr-filter" />
            <div className="block_filter-child">
                <div className="header_block_filter-child">
                    <h2 className="filter-rating">Chủ Đề </h2>
                    <span
                        onClick={(e) => {
                            e.preventDefault();
                            setTopicEx(!topicEx);
                            setRotato2(!rotato2);
                        }}
                        class={`${
                            rotato2 ? "rotate-effect2" : "rotate-effect"
                        } material-symbols-outlined`}
                    >
                        expand_less
                    </span>
                </div>
                <div
                    onChange={(e) => {
                        const value = document.getElementsByName("select-list");
                        const result = Array.from(value).filter((element) => {
                            return element.checked === true;
                        });
                        if (result) {
                            setCheckTopic(result[0].value);
                        }
                    }}
                    className={`${topicEx ? "" : "hidden"} all_rating`}
                >
                    <div className="block_select-rating">
                        <input
                            id="select-list1"
                            className="select-rating_input"
                            type="radio"
                            name="select-list"
                            value="deverloper"
                        />
                        <label htmlFor="select-list1" className="list-topic">
                            Lập Trình
                        </label>
                    </div>
                    <div className="block_select-rating">
                        <input
                            id="select-list2"
                            className="select-rating_input"
                            type="radio"
                            name="select-list"
                            value="infTech"
                        />
                        <label htmlFor="select-list2" className="list-topic">
                            Công Nghệ Thông Tin
                        </label>
                    </div>
                    <div className="block_select-rating">
                        <input
                            id="select-list3"
                            className="select-rating_input"
                            type="radio"
                            name="select-list"
                            value="math"
                        />
                        <label htmlFor="select-list3" className="list-topic">
                            Toán Học
                        </label>
                    </div>
                </div>
            </div>
            <hr className="hr-filter" />
            <div className="resest-filter">
                <button
                    onClick={(e) => {
                        const value = document.getElementsByName("select-list");
                        Array.from(value).map((el) => {
                            el.checked = false;
                        });
                        const value2 =
                            document.getElementsByName("select-rating");
                        Array.from(value2).map((el) => {
                            el.checked = false;
                        });
                        setCheckRating("");
                        setCheckTopic("");
                    }}
                >
                    Đặt Lại Filter
                </button>
            </div>
        </div>
    );
};
