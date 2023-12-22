import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutcurrentuser} from "../utils/Userslice";

const Chatheader = ({ user }) => {
  
  const { name, pic } = user;
  const Navigate=useNavigate();
  const dispatch = useDispatch()

  const handleLogout = async() => {
    // Your logout logic goes here
    const response = await fetch(`/api/v1/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    // For example, clearing user data from state or localStorage
    // currrentuser: {},
    // toggelislogedin: false,
    // usertoken:"",
    // currrentUserOneToOneId:"",
    dispatch(logoutcurrentuser())
    // Redirect to the home route after logout
    Navigate("/login");
  };

  return (
    <div className="relative w-full bg-purple-900 shadow-inner overflow-y-hidden h-20 mt-2 shadow-purple-950 p-4 flex justify-evenly items-center">
      <div className="flex items-center space-x-8">
        <img
          alt="settings"
          src="https://i.pinimg.com/originals/9a/9d/bb/9a9dbb94c8b4032b463e206275d965d3.png"
          className="rounded-full h-12 bg-white cursor-pointer p-2"
        />
        <img
          alt="group chat"
          src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-14/group-chat-1.png"
          className="rounded-full h-12 bg-white cursor-pointer p-2"
        />
        <div className="flex items-center space-x-4">
          <img
            alt="user"
            src={pic}
            className="rounded-full h-12 w-12 bg-white cursor-pointer p-2"
          />
          <h1 className="font-bold text-lg text-white">{name}</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-white hover:text-gray-300 ml-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Chatheader;
