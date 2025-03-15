import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import reservationReducer from "./reservationReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  reservation: reservationReducer,
});

export default rootReducer;
