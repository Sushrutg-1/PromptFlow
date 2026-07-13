import React from "react";
import { SyncLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="flex h-full items-center justify-center">
      <SyncLoader size={2} color="#fff" />
    </div>
  );
}

export default Spinner;
