import React from "react";

function Button({ children, variant = "primary", type = "button", className = " ", ...props }) {
  const variants = {
    primary: "bg-violet-600 hover:bg-violet-700 text-white",
    secondary: "bg-zinc-800 hover:bg-zinc-900 text-white",
    outline: "border border-zinc-700 hover:bg-zinc-900 text-white",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors ${className}  ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
