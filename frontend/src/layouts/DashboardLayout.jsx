import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />

        <MainContent />
      </div>
    </div>
  );
}

export default DashboardLayout;
