import React from "react";

function Header() {
  return (
    <header className="flex h-16 items-center justify-center border-b border-zinc-800 bg-zinc-950 px-6">
      <h1 className="text-xl font-bold text-violet-500">PromptFlow</h1>
      <div className="flex items-center gap-4">
        <button className="text-zinc-400">🌙</button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white">
          S
        </div>
      </div>
    </header>
  );
}

export default Header;
