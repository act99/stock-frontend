import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Stock } from "../pages/stock";

export const LogoutRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Stock />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
