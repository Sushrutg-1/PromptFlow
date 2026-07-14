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

        <div className="flex flex-col gap-2 my-auto">
          <Button onClick={() => setShowModels(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="4" y1="7" x2="16" y2="7" />
              <circle cx="18" cy="7" r="2.5" />
              <circle cx="8" cy="17" r="2.5" />
              <line x1="10.5" y1="17" x2="20" y2="17" />
            </svg>
          </Button>

          <Button
            className="disabled:cursor-not-allowed disabled:opacity-50 "
            disabled={prompt.trim() === ""}
            onClick={handleSend}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 3L3 10.5L10 13L13 20L21 3Z" />
                <path d="M10 13L21 3" />
              </svg>
            </span>
          </Button>
        </div>
      </div>

      <ModelPreferencesModal open={showModels} onClose={() => setShowModels(false)} />
    </>
  );
}

export default PromptInput;
