import React from "react";
import EmptyWorkspace from "../components/EmptyWorkspace";
import PromptInput from "../components/PromptInput";

function DashboardPage() {
  return (
    <div className="flex h-full flex-col">
      <EmptyWorkspace />

      <PromptInput />
    </div>
  );
}

export default DashboardPage;
