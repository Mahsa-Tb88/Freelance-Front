import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlices";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
