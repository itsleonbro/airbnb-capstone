import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // disable serializable check 4 file uploads
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// enable hot reload for reducers in development
if (import.meta.hot) {
  import.meta.hot.accept("./reducers/index", newModule => {
    if (newModule) {
      store.replaceReducer(newModule.default);
    }
  });
}

export default store;
