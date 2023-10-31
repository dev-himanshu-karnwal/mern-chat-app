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
    toast("🦄 Reset Successful", {
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
        <div className=" bg-blue-500 px-6 py-8 rounded-lg shadow-2xl text-black w-3/4">
          <h1 className="mb-8 text-3xl  font-extrabold text-center text-white uppercase">Sign up</h1>
          <input
            type="text"
            className="block border-2  w-full px-3 py-1 shadow-2xl rounded mb-2 focus:border-blue-800"

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

            className="block border-2  w-full px-3 py-1 shadow-2xl rounded mb-2 focus:border-blue-800"
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

            className="block border-2  w-full px-3 py-1 shadow-2xl rounded mb-2 focus:border-blue-800 "

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
            className="block border-2  w-full px-3 py-1 shadow-2xl rounded mb-2 focus:border-blue-800"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={(e) =>
              setfinaldetails({
                ...finaldetails,
                confirmPassword: e.target.value,
              })
            }
          />
          <div>
            <label
              class="block mb-2 my-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload Profile Pic
            </label>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
          </div>
          <div className="flex justify-evenly mt-2 -mb-2 ">
            <button
              type="submit"
              onClick={handleCreateAccount}
              class="text-white bg-blue-700  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mt-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Account
            </button>
            <button
              type="reset"
              onClick={handelresetfield}
              class="text-white bg-blue-700  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mt-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
            Clear Form
            </button>
          </div>

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
