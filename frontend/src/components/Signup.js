import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div class=" bg-gray-900  min-h-screen flex flex-col ">
      <div class="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div class="bg-red-700 px-6 py-8 rounded-lg shadow-2xl text-black w-full">
          <h1 class="mb-8 text-3xl text-center text-gray-300">Sign up</h1>
          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            name="fullname"
            placeholder="Full Name"
          />
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
          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
          />
          <div className="flex flex-col">
            <div className="mx-3 font-bold mb-2 uppercase">Upload Profile picture</div>
            <input
              type="file"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="profile_pic"
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            class="w-full text-center py-3 bg-white font-bold rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button>

        </div>

        <div class="text-grey-dark mt-6 text-red-50">
          Already have an account?
          <Link
            class="no-underline border-b border-blue text-blue"
            to="login"
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Signup;
