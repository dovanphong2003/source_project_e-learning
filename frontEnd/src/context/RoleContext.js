import { createContext, useContext, useState } from "react";
const RoleContext = createContext();
const RoleProvider = ({ children }) => {
    const [isRole, setIsRole] = useState("");
    const [isIdUser, getIdUser] = useState("");
    const [infoUser, getInfoUser] = useState({});
    const [checkVerify, setCheckVerify] = useState(false);
    const setUser = (value) => {
        setIsRole(value);
    };

    return (
        <RoleContext.Provider
            value={{
                isRole,
                isIdUser,
                setUser,
                getIdUser,
                checkVerify,
                setCheckVerify,
                infoUser,
                getInfoUser,
            }}
        >
            {children}
        </RoleContext.Provider>
    );
};
export const useRoleContext = () => {
    const context = useContext(RoleContext);
    return context;
};
export { RoleContext, RoleProvider };
