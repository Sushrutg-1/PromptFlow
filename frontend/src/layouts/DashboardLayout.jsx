import React from "react";
import Sidebar from "../features/chat/components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <div className="flex h-screen text-white">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
