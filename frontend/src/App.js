import React from "react";
import Signup from "./components/Signup";
import {createBrowserRouter ,RouterProvider} from "react-router-dom"
import Login from "./components/Login";


const approuter=createBrowserRouter([
  {
    path:'/',
    element : <Signup/>
  },
  {
    path:'/login',
    element : <Login/>
  },

]
)
const  App= () =>{
  
   return (
    <RouterProvider router={approuter}>  

    </RouterProvider>

   )
    
       
}

export default App;
