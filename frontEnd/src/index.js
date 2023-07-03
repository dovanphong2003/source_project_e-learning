import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext";
import { AccessProvider } from "./context/AccessToken";
import { CreateCourseDataProvider } from "./context/CreateCourseData";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <RoleProvider>
                <CreateCourseDataProvider>
                    <AccessProvider>
                        <App />
                    </AccessProvider>
                </CreateCourseDataProvider>
            </RoleProvider>
        </BrowserRouter>
    </React.StrictMode>
);
