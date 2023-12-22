import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseDisplayError } from "../utils/helper";
import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { adduser, toggelislogedin, usertoken } from "../utils/Userslice";

const Signup = () => {
  const Navigate=useNavigate();
  const dispatch = useDispatch();

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
      autoClose: 2000,
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
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(adduser(data.data.user));
      dispatch(toggelislogedin());
      dispatch(usertoken(data.token));

      setTimeout(() => {
        Navigate("/");
      }, 1500);

    } else {
      UseDisplayError(data);
    }
  };
  return (
    <div className="bg-authbg bg-cover bg-center  bg-no-repeat min-h-screen flex flex-col">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className=" bg-blue-500 px-6 py-8 rounded-lg shadow-2xl text-black w-3/4">
          <h1 className="mb-8 text-3xl  font-extrabold text-center text-white uppercase">
            Sign up
          </h1>
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
          
          <div className="grid w-full max-w-xs items-center gap-1.5">
            <label className="text-sm text-blue-100 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Upload Profile Pic
            </label>
            <input
              id="picture"
              type="file"
              className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
            />
          </div>
          <div className="flex justify-evenly mt-2 -mb-2 ">
            <button
              type="submit"
              onClick={handleCreateAccount}
              className="text-white bg-blue-700  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mt-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Account
            </button>
            <button
              type="reset"
              onClick={handelresetfield}
              className="text-white bg-blue-700  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mt-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
