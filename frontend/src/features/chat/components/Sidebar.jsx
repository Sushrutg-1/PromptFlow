import React, { useEffect, useState } from "react";
import Logo from "@/assets/logos/logo-horizontal.svg";
import { Button, Input } from "@/components";
import {
  createNewConversation,
  deleteConversationThunk,
  getAllConversations,
  getConversation,
  renameConversationThunk,
} from "@/features/chat/chat.thunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/ui/Spinner";

function Sidebar({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allConversations, currentConversation } = useSelector((state) => state.chat);

  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");

  const [moreModalOpen, setMoreModalOpen] = React.useState(null);

  const { loading } = useSelector((state) => state.chat);

  const [searchTerm, setSearchTerm] = React.useState("");

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
    setIsOpen(false);
  };

  const handleRenameClick = (conversation) => {
    setEditingId(conversation._id);
    setTitle(conversation.title);
    setMoreModalOpen(null);
  };

  const handleRenameConversation = async (conversationId) => {
    // Implementation for renaming conversation
    const result = await dispatch(renameConversationThunk({ id: conversationId, title }));
    if (renameConversationThunk.fulfilled.match(result)) {
      setEditingId(null);
      setTitle("");
      dispatch(getAllConversations());
    }
  };

  const handleDeleteConversation = async (conversationId) => {
    const result = await dispatch(deleteConversationThunk(conversationId));

    if (deleteConversationThunk.fulfilled.match(result)) {
      setMoreModalOpen(null);
      navigate("/chat");
      dispatch(getAllConversations());
    }
  };

  useEffect(() => {
    dispatch(getAllConversations());
  }, [dispatch, navigate]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 " onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={`
    fixed inset-y-0 left-0 z-50
    flex flex-col
    w-72
    border-r border-zinc-800
    bg-zinc-900
    p-4
    transition-transform duration-300



    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <div className="flex items-center justify-between">
          <img src={Logo} alt="" />{" "}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-800 "
          >
            <div className="relative h-5 w-5 ">
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
          <Input
            placeholder="Search conversations..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <div className="mt-3 max-h-110 overflow-y-auto rounded-lg border border-zinc-800">
              <h3 className="sticky top-0 bg-zinc-900 p-2 text-center font-bold">Search Results</h3>
              <ul>
                {allConversations &&
                  allConversations.length > 0 &&
                  allConversations
                    .filter((conv) => conv.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((conv) => (
                      <li
                        className={`p-2 rounded mb-1.5 flex justify-between ${currentConversation?._id === conv._id ? "bg-violet-500" : "bg-zinc-800 hover:bg-zinc-700"}`}
                        key={conv._id}
                        onClick={() => {
                          handleClickOnConversation(conv._id);
                        }}
                      >
                        {editingId === conv._id ? (
                          <Input
                            value={title}
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleRenameConversation(conv._id);
                              }

                              if (e.key === "Escape") {
                                setEditingId(null);
                              }
                            }}
                            onBlur={() => handleRenameConversation(conv._id)}
                          />
                        ) : (
                          <span>{conv.title}</span>
                        )}
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setMoreModalOpen((prev) => (prev === conv._id ? null : conv._id));
                            }}
                            className="rounded-md p-1 hover:bg-zinc-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              width="20"
                              height="20"
                            >
                              <circle cx="5" cy="12" r="2" />
                              <circle cx="12" cy="12" r="2" />
                              <circle cx="19" cy="12" r="2" />
                            </svg>
                          </button>

                          {moreModalOpen === conv._id && (
                            <div className="absolute right-0  top-10 z-50 w-52 rounded-xl border border-zinc-700 bg-zinc-800 py-2 shadow-xl">
                              <p className="px-4 py-2 w-full text-right ">
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setMoreModalOpen(null);
                                  }}
                                  className="rounded bg-zinc-800 hover:bg-zinc-900 p-2"
                                >
                                  {" "}
                                  ❌
                                </span>
                              </p>

                              <button
                                className="flex w-full items-center px-4 py-2 text-left hover:bg-zinc-700"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRenameClick(conv);
                                }}
                              >
                                Rename Conversation
                              </button>

                              <button
                                className="flex w-full items-center px-4 py-2 text-left text-red-400 hover:bg-red-500/10"

                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteConversation(conv._id);
                                }}
                              >
                                Delete Conversation
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
          )}
        </div>

        {!searchTerm && (
          <div className="flex-1 overflow-y-auto">
            <h3 className="text-center font-bold pb-2 ">All History</h3>
            {loading.getConversations || loading.deleteConversation ? (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <ul>
                {allConversations &&
                  allConversations.length > 0 &&
                  allConversations.map((conv) => (
                    <li
                      className={`p-2 flex justify-between rounded mb-1.5 ${currentConversation?._id === conv._id ? "bg-violet-500" : "bg-zinc-800 hover:bg-zinc-700"}`}
                      key={conv._id}
                      onClick={() => {
                        handleClickOnConversation(conv._id);
                      }}
                    >
                      {editingId === conv._id ? (
                        <Input
                          value={title}
                          autoFocus
                          onChange={(e) => setTitle(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleRenameConversation(conv._id);
                            }

                            if (e.key === "Escape") {
                              setEditingId(null);
                            }
                          }}
                          onBlur={() => handleRenameConversation(conv._id)}
                        />
                      ) : (
                        <span>{conv.title}</span>
                      )}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMoreModalOpen((prev) => (prev === conv._id ? null : conv._id));
                          }}
                          className="rounded-md p-1 hover:bg-zinc-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="20"
                            height="20"
                          >
                            <circle cx="5" cy="12" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="19" cy="12" r="2" />
                          </svg>
                        </button>

                        {moreModalOpen === conv._id && (
                          <div className="absolute right-0 top-10 z-50 w-52 rounded-xl border border-zinc-700 bg-zinc-800 py-2 shadow-xl">
                            <p className="px-4 py-2 w-full text-right ">
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMoreModalOpen(null);
                                }}
                                className="rounded bg-zinc-800 hover:bg-zinc-900 p-2"
                              >
                                {" "}
                                ❌
                              </span>
                            </p>

                            <button
                              className="flex w-full items-center px-4 py-2 text-left hover:bg-zinc-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRenameClick(conv);
                              }}
                            >
                              Rename Conversation
                            </button>

                            <button
                              className="flex w-full items-center px-4 py-2 text-left text-red-400 hover:bg-red-500/10"

                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteConversation(conv._id);
                              }}
                            >
                              Delete Conversation
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;
