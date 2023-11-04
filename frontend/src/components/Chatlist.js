import React, { useEffect, useState } from "react";
import SearchBar from "./Searchbar";
import ChatCard from "./ChatCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Chatlist = () => {
  const navigate=useNavigate();
  const token = useSelector((Store) => Store.User.usertoken);
  // const curuser = useSelector((Store) => Store.User.currrentuser);
  // console.log(token);
  // console.log(curuser._id);
  const [finalData,setfinalData]=useState()
  let data;
  
  useEffect(() => {
    getchats();
  } );
  const getchats = async () => {
    const res = await fetch(`/api/v1/chats/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
     data = await res.json();
    // console.log(JSON.stringify(data));
    if(data.message === "you are not logged in. Login to continue.."){
      navigate("/login")
    }else
    {
      // console.log(data.data.recentChats)
      setfinalData(data.data.recentChats)
    }
  };
  return !finalData ?<div>loading...</div>: (
    <div className=" w-1/3 bg-purple-700 text-black p-3  ">
      <SearchBar />
      <div
        className="h-[29rem] 
      overflow-y-scroll  scrollbar-thumb-pink-600 scrollbar-track-pink-300  bg-pink-400 rounded-2xl mt-4 p-4 mb-2 scrollbar-thin
      "
      >
      {
        finalData.map((item) => (
          <ChatCard key={item._id} item={item} />
        ))
        
      }
      </div>
    </div>
  );
};

export default Chatlist;
