import React from "react";
import { Navigate } from "react-router-dom";
const PublicRouts = (props) => {
  if (!localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PublicRouts;
