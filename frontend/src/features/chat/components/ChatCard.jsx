import Spinner from "@/components/ui/Spinner";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// Formating Text
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function ChatCard({ provider, model, turns }) {
  const { loading } = useSelector((state) => state.chat);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns]);

  return (
    <div className=" my-5 my-auto p-1 mx-2 flex h-full   flex-col overflow-y-auto rounded-[10px] border border-zinc-800 bg-zinc-900 min-w-[370px] md:max-w-[370px] lg:min-w-[550px]">
      <div className="sticky top-0 z-10 border-b rounded-[10px] border-zinc-800 bg-zinc-950 px-4 py-2">
        <h2 className="font-medium mx-auto text-center"> {model}</h2>
      </div>

      <div className="flex-1 space-y-8 p-4">
        {turns.map((turn, index) => {
          const response = turn.responses?.find((r) => r.provider === provider);

          const isLatestTurn = index === turns.length - 1;

          if (!response) return null;

          return (
            <div key={turn._id}>
              {/* User Prompt */}
              <div className="mb-4 flex justify-end">
                <div className="max-w-[80%] rounded-2xl bg-zinc-800 px-4 py-2 text-sm">{turn.prompt}</div>
              </div>

              {loading.sendMessage && isLatestTurn ? (
                <div className="max-w-[90%] rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                  <Spinner />
                </div>
              ) : response.status === "completed" ? (
                <div className="max-w-[90%] rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-sm">
                  <Markdown rehypePlugins={[rehypeHighlight]}>{response.content}</Markdown>
                </div>
              ) : (
                <div className="max-w-[90%] rounded-xl border border-red-500/30 bg-red-500/10 p-4 ">
                  <p className="font-semibold text-red-400 text-sm">Failed to generate response</p>

                  <p className="mt-2 text-sm text-zinc-400 text-sm">
                    {response.error || "Something went wrong."}
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
