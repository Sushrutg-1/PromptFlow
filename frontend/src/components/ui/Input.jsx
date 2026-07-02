import React from "react";

function Input({ className = "", label, ...props }) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-zinc-300">{label}</label>}
      <input
        className={`w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white outline-none focus:border-violet-500 ${className}`}
        {...props}
      />
    </div>
  );
}

export default Input;
