import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../views/auth/signIn";
import SignUp from "../views/auth/signup";
const AuthenticationRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default AuthenticationRoutes;
