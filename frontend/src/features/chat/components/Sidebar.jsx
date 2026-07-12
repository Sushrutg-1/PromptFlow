import React, { useEffect } from "react";
import Logo from "@/assets/logos/logo-horizontal.svg";
import { Button, Input } from "@/components";
import {
  createNewConversation,
  getAllConversations,
  getConversation,
} from "@/features/chat/chat.thunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allConversations } = useSelector((state) => state.chat);

  const [isOpen, setIsOpen] = React.useState(false);

  const handleCreateNewConversation = async () => {
    try {
      const response = await dispatch(createNewConversation()).unwrap();
      navigate(`/chat/${response.data._id}`);
    } catch (error) {
      // console.error("Error creating new conversation: ", error);
    }
  };

  const handleClickOnConversation = (conversationId) => {
    dispatch(getConversation(conversationId));
    navigate(`/chat/${conversationId}`);
  };

  useEffect(() => {
    dispatch(getAllConversations());
  }, [dispatch]);

  return (
    <aside className="w-70 border-r border-zinc-800 bg-zinc-900 p-4 flex flex-col gap-4">
      <div className="flex justify-center text-center align-middle">
        <img src={Logo} alt="" />{" "}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-zinc-800"
        >
          <div className="relative h-5 w-5">
            <span
              className={`absolute left-0 top-1 h-0.5 w-5 bg-current transition-all ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2.5 h-0.5 w-5 bg-current transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition-all ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>
      <div className="border-b pb-2">
        <div>
          <Button onClick={handleCreateNewConversation} className="w-full mb-2">
            New Conversation
          </Button>
        </div>
        <Input placeholder="Search conversations..." />
      </div>

      <h3 className="text-center font-bold">History</h3>
      <div className="flex-1 overflow-y-auto">
        <ul>
          {allConversations &&
            allConversations.length > 0 &&
            allConversations.map((conv) => (
              <li
                className="p-2 bg-zinc-800  rounded mb-1.5"
                key={conv._id}
                onClick={(e) => {
                  handleClickOnConversation(conv._id);
                }}
              >
                {conv.title}
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
