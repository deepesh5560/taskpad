import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../views/components/Home";
import Cateogory from "../views/components/Cateogory";
import Navbar from "../views/components/navbar";
const AuthenticatedRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Cateogory />} />
        <Route path="/Cateogory/:name/:id" element={<Home />} />
        <Route path="*" element={<Cateogory />} />
      </Routes>
    </>
  );
};

export default AuthenticatedRoutes;
