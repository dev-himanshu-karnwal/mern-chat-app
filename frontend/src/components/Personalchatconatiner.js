import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentChatMesssages } from "../utils/Userslice";
import ChatInputContainer from "./ChatInputContainer";
import ChatMessageContextMenu from "./ChatMessageContextMenu";
import { receiveMessage } from "./../utils/socket";
import { MessageSquareWarning } from "lucide-react";

const PersonalChatContainer = () => {
  const dispatch = useDispatch();
  const id = useSelector((store) => store.User.currrentUserOneToOneId);
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

    const handleReceivedMessage = (message) => {
      // setMessages((prevMessages) => [msg, ...prevMessages]);
      console.log(message);
      // message = message.data
      const msgObj = {
        content: message?.content,
        _id: message?._id,
        sender: "you",
        time: message?.createdAt,
      };
      console.log(msgObj)
      setMessages((prev) => [msgObj, ...prev]);
    };

    if (id) {
      fetchData();
      receiveMessage(handleReceivedMessage);
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
      const response = await fetch(
        `/api/v1/messages/${contextMenu.messageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
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
      const response = await fetch(
        `/api/v1/messages/${contextMenu.messageId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    <div className="w-2/3 bg-[#3461af] dark:bg-gray-800 text-white dark:text-white p-3 overflow-y-hidden flex flex-col border border-purple-900 rounded-md">
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
      <ChatInputContainer onSendMessage={setMessages} />
    </div>
  );
};

export default PersonalChatContainer;
