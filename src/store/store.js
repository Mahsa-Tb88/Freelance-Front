import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlices";
import productSlice from "./slices/productSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
  },
});

export default store;
