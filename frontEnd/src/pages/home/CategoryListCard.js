import React from "react";
import { ProductCart } from "../../components/card/ProductCart";
import "../../assets/style/HomePage/contentMain.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useEffect, useState } from "react";

export const CategoryListCard = ({ data, title, checkCourseNew }) => {
    // settime out sleketon
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        if (checkCourseNew) {
            const timer = setTimeout(() => {
                setShowSkeleton(false);
            }, 5000);

            // Clean up the timer on component unmount
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div className="content-main_homePage">
            <h2>{title}</h2>
            {data ? (
                <div className="list-course_best-seller">
                    {data.map((data) => {
                        return <ProductCart data={data} />;
                    })}
                </div>
            ) : showSkeleton ? (
                <>
                    <Skeleton
                        width={"100%"}
                        height={"200px"}
                        duration={2}
                        count={1}
                        className="skeleton-css"
                        baseColor="#faf9ff"
                        highlightColor="#dadada"
                    />
                </>
            ) : (
                !showSkeleton && <p>Hệ thống sẽ sớm cập nhật !...</p>
            )}
        </div>
    );
};
