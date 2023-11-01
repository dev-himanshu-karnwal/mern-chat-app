import React from "react";

const ChatCard = () => {
  return (
    <div className="rounded-md  mt-3 flex bg-white">
      <img
        alt="user"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2yJWVwI9ZFnJhI3FIB5wIK4Ys7B8J-u5hfQ&usqp=CAU"
        className="rounded-full h-12  bg-white cursor-pointer p-2"
      />
      <div className="ml-4 mb-2">
        <div className="font-bold text-xl">Harsh Yadav</div>
        <div className="font-semibold text-sm">last message</div>
      </div>
    </div>
  );
};

export default ChatCard;
