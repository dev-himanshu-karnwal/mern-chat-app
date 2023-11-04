import React from "react";

const ChatCard = ({ item }) => {
  // console.log(item);
  const date = new Date(item.latestMessage.time);
  const formattedTime = date.toLocaleTimeString();
  return (
    <div className="rounded-md  mt-3 flex bg-white">
      <div>
        <img
          alt="user"
          src={item.user.pic}
          className="rounded-full h-12  bg-white cursor-pointer p-2"
        />
      </div>
      <div className="ml-4 mb-2  w-full">
        <div className=" flex flex-col ">
          <div className="font-bold text-xl">{item.user.name}</div>
          <div className="flex justify-between">
            {item.latestMessage.content ? (
              <div className="font-semibold text-sm">
                {item.latestMessage.content}
              </div>
            ) : (
              ""
            )}
           {
            (formattedTime==='Invalid Date')?" ":<div className="mr-3">{formattedTime}</div>
           }
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatCard;
