import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import { HomePage, NotFoundPage } from "@/pages";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import DashboardLayout from "@/layouts/DashboardLayout";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route path={PATHS.LOGIN} element={<LoginPage />} />
          <Route path={PATHS.SIGNUP} element={<SignupPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path={PATHS.DASHBOARD} element={<h1>Dashboard route</h1>} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
