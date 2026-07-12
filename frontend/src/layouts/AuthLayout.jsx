import Header from "@/components/Landing/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

export default AuthLayout;
