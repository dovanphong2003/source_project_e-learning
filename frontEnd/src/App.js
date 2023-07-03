import { useState } from "react";
import { HeaderAdmin } from "./components/Layout/HeaderAdmin";
import { DisplayUser } from "./assets/display/DisplayUser";
import { DisplayAdmin } from "./assets/display/DisplayAdmin";
import { useContext } from "react";
import { RoleContext } from "./context/RoleContext";
function App() {
    const { isRole, setUser } = useContext(RoleContext);
    return isRole === "admin" ? (
        <DisplayAdmin />
    ) : isRole === "virtualUser" ? (
        <DisplayUser isVirtualUser="virtualUser" />
    ) : (
        <DisplayUser />
    );
}

export default App;
