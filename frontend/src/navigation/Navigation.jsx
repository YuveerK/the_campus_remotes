import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Sidebar from "../Sidebar";

const Navigation = () => {
  return (
    <div className="w-full flex h-screen">
      <Sidebar />
      <div className="overflow-auto w-full h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default Navigation;
