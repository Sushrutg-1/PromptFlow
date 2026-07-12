import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { PATHS } from "./paths";

function PublicRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Navigate to={PATHS.DASHBOARD} replace /> : <Outlet />;
}

export default PublicRoute;
