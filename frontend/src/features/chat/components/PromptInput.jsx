import { Button } from "@/components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModelPreferencesModal from "./ModelPreferencesModal";
import { useParams } from "react-router-dom";
import { sendMessageThunk } from "../chat.thunks";

function PromptInput() {
  const [prompt, setPrompt] = useState("");

  const [showModels, setShowModels] = useState(false);

  const { conversationId } = useParams();

  const dispatch = useDispatch();

  const { selectedModels } = useSelector((state) => state.chat);

  const handleSend = () => {
    if (!prompt.trim()) return;

    dispatch(
      sendMessageThunk({
        conversationId,
        payload: {
          prompt: prompt,
          activeModels: selectedModels,
        },
      })
    );

    setPrompt("");
  };

  return (
    <>
      <div className="flex border-t border-zinc-800 p-3">
        <div className="mr-3 flex w-full items-end gap-3">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-violet-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={() => setShowModels(true)}>Models</Button>

          <Button
            className="disabled:cursor-not-allowed disabled:opacity-50"
            disabled={prompt.trim() === ""}
            onClick={handleSend}
          >
            Send
          </Button>
        </div>
      </div>

      <ModelPreferencesModal open={showModels} onClose={() => setShowModels(false)} />
    </>
  );
}

export default PromptInput;
