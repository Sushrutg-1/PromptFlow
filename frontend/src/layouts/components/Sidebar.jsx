import React from "react";

function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-900 p-4">
      <button className="mb-6 w-full rounded-lg bg-violet-600 py-2 text-white"> + new chat</button>

      <nav className="space-y-2">
        <p className="text-zinc-400">Today</p>
        <div className="rounded-lg p-2 hover:bg-zinc-800">Chat One</div>
        <div className="rounded-lg p-2 hover:bg-zinc-800">Chat Two</div>
      </nav>
    </aside>
  );
}

export default Sidebar;
