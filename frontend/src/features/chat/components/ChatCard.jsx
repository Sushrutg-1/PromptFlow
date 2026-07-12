export default function ChatCard({ provider, model, turns }) {
  return (
    <div className=" m-2 flex h-[550px] min-w-[550px] max-w-[525px] flex-col overflow-y-auto rounded-[10px] border border-zinc-800 bg-zinc-900">
      <div className="sticky top-0 z-10 border-b rounded-[10px] border-zinc-800 bg-zinc-950 p-4">
        <h2 className="font-medium"> {model}</h2>
      </div>

      <div className="flex-1 space-y-8 p-4">
        {turns.map((turn) => {
          const response = turn.responses?.find((r) => r.provider === provider);

          if (!response) return null;

          return (
            <div key={turn._id}>
              {/* User Prompt */}
              <div className="mb-4 flex justify-end">
                <div className="max-w-[80%] rounded-2xl bg-zinc-800 px-4 py-2">{turn.prompt}</div>
              </div>

              {/* AI Response */}
              {response.status === "completed" ? (
                <div className="whitespace-pre-wrap break-all max-w-[90%] rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm transition-colors hover:border-zinc-700  text-white">
                  {response.content}
                </div>
              ) : (
                <div className="rounded-xl whitespace-pre-wrap break-all border max-w-[90%] border-red-500/30 bg-red-500/10 p-4">
                  <p className="font-semibold text-red-400 whitespace-pre-wrap">
                    Failed to generate response
                  </p>

                  <p className="mt-2 whitespace-pre-wrap break-alltext-sm text-zinc-400">
                    {response.error || "Something went wrong."}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
