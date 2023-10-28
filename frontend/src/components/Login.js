import React, { useState } from "react";


const Login = () => {
  const [logindetails,setlogindetails]=useState(
    {
      email:"",
      password :""
    }
  );
 const handelloginsubmit =()=>{
  console.log(logindetails)
  //logindetails mai object hai backed pe lele and kardevalidate uske baad mai dikha dunga loginned succeful ka message
 }
  return (
    <div className=" bg-gray-900  min-h-screen flex flex-col ">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-red-800  px-6 py-8 rounded-lg shadow-2xl text-gray-300 w-full">
          <h1 className="mb-8 text-3xl text-center">Log in</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
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
            className="block border border-grey-light w-full p-3 rounded mb-4"
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
            className="w-full text-center py-3 uppercase text-xl bg-white font-bold rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
            onClick={handelloginsubmit}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
