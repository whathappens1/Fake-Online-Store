import React from "react";
import { Navigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

function index() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Money Flow - Welcome</title>
      </Helmet>
      <div>
        <Navigate to="/Home" replace={true} />
      </div>
    </HelmetProvider>
  );
}

export default index;
