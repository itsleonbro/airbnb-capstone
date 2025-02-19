import { createSlice } from "@reduxjs/toolkit";

// check if user info exists in localStorage
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const username = localStorage.getItem("username");
const role = localStorage.getItem("role");

const initialState = {
  token: token || null,
  userId: userId || null,
  username: username || null,
  role: role || null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: state => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      const { token, userId, username, role } = action.payload;
      state.token = token;
      state.userId = userId;
      state.username = username;
      state.role = role;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: state => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("role");

      state.token = null;
      state.userId = null;
      state.username = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    clearError: state => {
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;

export default authSlice.reducer;
