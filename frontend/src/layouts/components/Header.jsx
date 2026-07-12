import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="flex justify-between h-16 items-center  border-b border-zinc-800 bg-zinc-950 px-6">
      <div>
        <h2 className="text-lg font-semibold">{user?.name || "User"}'s Workspace</h2>
      </div>
      <div className="ml-4">
        <img className="h-8 w-8 rounded-full" src={user?.avatar} alt="Avatar" />
      </div>
    </header>
  );
}

export default Header;
