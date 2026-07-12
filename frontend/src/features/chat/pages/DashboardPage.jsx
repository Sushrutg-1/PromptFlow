import { useDispatch, useSelector } from "react-redux";
import { createNewConversation } from "../chat.thunks";
import { useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import PromptInput from "../components/PromptInput";

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  const handleCreateNewConversation = async () => {
    try {
      const response = await dispatch(createNewConversation()).unwrap();
      navigate(`/chat/${response.data._id}`);
    } catch (error) {}
  };

  if (!currentConversation) {
    return (
      <section className="flex h-full flex-col justify-around overflow-hidden p-5 text-center">
        <div>
          <h1 className="mb-3 text-4xl font-bold">
            Hi {user?.name || "User"}, 👋
          </h1>

          <p className="text-lg">
            Compare answers from multiple AI models.
          </p>
        </div>

        <div className="flex justify-center">
          <div
            onClick={handleCreateNewConversation}
            className="cursor-pointer rounded-2xl bg-zinc-800 px-14 py-7 transition hover:bg-zinc-700"
          >
            <div className="flex flex-col items-center">
              <span className="rounded-full bg-zinc-700 p-3">
                <svg
                  className="h-10 w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </span>

              <p className="mt-3 font-medium">
                New Conversation
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold">
            Your Models
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-green-400">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
              Gemini 2.5 Flash
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-green-400">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
              Llama 3.3 70B
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-amber-400">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
              Claude Coming Soon
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-full flex-col justify-between overflow-hidden">
      <MessageBox />

      <PromptInput />
    </section>
  );
}

export default DashboardPage;