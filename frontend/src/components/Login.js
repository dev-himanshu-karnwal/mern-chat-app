import React from "react";

const Login = () => {
    
  return (
    <div class=" bg-gray-900  min-h-screen flex flex-col ">
      <div class="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div class="bg-red-800  px-6 py-8 rounded-lg shadow-2xl text-gray-300 w-full">
          <h1 class="mb-8 text-3xl text-center">Log in</h1>
          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />
          <button
            type="submit"
            class="w-full text-center py-3 uppercase text-xl bg-white font-bold rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
