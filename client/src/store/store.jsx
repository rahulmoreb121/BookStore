import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice.js";
const store = configureStore({
  reducer: {
    authreducer: authSlice,
  },
});
export { store };
