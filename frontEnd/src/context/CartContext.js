import { createContext, useContext, useState } from "react";
const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cartOrigin, setCartOrigin] = useState([]);
    const addItemToCart = (item) => {
        setCartOrigin(cartOrigin.push(item));
    };
    const deleteItemToCart = (itemDelete) => {
        setCartOrigin(
            cartOrigin.filter((item) => item.course_id != itemDelete)
        );
    };
    const fncSetCartOrigin = (cartNew) => {
        setCartOrigin(cartNew);
    };
    return (
        <CartContext.Provider
            value={{
                cartOrigin,
                addItemToCart,
                deleteItemToCart,
                fncSetCartOrigin,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
export const useRoleContext = () => {
    const context = useContext(CartContext);
    return context;
};
export { CartContext, CartProvider };
