import React from "react";
import { Outlet } from "react-router-dom";

function MainContent() {
  return (
    <main className="flex-1 overflow-auto bg-zinc-950 p-6">
      <Outlet />
    </main>
  );
}

export default MainContent;
