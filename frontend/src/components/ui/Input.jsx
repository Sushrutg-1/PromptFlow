import React from "react";

function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white outline-none focus:border-violet-500 ${className}`}
      {...props}
    />
  );
}

export default Input;
