import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseDisplayError } from "../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adduser, toggelislogedin, usertoken } from "../utils/Userslice";

const Login = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

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
    const Data = await res.json();
    console.log(Data);
    if (Data.status === "success") {
      console.log("done");
      toast.success(Data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      dispatch(adduser(Data.data.user));
      dispatch(toggelislogedin());
      dispatch(usertoken(Data.token));

      // Navigate to the "/" route after successful sihnup

      setTimeout(() => {
        Navigate("/");
      }, 2000);
    } else {
      UseDisplayError(Data);
    }
  };

  return (
    <div className="bg-authbg bg-cover bg-center  text-black bg-no-repeat min-h-screen flex flex-col ">
      <div className="container  max-w-lg mx-auto flex-1 flex flex-col items-center  px-2">
        <div className="mt-[20vh] text-black  bg-blue-500 flex justify-center flex-col align-middle  px-6 py-8 rounded-lg shadow-2xl  w-3/4">
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
            className="text-white bg-blue-700  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mt-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-1/2"
            onClick={handelloginsubmit}
          >
            submit
          </button>
        </div>
        <div className="mt-6 text-white">
          Don't have an account?
          <Link
            className="no-underline border-b border-blue text-white "
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
