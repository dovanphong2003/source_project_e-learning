import React from "react";
import { DisplayUser } from "./assets/display/DisplayUser";
import { DisplayAdmin } from "./assets/display/DisplayAdmin";
import { useContext } from "react";
import { RoleContext } from "./context/RoleContext";
import AutoScrollTop from "./components/Sections/AutoScrollTop";
// import dotenv from "dotenv";
const App = function () {
    // dotenv.config();
    const { isRole, setUser } = useContext(RoleContext);
    return isRole === "admin" ? (
        <>
            <AutoScrollTop />
            <DisplayAdmin />
        </>
    ) : isRole === "virtualUser" ? (
        <>
            <AutoScrollTop />
            <DisplayUser isVirtualUser="virtualUser" />
        </>
    ) : (
        <>
            <AutoScrollTop />
            <DisplayUser />
        </>
    );
};

export default App;
