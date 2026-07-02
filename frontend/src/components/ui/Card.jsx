import React from "react";

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow ${className}`}>
      {children}
    </div>
  );
}

export default Card;
