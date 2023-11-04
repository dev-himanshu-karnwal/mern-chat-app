import { createSlice } from "@reduxjs/toolkit";

const Userslice = createSlice({
  name: "User",
  initialState: {
    currrentuser: {},
    toggelislogedin: false,
    usertoken:""

  },
  reducers: {
    adduser: (state, action) => {
      state.currrentuser = { ...action.payload };
    },
    toggelislogedin:(state)=>{
      state.toggelislogedin= !(state.toggelislogedin)
    },
    usertoken :(state,action)=>{
      state.usertoken= action.payload
    }
  },
});

export const { adduser,toggelislogedin,usertoken } = Userslice.actions;
export default Userslice.reducer;
