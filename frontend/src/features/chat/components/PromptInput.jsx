import { useAppDispatch } from "@/app/hooks";
import { Button } from "@/components";
import React, { useState } from "react";
import { addMessage } from "../chatSlice";

function PromptInput() {
  const { prompt, setPrompt } = useState("");

  const dispatch = useAppDispatch();

  const handleSend = () => {
    if (!prompt.trim()) return;

    dispatch(addMessage({ id: Date.now(), role: "user", content: prompt }));

    setPrompt("");
  };

  return (
    <div className="boder-t border-zinc-800 p-6">
      <div className="flex gap-3">
        <textarea
          rows={3}
          placeholder="Ask Anything..."
          className="flex-1 resize-none rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}

export default PromptInput;
