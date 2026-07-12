import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "./paths";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserThunk } from "@/features/auth/auth.thunks";

export default function ProtectedRoute() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, [dispatch]);

  const { isAuthenticated, isInitializing } = useSelector((state) => state.auth);

  if (isInitializing) {
    return <section>Loading...</section>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={PATHS.LOGIN} replace />;
}
