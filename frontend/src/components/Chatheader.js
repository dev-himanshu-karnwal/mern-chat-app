import React from "react";

const Chatheader = ({ user }) => {

  const { name, email, pic, _id } = user;

  console.log(name, pic, email, _id);

  return (
    <div className="w-full bg-purple-900 shadow-inner overflow-y-hidden h-20 mt-2 shadow-purple-950 p-2
    flex justify-evenly ">
      <div>
        <img
          alt="seeting"
          src="https://i.pinimg.com/originals/9a/9d/bb/9a9dbb94c8b4032b463e206275d965d3.png"
          className="rounded-full h-12  bg-white cursor-pointer"
        />
      </div>
      <div>
        <img
          alt="groupchat"
          src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-14/group-chat-1.png"
          className="rounded-full h-12  bg-white cursor-pointer "
        />
      </div>
      <div className="flex flex-col ">
        <img
          alt="user"
          src={pic}
          className="rounded-full h-12 w-12 mx-auto bg-white cursor-pointer p-2"
        />
        <h1 className="font-bold text-lg">{name}</h1>
      </div>
    </div>
  );
};

export default Chatheader;
