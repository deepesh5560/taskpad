import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthenticatedRoutes from "./authenticatedRoutes";
import AuthenticationRoutes from "./authenticationRoutes";

const IndexRoutes = () => {
  const Token = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        {Token ? <AuthenticatedRoutes /> : <AuthenticationRoutes />}
      </BrowserRouter>
    </>
  );
};

export default IndexRoutes;
