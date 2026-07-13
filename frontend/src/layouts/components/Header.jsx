import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <header className="flex justify-between h-20 items-center  border-b border-zinc-800 bg-zinc-950 px-6">
      <div>
        <h2 className="text-lg font-semibold">{user?.name || "User"}'s Workspace</h2>
      </div>
      <div
        onClick={() => {
          navigate("/profile");
        }}
        className="ml-4 flex flex-col align-middle"
      >
        <img className="h-8 w-8 rounded-full" src={user?.avatar} alt="Avatar" />
        <p className="text-sm ">My Profile</p>
      </div>
    </header>
  );
}

export default Header;
