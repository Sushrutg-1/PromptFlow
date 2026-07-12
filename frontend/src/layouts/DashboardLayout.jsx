import React from "react";
import Sidebar from "../features/chat/components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex h-screen text-white">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />

        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
