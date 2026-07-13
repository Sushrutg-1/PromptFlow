import React from "react";
import { PacmanLoader } from "react-spinners";

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <PacmanLoader color="#5832b8" margin={10} size={50} />
    </div>
  );
}

export default FullScreenLoader;
