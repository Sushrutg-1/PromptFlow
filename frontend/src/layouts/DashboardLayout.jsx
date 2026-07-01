import React from "react";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <main className=" min-h-screen  bg-zinc-950 text-white">
      <Outlet />
    </main>
  );
}

export default DashboardLayout;
