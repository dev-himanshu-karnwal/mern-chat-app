import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PersonalChatContainer = () => {
  const id = useSelector((store) => store.User.currrentUserOneToOneId);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`api/v1/messages/user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      // Don't send empty messages
      return;
    }

    try {
      // Send the new message to the server
      const response = await fetch(`api/v1/messages/user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newMessage }),
      });

      // Assuming the server responds with the updated messages
      const data = await response.json();
      setMessages(data.messages || []);

      // Clear the input field after sending the message
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-2/3 bg-purple-700 dark:bg-gray-800 text-white dark:text-white p-3 overflow-y-hidden flex flex-col border border-purple-900 rounded-md">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-1">
          {messages
            .slice()
            .reverse()
            .map((message) => (
              <div
                key={message._id}
                className={`mb-4 ${
                  message.sender === "you" ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`p-3 rounded-lg inline-block ${
                    message.sender === "you"
                      ? "bg-pink-500 text-white"
                      : "bg-purple-300 text-purple-800"
                  }`}
                >
                  {message.content}
                </p>
                <p className="text-xs text-white mt-1">
                  {new Date(message.time).toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      )}
      <div className="mt-4 flex">
        <textarea
          className="flex-1 p-2 border rounded mr-2 bg-purple-300 text-purple-800 dark:bg-gray-700 dark:text-gray-300"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-pink-500 text-white p-2 rounded"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
   return (
    <div className="w-2/3 bg-purple-700 dark:bg-gray-800 text-white dark:text-white p-3 overflow-y-hidden flex flex-col">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-1">
          {messages
            .slice()
            .reverse()
            .map((message) => (
              <div
                key={message._id}
                className={`mb-4 ${
                  message.sender === "you" ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`p-3 rounded-lg inline-block ${
                    message.sender === "you"
                      ? "bg-pink-500 text-white"
                      : "bg-purple-300 text-purple-800"
                  }`}
                >
                  {message.content}
                </p>
                <p className="text-xs text-white mt-1">
                  {new Date(message.time).toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      )}
      <div className="mt-4 flex">
        <textarea
          className="flex-1 p-2 border rounded mr-2 bg-purple-300 text-purple-800 dark:bg-gray-700 dark:text-gray-300"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-pink-500 text-white p-2 rounded"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
  
};

export default PersonalChatContainer;
