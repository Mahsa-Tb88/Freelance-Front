import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  category: [],
  sort: "updatedAt",
  order: "desc",
  Min: 0,
  Max: 20000,
  star: 1,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.category = action.payload.category;
      state.search = action.payload.search;
      state.sort = action.payload.sort;
      state.order = action.payload.order;
      state.Min = action.payload.Min;
      state.Max = action.payload.Max;
      state.star = action.payload.star;
    },
  },
});

export default productSlice;
const productAction = productSlice.actions;
export { productAction };
