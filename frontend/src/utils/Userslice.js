import { createSlice } from "@reduxjs/toolkit";

const Userslice = createSlice({
  name: "User",
  initialState: {
    currrentuser: {},
    toggelislogedin: false,
    usertoken: "",
    currrentUserOneToOneId: "",
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
  },
});

export const {
  adduser,
  toggelislogedin,
  usertoken,
  getcurrrentUserOneToOneId,
  logoutcurrentuser,
} = Userslice.actions;
export default Userslice.reducer;
