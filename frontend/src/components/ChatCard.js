import React from "react";
import { getcurrrentUserOneToOneId ,toggelshowInputContainer} from "../utils/Userslice";
import { useDispatch } from "react-redux";

const ChatCard = ({ item }) => {
  const dispatch = useDispatch();
  const date = new Date(item.latestMessage.time);
  const formattedTime = date.toLocaleTimeString();
  console.log(item);
  const handleChatCardClick = () => {
    // Handle the click event here
    console.log("Clicked on ChatCard:");
    dispatch(getcurrrentUserOneToOneId(item.user._id));
    dispatch(toggelshowInputContainer());
    // You can make an API request or navigate to a specific chat page, etc.
  };

  return (
    <div
      className="rounded-md mt-3 flex bg-[#dcf2f1] hover:cursor-pointer"
      onClick={handleChatCardClick}
    >
      <div className="flex align-middle">
        <img
          alt="user"
          src={item.user.pic}
          className="rounded-2xl h-12  cursor-pointer "
        />
      </div>
      <div className="ml-4 mb-2 w-full">
        <div className="flex flex-col">
          <div className="font-bold text-xl">{item.user.name}</div>
          <div className="flex justify-between">
            {item.latestMessage.content ? (
              <div className="font-semibold text-sm">
                {item.latestMessage.content.substring(0,15)}
              </div>
            ) : (
              ""
            )}
            {formattedTime === "Invalid Date" ? (
              ""
            ) : (
              <div className="mr-3 text-xs  ">{formattedTime}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
