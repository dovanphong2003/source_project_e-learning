import React from "react";
import { Header } from "../../components/Layout/Header";
import { AllRoute } from "../../routers/AllRoute";
import { Footer } from "../../components/Layout/Footer";
export const DisplayUser = ({ isVirtualUser }) => {
    return (
        <>
            <Header setUser={isVirtualUser} />
            <AllRoute />
            <Footer />
        </>
    );
};
