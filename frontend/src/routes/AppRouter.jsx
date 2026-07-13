import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import { LandingPage, NotFoundPage } from "@/pages";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardPage from "@/features/chat/pages/DashboardPage";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "@/features/profile/pages/ProfilePage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={PATHS.HOME} element={<LandingPage />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={PATHS.LOGIN} element={<LoginPage />} />
            <Route path={PATHS.SIGNUP} element={<SignupPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={PATHS.DASHBOARD} element={<DashboardPage />} />
            <Route path={"/chat"} element={<DashboardPage />} />
            <Route path={"/chat/:conversationId"} element={<DashboardPage />} />
            <Route path={"/profile"} element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
