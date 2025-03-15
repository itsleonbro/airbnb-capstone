import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userReservations: [],
  loading: false,
  error: null,
  currentReservation: null,
  success: false,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    reservationRequest: state => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },

    fetchReservationsSuccess: (state, action) => {
      state.loading = false;
      state.userReservations = action.payload;
      state.error = null;
    },

    createReservationSuccess: (state, action) => {
      state.loading = false;
      state.currentReservation = action.payload;
      state.error = null;
      state.success = true;
    },

    deleteReservationSuccess: (state, action) => {
      state.loading = false;
      state.userReservations = state.userReservations.filter(
        reservation => reservation._id !== action.payload
      );
      state.error = null;
      state.success = true;
    },

    reservationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    clearReservationState: state => {
      state.currentReservation = null;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  reservationRequest,
  fetchReservationsSuccess,
  createReservationSuccess,
  deleteReservationSuccess,
  reservationFailure,
  clearReservationState,
} = reservationSlice.actions;

export default reservationSlice.reducer;
