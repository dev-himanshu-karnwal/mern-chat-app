import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentChatMesssages } from "../utils/Userslice";
import ChatInputContainer from "./ChatInputContainer";
import ChatMessageContextMenu from "./ChatMessageContextMenu";

const PersonalChatContainer = () => {
  const id = useSelector((store) => store.User.currrentUserOneToOneId);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    messageId: null,
  });
  const contextMenuRef = useRef(null);

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
        dispatch(setCurrentChatMesssages(data.messages));
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

  const handleContextMenu = (messageId) => (event) => {
    event.preventDefault();
    setContextMenu({ visible: true, messageId });
  };

  const handleContextMenuClose = () => {
    setContextMenu({ visible: false, messageId: null });
  };

  const handlePermanentlyDelete = async () => {
    console.log("Permanently delete message with ID:", contextMenu.messageId);
    // Add logic for permanently deleting the message
    try {
      const response = await fetch(`api/v1/messages/${contextMenu.messageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== contextMenu.messageId)
      );

      handleContextMenuClose();
    } catch (error) {
      console.error("Error deleting message:", error);
    }

  };

  const handlePersonallyDelete = async () => {
    console.log("Personally delete message with ID:", contextMenu.messageId);

    try {
      const response = await fetch(`api/v1/messages/${contextMenu.messageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== contextMenu.messageId)
      );

      handleContextMenuClose();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleClickOutsideContextMenu = (event) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(event.target)
    ) {
      handleContextMenuClose();
    }
  };
  useEffect(() => {
    console.log("Entering useEffect");
    document.addEventListener("click", handleClickOutsideContextMenu);

    return () => {
      console.log("Removing event listener");
      document.removeEventListener("click", handleClickOutsideContextMenu);
    };
  }, []);

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
                } relative`}
                onContextMenu={handleContextMenu(message._id)}
              >
                <p
                  className={`p-3 rounded-lg inline-block  ${
                    message.sender === "you"
                      ? "bg-pink-500 text-white"
                      : "bg-purple-300 text-purple-800"
                  } `}
                >
                  {message.content}
                </p>
                <p className="text-xs text-white mt-1">
                  {new Date(message.time).toLocaleString()}
                </p>
                {contextMenu.visible &&
                  contextMenu.messageId === message._id && (
                    <div ref={contextMenuRef}>
                      <ChatMessageContextMenu
                        messageSender={message.sender}
                        onPermanentlyDelete={handlePermanentlyDelete}
                        onPersonallyDelete={handlePersonallyDelete}
                      />
                    </div>
                  )}
              </div>
            ))}
        </div>
      )}
      <ChatInputContainer />
    </div>
  );
};

export default PersonalChatContainer;
