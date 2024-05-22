import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userinfo: localStorage.getItem("userinfo")
    ? JSON.parse(localStorage.getItem("userinfo"))
    : null,
};

export const userSlice = createSlice({
  name: "userauth",
  initialState,
  reducers: {
    setcredential: (state, actions) => {
      state.userinfo = actions.payload;
      localStorage.setItem("userinfo", JSON.stringify(actions.payload));
    },
  },
});

export const { setcredential } = userSlice.actions;

export default userSlice.reducer;
