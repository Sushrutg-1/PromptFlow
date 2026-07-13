import { useSelector } from "react-redux";
import ChatCard from "./ChatCard";

function MessageBox() {
  const { currentConversation, selectedModels } = useSelector((state) => state.chat);

  const turns = currentConversation?.turns ?? [];

  if (!currentConversation) {
    return null;
  }

  if (turns.length === 0) {
    return (
      <section className="flex-1 overflow-hidden justify-center text-center align-middle">
        <div className="flex flex-col items-center justify-center p-4 align-middle">
          {" "}
          <span className="flex items-center justify-center rounded-full p-2 hover:bg-zinc-800 inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-zinc-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3l4 4-4 4" />
              <path d="M3 7h18" />
              <path d="M7 21l-4-4 4-4" />
              <path d="M21 17H3" />
            </svg>
          </span>
          <p>Your comparison will appear here.</p>
          <p>Type a prompt below to see every model answer at once.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 overflow-hidden mb-2 rounded-2xl">
      <div className="flex h-full overflow-x-auto overflow-y-hidden rounded-2xl">
        {selectedModels.map((selected) => (
          <ChatCard
            key={selected.provider}
            provider={selected.provider}
            model={selected.model}
            turns={currentConversation?.turns || []}
          />
        ))}
      </div>
    </section>
  );
}

export default MessageBox;
