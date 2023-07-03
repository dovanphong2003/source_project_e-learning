import { createContext, useContext, useState } from "react";
const RoleContext = createContext();
const RoleProvider = ({ children }) => {
    const [isRole, setIsRole] = useState("");
    const setUser = (value) => {
        setIsRole(value);
    };

    return (
        <RoleContext.Provider value={{ isRole, setUser }}>
            {children}
        </RoleContext.Provider>
    );
};
export const useRoleContext = () => {
    const context = useContext(RoleContext);
    return context;
};
export { RoleContext, RoleProvider };
