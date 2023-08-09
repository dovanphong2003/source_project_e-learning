import React, { useState } from "react";
import { DisplayUser } from "./assets/display/DisplayUser";
import { DisplayAdmin } from "./assets/display/DisplayAdmin";
import AutoScrollTop from "./components/Sections/AutoScrollTop";
const App = function () {
    const [roleUser, setRoleUser] = useState("student");
    console.log("xac dinh role");
    return (localStorage.getItem("role") &&
        localStorage.getItem("role") === "admin") ||
        roleUser === "admin" ? (
        <>
            <AutoScrollTop />
            <DisplayAdmin setRoleUser={setRoleUser} />
        </>
    ) : (localStorage.getItem("role") &&
          localStorage.getItem("role") === "virtualUser") ||
      roleUser === "virtualUser" ? (
        <>
            <AutoScrollTop />
            <DisplayUser
                isVirtualUser="virtualUser"
                setRoleUser={setRoleUser}
            />
        </>
    ) : (
        <>
            <AutoScrollTop />
            <DisplayUser setRoleUser={setRoleUser} />
        </>
    );
};

export default App;
