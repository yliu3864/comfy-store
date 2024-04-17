import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  luxury: "luxury",
  acid: "acid",
};
const getLocalStorageTheme = () => {
  const theme = localStorage.getItem("theme") || themes.acid;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};
const getLocalStorageUser = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};
const defaultSlice = {
  user: getLocalStorageUser(),
  theme: getLocalStorageTheme(),
};

const userSlice = createSlice({
  name: "cart",
  initialState: defaultSlice,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      console.log(user);
      state.user = user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logoutUser: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("log out successfully");
    },
    toggleTheme: (state, action) => {
      state.theme = state.theme == themes.luxury ? themes.acid : themes.luxury;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
