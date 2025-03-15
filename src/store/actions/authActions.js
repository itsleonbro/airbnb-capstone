import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
} from "../reducers/authReducer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = (username, password) => async dispatch => {
  try {
    dispatch(loginRequest());

    const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
      username,
      password,
    });

    dispatch(
      loginSuccess({
        token: response.data.token,
        userId: response.data.userId,
        username: response.data.username,
        role: response.data.role,
      })
    );

    return { success: true, role: response.data.role };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Login failed. please check your credentials.";

    dispatch(loginFailure(errorMessage));

    return { success: false, error: errorMessage };
  }
};

export const logoutUser = () => dispatch => {
  dispatch(logout());
};

export const clearAuthError = () => dispatch => {
  dispatch(clearError());
};
