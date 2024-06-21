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
    cleardata: (state, action) => {
      state.userinfo = null;
      localStorage.removeItem("userinfo");
    },
    selected: (state, action) => {
      state.selected = action.payload;
    },
    setter: (state) => {
      state.selected = null;
    },
  },
});

export const { setcredential, cleardata, selected, setter } = userSlice.actions;

export default userSlice.reducer;
