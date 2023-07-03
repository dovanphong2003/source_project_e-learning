import React from "react";
import "../../assets/style/loadingStyle.css";
export const Loading = ({ hd }) => {
    return (
        <div className={`${hd ? "hidden" : ""} box-modal-loading`}>
            <div className="box-loading">
                <div class="breeding-rhombus-spinner">
                    <div class="rhombus child-1"></div>
                    <div class="rhombus child-2"></div>
                    <div class="rhombus child-3"></div>
                    <div class="rhombus child-4"></div>
                    <div class="rhombus child-5"></div>
                    <div class="rhombus child-6"></div>
                    <div class="rhombus child-7"></div>
                    <div class="rhombus child-8"></div>
                    <div class="rhombus big"></div>
                </div>
            </div>
        </div>
    );
};
