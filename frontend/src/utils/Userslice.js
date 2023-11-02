import { createSlice } from "@reduxjs/toolkit";

const Userslice = createSlice({
  name: "User",
  initialState: {
    currrentuser: {},
    islogedin: false,
  },
  reducers: {
    adduser: (state, action) => {
      state.currrentuser = { ...action.payload };
    },
  },
});

export const { adduser } = Userslice.actions;
export default Userslice.reducer;
