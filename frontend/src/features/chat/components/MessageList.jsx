import { useAppSelector } from "@/app/hooks";
import React from "react";

function MessageList() {
  const { messages } = useAppSelector((state) => state.chat);

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="rounded-lg bg-zinc-900 text-white p-4">
          {message.content}
        </div>
      ))}
    </div>
  );
}

export default MessageList;
