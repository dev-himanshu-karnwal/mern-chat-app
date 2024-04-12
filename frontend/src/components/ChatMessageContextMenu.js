import React from "react";

const ChatMessageContextMenu = ({
  onPermanentlyDelete,
  onPersonallyDelete,
  messageSender,
}) => {
  return (
    <div
      className={`bg-gray-800 shadow-lg border rounded p-2 absolute top-8 ${
        messageSender === "user" ? "left-20" : "right-20"
      } z-10`}
    >
      {messageSender === "you" && (
        <div
          onClick={onPermanentlyDelete}
          className="px-4 py-2 cursor-pointer text-white hover:bg-red-500"
        >
          Permanently Delete
        </div>
      )}
      <div
        onClick={onPersonallyDelete}
        className="px-4 py-2 cursor-pointer text-white hover:bg-blue-500"
      >
        Personally Delete
      </div>
    </div>
  );
};

export default ChatMessageContextMenu;
