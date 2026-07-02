import { useAppSelector } from "@/app/hooks";
import React from "react";
import MessageList from "./MessageList";

function EmptyWorkspace() {
  const { mesasges } = useAppSelector((state) => state.chat);

  {
    mesasges.length === 0 ? (
      <div className="flex flex-1 items-center justify-between">
        <div className="text-center">
          <h1 className="font-bold text-4xl text-white">PromptFlow</h1>
          <p className="mt-3 text-zinc-400"> Compare multiple AI models with one prompt.</p>
        </div>
      </div>
    ) : (
      <MessageList />
    );
  }
}

export default EmptyWorkspace;
