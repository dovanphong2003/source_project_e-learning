import React from "react";
import { createContext, useContext, useState } from "react";
const CreateCourseData = createContext();
const CreateCourseDataProvider = ({ children }) => {
    const [isData, setIsData] = useState({
        title_name: "",
        description: "",
        category: "",
        level: "",
        instructor: "",
        price: "",
        result_course: "",
        url_course: "",
        image_course: null,
    });
    const setTitle_name = (value) => {
        setIsData({ ...isData, title_name: value });
    };
    const setDescripton = (value) => {
        setIsData({ ...isData, description: value });
    };
    const setCategory = (value) => {
        setIsData({ ...isData, category: value });
    };
    const setLevel = (value) => {
        setIsData({ ...isData, level: value });
    };
    const setInstructor = (value) => {
        setIsData({ ...isData, instructor: value });
    };
    const setPrice = (value) => {
        setIsData({ ...isData, price: value });
    };
    const setResult_course = (value) => {
        setIsData({ ...isData, result_course: value });
    };
    const setUrl_course = (value) => {
        setIsData({ ...isData, url_course: value });
    };
    const setImage_course = (value) => {
        setIsData({ ...isData, image_course: value });
    };
    const resest_formCourse = () => {
        setIsData({
            title_name: "",
            description: "",
            category: "",
            level: "",
            instructor: "",
            price: "",
            result_course: "",
            url_course: "",
            image_course: null,
        });
    };

    return (
        <CreateCourseData.Provider
            value={{
                isData,
                setTitle_name,
                setDescripton,
                setCategory,
                setLevel,
                setInstructor,
                setPrice,
                setResult_course,
                setUrl_course,
                setImage_course,
                resest_formCourse,
            }}
        >
            {children}
        </CreateCourseData.Provider>
    );
};
export const useCreateCourseDataContext = () => {
    const context = useContext(CreateCourseData);
    return context;
};
export { CreateCourseData, CreateCourseDataProvider };
