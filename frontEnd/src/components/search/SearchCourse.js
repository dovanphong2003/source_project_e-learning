import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../../assets/style/Search/search.css";
import { useEffect } from "react";
import { FilterSearch } from "../filter/FilterSearch";
import { CategoryListCard } from "../../pages/home/CategoryListCard";
export const SearchCourse = () => {
    const [searchParam, changeSearchParam] = useSearchParams();
    const contentSearch = searchParam.get("contentSearch");
    const [sort, setSort] = useState("");
    const [hdfilter, setHdFilter] = useState(false);
    let resultgetSort = searchParam.get("sort");
    if (sort) {
        // switch (sort) {
        //     case "":
        // }
    }
    return (
        <main>
            <div className="main_search">
                <div className="pd-mr">
                    <h1 className="result_search">
                        Kết Quả Tìm Kiếm cho “{contentSearch}”
                    </h1>
                    <div className="result_search-header">
                        <div className="select_input">
                            <div
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
                            </div>
                            <div className="filter_sort-by">
                                <form
                                    className="form_sort-by"
                                    action=""
                                    onChange={(e) => {
                                        e.preventDefault();
                                        changeSearchParam(
                                            `?contentSearch=${contentSearch}&sort=${e.target.value}`
                                        );
                                        setSort(e.target.value);
                                    }}
                                >
                                    <select
                                        className="sort_option"
                                        name="cars"
                                        id="cars"
                                    >
                                        <option value="default">
                                            Mặc Định
                                        </option>
                                        <option value="rateTop">
                                            Xếp Hạng Cao Nhất
                                        </option>
                                        <option value="news">Mới Nhất</option>
                                    </select>
                                </form>
                            </div>
                            <FilterSearch hdfilter={hdfilter} />
                        </div>
                        <div className="result_info">12 Kết quả </div>
                    </div>
                    <div className="container_display-search">
                        <CategoryListCard title="" />
                    </div>
                </div>
            </div>
        </main>
    );
};
