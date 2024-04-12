import { useState } from "react";
import { useSelector } from "react-redux";
import { Send } from "lucide-react";

const ChatInputContainer = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");
  // const [isSending, setIsSending] = useState(false);
  const receiverID = useSelector((store) => store.User?.currrentUserOneToOneId);
  // console.log("Receiver ID from Redux store:", receiverID);

  const handelpostmessageapi = async () => {
    try {
      setNewMessage("");
      // setIsSending(true);
      const response = await fetch(`/api/v1/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          isGroupMessage: false,
          reciever: receiverID,
        }),
      });
      const data = await response.json();
      console.log(data);
      // Assuming the server responds with the updated messages
      // Clear the input field after sending the message
      // setIsSending(false);
      console.log(data);
      const msg = data.data.message;
      console.log(msg);
      const msgObj = {
        content: msg.content,
        _id: msg._id,
        sender: "you",
        time: msg.createdAt,
      };
      onSendMessage((prev) => [msgObj, ...prev]);
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
    <div className="mt-4 flex justify-center align-middle">
      <textarea
        className="flex-1 pl-4 pt-2 border rounded-full mr-2 bg-[#dcf2f1] text-purple-800 dark:bg-gray-700 dark:text-gray-300"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />

      <div className="mt-3" onClick={handleSendMessage}>
        <Send size={40} />
      </div>
    </div>
  );
};

export default ChatInputContainer;
