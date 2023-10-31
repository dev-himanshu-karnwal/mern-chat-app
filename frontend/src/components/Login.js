import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseDisplayError } from "../utils/helper";
import { Link } from "react-router-dom";

const Login = () => {
  const [logindetails, setlogindetails] = useState({
    email: "",
    password: "",
  });
  const handelloginsubmit = () => {
    senddata();
  };
  const senddata = async () => {
    const res = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logindetails),
    });
    const data = await res.json();
    console.log(logindetails);
    console.log(data);
    if (data.status === "success") {
      console.log("done");
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
    <div className="bg-authbg bg-cover bg-center   bg-no-repeat min-h-screen flex flex-col ">
      <div className="container  max-w-lg mx-auto flex-1 flex flex-col items-center  px-2">
        <div className="mt-[20vh] bg-blue-500 flex justify-center flex-col align-middle  px-6 py-8 rounded-lg shadow-2xl text-gray-300 w-3/4">
          <h1 className="mb-8 text-3xl  font-extrabold text-center text-white uppercase">
            sign in
          </h1>
          <input
            type="text"
            className="block border-2  w-full px-3 py-1 shadow-2xl rounded mb-2 focus:border-blue-800"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setlogindetails({
                ...logindetails,
                email: e.target.value,
              })
            }
          />
          <input
            type="password"
            className="block border-2  w-full px-3 py-1 shadow-2xl rounded mb-2 focus:border-blue-800"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setlogindetails({
                ...logindetails,
                password: e.target.value,
              })
            }
          />
          <button
            type="submit"
            class="text-white bg-blue-700  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mt-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-1/2"
            onClick={handelloginsubmit}
          >
            submit
          </button>
        </div>
        <div className="text-grey-dark mt-6 text-red-50">
          Don't have an account?
          <Link
            className="no-underline border-b border-blue text-blue "
            to="/signup"
          >
            {"    "} Signup
          </Link>
          .
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
