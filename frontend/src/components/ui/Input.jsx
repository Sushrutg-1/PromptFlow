import { forwardRef } from "react";

function Input({ className = "", label, error, ...props }, ref) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}{" "}
      <input
        ref={ref}
        className={`w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white outline-none focus:border-violet-500 ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default forwardRef(Input);
