import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../../assets/style/Search/search.css";
import { useEffect } from "react";
import { FilterSearch } from "../filter/FilterSearch";
import { CategoryListCard } from "../../pages/home/CategoryListCard";
import axios from "axios";
export const SearchCourse = () => {
    const [searchParam, changeSearchParam] = useSearchParams();
    const contentSearch = searchParam.get("contentSearch");
    const [sortCourse, setSort] = useState("");
    const [hdfilter, setHdFilter] = useState(false);
    const [dataSearch, setDataSearch] = useState([false]);
    const getDataSearch = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_URL_BACKEND}/course/getDataSearchAPI?key_word=${contentSearch}`
        );
        if (!response.data.data) {
            setDataSearch([]);
        } else {
            setDataSearch(response.data.data);
        }
    };
    useEffect(() => {
        setDataSearch([false]);
        if (contentSearch) {
            getDataSearch();
        }
    }, [contentSearch]);
    const sortedData =
        dataSearch[0] !== false
            ? dataSearch.slice().sort((a, b) => a.course_id - b.course_id)
            : "";
    return (
        <main>
            <div className="main_search">
                <div className="pd-mr">
                    <h1 className="result_search">
                        Kết Quả Tìm Kiếm cho “{contentSearch}”
                    </h1>
                    <div className="result_search-header">
                        <div className="select_input">
                            {/* <div
                                onClick={() => {
                                    setHdFilter(!hdfilter);
                                }}
                                className="filter_result"
                            >
                                <div className="content_filter">
                                    <span class="icon_arrow_bottom filter_icon material-symbols-outlined">
                                        filter_list
                                    </span>
                                    <span>Filter</span>
                                </div>
                            </div> */}
                            <div className="filter_sort-by">
                                <form
                                    className="form_sort-by"
                                    action=""
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setSort(e.target.value);
                                    }}
                                >
                                    <select
                                        className="sort_option"
                                        name="cars"
                                        id="cars"
                                    >
                                        <option value="default">
                                            Mặc Định ( mới nhất )
                                        </option>
                                        {/* <option value="rateTop">
                                            Xếp Hạng Cao Nhất
                                        </option> */}
                                        <option value="olds">Cũ Nhất</option>
                                    </select>
                                </form>
                            </div>
                            {/* <FilterSearch
                                dataSearch={dataSearch}
                                setDataSearch={setDataSearch}
                                hdfilter={hdfilter}
                            /> */}
                        </div>
                        <div className="result_info">
                            {dataSearch[0] !== false ? dataSearch.length : "0"}{" "}
                            Kết quả{" "}
                        </div>
                    </div>
                    <span
                        className={`${
                            dataSearch.length ? "hidden" : ""
                        } span-result-not-defined`}
                    >
                        <p> Không có kết quả nào cho tìm kiếm trên</p>
                    </span>
                    <div className="container_display-search">
                        {dataSearch[0] === false ? (
                            <>
                                <Skeleton
                                    width={"100%"}
                                    height={"200px"}
                                    duration={2}
                                    count={2}
                                    className="skeleton-css"
                                    baseColor="#faf9ff"
                                    highlightColor="#dadada"
                                />
                                <Skeleton
                                    width={"100%"}
                                    height={"40px"}
                                    duration={2}
                                    count={4}
                                    className="skeleton-css"
                                    baseColor="#faf9ff"
                                    highlightColor="#dadada"
                                />
                            </>
                        ) : dataSearch.length ? (
                            <CategoryListCard
                                title=""
                                data={
                                    sortCourse === "olds"
                                        ? sortedData
                                        : dataSearch
                                }
                            />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};
