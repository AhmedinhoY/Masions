import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../shared/context/auth-context";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { formatTime } from "../shared/util/extract-time";
import axios from "axios";

export const Messages = () => {
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/messages/send/${selectedUser._id}`,
        { message },
        { withCredentials: true }
      );
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setMessage("");
    } catch (err) {
      console.error("Error sending the message:", err);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/getUsersForMessages",
          { withCredentials: true }
        );
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, [auth?.user?.id]);

  const fetchMessages = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/messages/${userId}`,
        { withCredentials: true }
      );
      setMessages(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchMessages(user._id);
  };

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();
  }, [messages]);

  return (
    <div className="container">
      <section>
        <h1>Messages</h1>
        <div className="flex flex-row justify-around mt-4">
          <div className="container-body overflow-y-auto !w-[30%] !h-[65vh]">
            {users?.length > 0 ? (
              users.map((u) => (
                <ul
                  key={u.email}
                  role="list"
                  className="divide-y divide-gray-100"
                >
                  <li
                    className="flex justify-between gap-x-6 py-2 border-b border-gray-200 cursor-pointer"
                    onClick={() => handleUserClick(u)}
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <img
                        alt="Ahmed image"
                        src={`http://localhost:3000/uploads/images/${u.image}`}
                        className="size-12 flex-none rounded-full bg-gray-50"
                      />
                      <div className="min-w-0 flex flex-col justify-around">
                        <h2 className="text-sm/6 font-semibold !m-0">
                          {u.name} - {u.agency}
                        </h2>
                        <p className="truncate text-xs/5 text-gray-500 !m-0">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              ))
            ) : (
              <p>no users found</p>
            )}
          </div>
          <div className="container-body !w-[65%] !h-[65vh]">
            {selectedUser ? (
              <div className="h-full flex flex-col justify-between">
                <div className="max-h-[85%] p-2">
                  <h2>{selectedUser.name}</h2>
                  <div
                    id="msg-container"
                    className="overflow-y-auto p-2 flex-grow  max-h-full"
                  >
                    {messages.length > 0 ? (
                      <ul className="mt-4">
                        {messages.map((msg) => (
                          <li
                            key={msg._id}
                            className="py-1"
                            ref={messagesEndRef}
                          >
                            {msg.senderId === selectedUser._id ? (
                              <div className="flex flex-row justify-start items-end">
                                <img
                                  alt="Ahmed image"
                                  src={`http://localhost:3000/uploads/images/${selectedUser.image}`}
                                  className="size-10 rounded-full mr-4 mb-0.5"
                                />
                                <p
                                  className="flex flex-col text-sm p-2 !m-0"
                                  style={{
                                    backgroundColor: "var(--gray-6)",
                                    borderRadius: "var(--border-radius-card)",
                                    color: "var(--text-color)",
                                  }}
                                >
                                  {msg.message}
                                  <small
                                    className="flex justify-end"
                                    style={{ color: "var(--gray-11)" }}
                                  >
                                    {formatTime(msg.createdAt)}
                                  </small>
                                </p>
                              </div>
                            ) : (
                              <div className="flex flex-row justify-end">
                                <p
                                  className="text-sm p-2 flex flex-col !m-0"
                                  style={{
                                    backgroundColor: "var(--primary)",
                                    borderRadius: "var(--border-radius-card)",
                                    color: "white",
                                  }}
                                >
                                  {msg.message}
                                  <small
                                    className="flex justify-start"
                                    style={{ color: "var(--gray-3)" }}
                                  >
                                    {formatTime(msg.createdAt)}
                                  </small>
                                </p>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <h3 className="flex justify-center items-center">
                        Start a conversation with {selectedUser.name}
                      </h3>
                    )}
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between items-center">
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="Input w-[93%] h-18 p-2"
                      required
                    />
                    <button
                      type="submit"
                      className="w-[5%] flex justify-end rounded-full"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      <PaperPlaneIcon className="size-8 p-1 text-white" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <h3 className="!text-xl flex justify-center items-center">
                Select a chat to start messaging
              </h3>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
