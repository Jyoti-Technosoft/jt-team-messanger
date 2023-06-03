import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ContextProvider } from "./component/Context/Context.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./component/Register/Register.jsx";
import Login from "./component/Login/Login.jsx";
import ProtectedRoute from "./component/Util/ProtectedRoute.jsx";
import ErrorPage from "./component/ErrorPage/ErrorPAge.jsx";
import "./index.css";
import NoChatSelected from "./component/NoChatSelected/NoChatSelected.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>

        <Route path="*" element={<ErrorPage />} />
        <Route path="" element={<Navigate to="/login" />} />
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="chat" element={
            <ProtectedRoute>
              <NoChatSelected />
            </ProtectedRoute>
          } />
          <Route path="chat/*" element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  </ContextProvider>
);
