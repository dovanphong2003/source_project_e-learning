import React from "react";
import { Header } from "../../components/Layout/Header";
import { AllRoute } from "../../routers/AllRoute";
import { Footer } from "../../components/Layout/Footer";
export const DisplayUser = ({ isVirtualUser, setRoleUser }) => {
    return (
        <>
            <Header setUser={isVirtualUser} setRoleUser={setRoleUser} />
            <AllRoute setRoleUser={setRoleUser} />
            <Footer />
        </>
    );
};
