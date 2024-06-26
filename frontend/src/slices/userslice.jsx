import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: [],
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
    nameUpdate: (state, action) => {
      state.selected.chatName = action.payload;
    },
    notify: (state, action) => {
      const find = state.notification.find(
        (item) => item.chat._id === action.payload.chat._id
      );
      if (!find) {
        state.notification.push(action.payload);
      }
    },
    filternotify: (state, action) => {
      state.notification = state.notification.filter(
        (item) => item.chat._id !== action.payload._id
      );
    },
  },
});

export const {
  setcredential,
  cleardata,
  selected,
  setter,
  nameUpdate,
  notify,
  filternotify,
} = userSlice.actions;

export default userSlice.reducer;
