import React from "react";
import { Navigate } from "react-router-dom";

export default function Logout(props) {
  React.useEffect(() => {
    localStorage.removeItem("token");
    props.onHeaderLinkChange("", "");
    props.deleteEmail();
  }, []);
  return <Navigate to={"/sign-in"} replace />;
}
