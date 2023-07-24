import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// import './components/styles.css'
// import './components/Home/homePage.css'
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root"));
