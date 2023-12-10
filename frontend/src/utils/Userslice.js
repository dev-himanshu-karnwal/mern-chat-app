import { createSlice } from "@reduxjs/toolkit";

const Userslice = createSlice({
  name: "User",
  initialState: {
    currrentuser: {},
    toggelislogedin: false,
    usertoken: "",
    currrentUserOneToOneId: "",
    currentChatMesssages:{},
  },
  reducers: {
    adduser: (state, action) => {
      state.currrentuser = { ...action.payload };
    },
    toggelislogedin: (state) => {
      state.toggelislogedin = !state.toggelislogedin;
    },
    usertoken: (state, action) => {
      state.usertoken = action.payload;
    },
    getcurrrentUserOneToOneId: (state, action) => {
      state.currrentUserOneToOneId = action.payload;
    },
    logoutcurrentuser: (state) => {
      state.currrentuser = {};
      state.toggelislogedin = false;
      state.usertoken = "";
      state.currrentUserOneToOneId = "";
    },
    setCurrentChatMesssages:(state,action)=>{
      state.currentChatMesssages={... state.currentChatMesssages,...action.payload}
    }
  },
});

export const {
  adduser,
  toggelislogedin,
  usertoken,
  getcurrrentUserOneToOneId,
  logoutcurrentuser,
  setCurrentChatMesssages,
} = Userslice.actions;
export default Userslice.reducer;
