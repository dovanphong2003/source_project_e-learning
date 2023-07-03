import React from "react";
import "../assets/style/stylePageNotFound.css";
import { Link } from "react-router-dom";
export const PageNotFound = () => {
    return (
        <section class="page_404">
            <div class="container containerPageNotFound">
                <div class="row">
                    <div class="col-sm-12 ">
                        <div class="col-sm-10 col-sm-offset-1  text-center">
                            <img
                                className="img-page_not_found"
                                src="/image/pageNotFound.png"
                                alt=""
                            />

                            <div class="contant_box_404">
                                <p>ERORR !</p>
                                <h1 class="h2">Không Tìm Thấy Trang</h1>

                                <Link to="/" class="link_404">
                                    Về Trang Chủ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
