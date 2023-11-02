import React from "react";
import Signup from "./components/Signup";
import { createBrowserRouter, Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Chatpage from "./components/Chatpage";
import { Provider } from "react-redux";
import Store from "./utils/Store";

const App = () => {
  return (
    <>
      <Provider store={Store}>
        <Outlet />
      </Provider>
    </>
  );
};
export const  appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/Chatpage",
        element: <Chatpage />,

      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      
    ],
  },
]);

export default App


