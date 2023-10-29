import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UseDisplayError } from "../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [finaldetails, setfinaldetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handelresetfield = () => {
    const inputFields = document.querySelectorAll("input");
    inputFields.forEach((input) => {
      input.value = "";
    });
    setfinaldetails({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    toast('🦄 Reset Successful', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  };

  const handleCreateAccount = () => {
    console.log(finaldetails);
    senddata();
  };

  const senddata = async () => {
    const res = await fetch("/api/v1/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finaldetails),
    });
    const data = await res.json();
    if (data.status === "success") {
      toast.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      UseDisplayError(data);
    }
  };

  return (
    <div className="bg-authbg bg-cover bg-center  bg-no-repeat min-h-screen flex flex-col">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-transparent backdrop-opacity-70 px-6 py-8 rounded-lg shadow-2xl text-black w-full">
          <h1 className="mb-8 text-3xl  font-extrabold text-center text-purple-700 uppercase">Sign up</h1>
          <input
            type="text"
            className="block border-4 border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:border-green-400 "
            name="fullname"
            placeholder="Full Name"
            onChange={(e) =>
              setfinaldetails({
                ...finaldetails,
                name: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4  focus:outline-none focus:border-green-400"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setfinaldetails({
                ...finaldetails,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:border-green-400"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setfinaldetails({
                ...finaldetails,
                password: e.target.value,
              })
            }
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={(e) =>
              setfinaldetails({
                ...finaldetails,
                confirmPassword: e.target.value,
              })
            }
          />
          <div className="flex flex-col">
            <div className="mx-3 font-bold mb-2 uppercase">
              Upload Profile picture
            </div>
            <input
              type="file"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="profile_pic"
            />
          </div>
          <button
            type="submit"
            onClick={handleCreateAccount}
            className="w-full text-center py-3  bg-white font-bold rounded bg-green text-black hover:bg-green-500 my-1"
          >
            Create Account
          </button>
          <button
            type="reset" // Add this line
            onClick={handelresetfield}
            className="w-full text-center py-3 bg-white font-bold rounded bg-green text-black hover:bg-purple-700 my-1"
          >
            Reset
          </button>
        </div>

        <div className="text-grey-dark mt-6 text-red-50">
          Already have an account?
          <Link
            className="no-underline border-b border-blue text-blue"
            to="/login"
          >
            Log in
          </Link>
          .
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
