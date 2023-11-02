import React from "react";
import SearchBar from "./Searchbar";
import ChatCard from "./ChatCard";

const Chatlist = () => {
  return (
    <div className=" w-1/3 bg-purple-700 text-black p-3  ">
      <SearchBar />
      <div className="h-[29rem] 
      overflow-y-scroll  scrollbar-thumb-pink-600 scrollbar-track-pink-300  bg-pink-400 rounded-2xl mt-4 p-4 mb-2 scrollbar-thin
      ">
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </div>
    </div>
  );
};

export default Chatlist;
