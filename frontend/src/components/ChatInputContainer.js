import {useState} from 'react'
import {  useSelector } from 'react-redux';

const ChatInputContainer = () => {
    const id= useSelector((store)=> store.user?.currentuser._id)
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = async () => {
        if (!newMessage.trim()) {
          // Don't send empty messages
          return;
        }
    console.log(id);
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
         
    
          // Clear the input field after sending the message
          setNewMessage("");
        } catch (error) {
          console.error("Error sending message:", error);
        }
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
  )
}

export default ChatInputContainer