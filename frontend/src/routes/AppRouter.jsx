import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import { HomePage, NotFoundPage } from "@/pages";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<HomePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
