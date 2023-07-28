import React, { createContext, useContext, useState } from "react";
const accessToken = createContext();
const AccessProvider = ({ children }) => {
    const [isAccess, setIsAccess] = useState("");
    const getIsAccess = (value) => {
        setIsAccess(value);
    };

    return (
        <accessToken.Provider value={{ isAccess, getIsAccess }}>
            {children}
        </accessToken.Provider>
    );
};
export const useRoleContext = () => {
    const context = useContext(accessToken);
    return context;
};
export { accessToken, AccessProvider };
