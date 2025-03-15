import axios from "axios";
import {
  reservationRequest,
  fetchReservationsSuccess,
  createReservationSuccess,
  deleteReservationSuccess,
  reservationFailure,
  clearReservationState,
} from "../reducers/reservationReducer";

const API_BASE_URL = "http://localhost:5001";

export const fetchUserReservations = () => async (dispatch, getState) => {
  try {
    dispatch(reservationRequest());

    const { token } = getState().auth;

    const response = await axios.get(`${API_BASE_URL}/api/reservations/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchReservationsSuccess(response.data));
    return { success: true };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch reservations";
    dispatch(reservationFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

export const createReservation =
  reservationData => async (dispatch, getState) => {
    try {
      dispatch(reservationRequest());

      const { token } = getState().auth;

      const response = await axios.post(
        `${API_BASE_URL}/api/reservations`,
        reservationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(createReservationSuccess(response.data));
      return { success: true, reservation: response.data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create reservation";
      dispatch(reservationFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

export const deleteReservation =
  reservationId => async (dispatch, getState) => {
    try {
      dispatch(reservationRequest());

      const { token } = getState().auth;

      await axios.delete(`${API_BASE_URL}/api/reservations/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(deleteReservationSuccess(reservationId));
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to cancel reservation";
      dispatch(reservationFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

// clear reservation state,used when unmounting components
export const clearReservation = () => dispatch => {
  dispatch(clearReservationState());
};
