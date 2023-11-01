
import { configureStore } from "@reduxjs/toolkit";
import Userslice from "./Userslice"
const Store = configureStore({
    reducer:{
        User:Userslice,
    }
})

export default Store