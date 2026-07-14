import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({ isOpen, setIsOpen }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <header className="flex justify-between h-20 items-center  border-b border-zinc-800 bg-zinc-950 px-6">
      <div className="flex items-center gap-2">
        <span
          onClick={() => setIsOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M3 6h18" />
            <path d="M3 12h18" />
            <path d="M3 18h18" />
          </svg>
        </span>
        <h2 className="text-lg font-semibold">{user?.name || "User"}'s Workspace</h2>
      </div>
      <div
        onClick={() => {
          navigate("/profile");
        }}
        className="ml-4 flex flex-col align-middle justify-center"
      >
        <img className="h-8 w-8 rounded-full mx-auto" src={user?.avatar} alt="Avatar" />
        <p className="text-sm ">My Profile</p>
      </div>
    </header>
  );
}

export default Header;
