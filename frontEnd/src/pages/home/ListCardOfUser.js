import React from "react";
import { ProductCart } from "../../components/card/ProductCart";
import "../../assets/style/HomePage/contentMain.css";
export const ListCardOfUser = ({ data }) => {
    return (
        <div className="content-main_homePage">
            <div className="list-course_best-seller">
                {data &&
                    data.map((el) => {
                        return <ProductCart courseHaveBuy={true} data={el} />;
                    })}
            </div>
        </div>
    );
};
