import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import useNavigation from "../components/navbar/navHook";
import Tabbar from "../components/navbar/tabbar";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Stock } from "../pages/stock/stock";
import navigationData from "../components/navbar/navArr";

export const LogoutRouter = () => {
  const { currentRoute, setCurrentRoute } = useNavigation();
  return (
    <>
      <div>
        <Navbar
          navigationData={navigationData}
          currentRoute={currentRoute}
          setCurrentRoute={setCurrentRoute}
        />
        <Tabbar
          navigationData={navigationData}
          currentRoute={currentRoute}
          setCurrentRoute={setCurrentRoute}
        />
      </div>
      <Routes>
        <Route path="/" element={<Stock />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
