import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext";
import { AccessProvider } from "./context/AccessToken";
import { CreateCourseDataProvider } from "./context/CreateCourseData";
import { CartProvider } from "./context/CartContext";
import "react-loading-skeleton/dist/skeleton.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <RoleProvider>
                <CartProvider>
                    <CreateCourseDataProvider>
                        <AccessProvider>
                            <App />
                        </AccessProvider>
                    </CreateCourseDataProvider>
                </CartProvider>
            </RoleProvider>
        </BrowserRouter>
    </React.StrictMode>
);
