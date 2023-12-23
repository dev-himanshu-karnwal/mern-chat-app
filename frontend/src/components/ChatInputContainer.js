import { useState } from "react";
import { useSelector } from "react-redux";

const ChatInputContainer = () => {
  const [newMessage, setNewMessage] = useState("");
  const receiverID = useSelector((store) => store.User?.currrentUserOneToOneId);
  // console.log("Receiver ID from Redux store:", receiverID);

  const handelpostmessageapi = async () => {
    try {
      console.log("reciverid", receiverID);
      const response = await fetch(`/api/v1/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "content": newMessage,
          "isGroupMessage": false,
          "reciever":receiverID
        }),
      });
      const data = await response.json();
      console.log(data);
      // Assuming the server responds with the updated messages
      // Clear the input field after sending the message
      setNewMessage("");  
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleSendMessage = async () => {
    if (!newMessage.trim() || receiverID === undefined) {
      // Don't send empty messages or if receiverID is undefined
      return;
    }

    handelpostmessageapi();
  };

  return (
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
  );
};

export default ChatInputContainer;
