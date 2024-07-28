import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isLoggedIn: false,
    isSeller: false,
    username: "",
    profileImg: "",
    desc: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default userSlice;
const userActions = userSlice.actions;
export { userActions };
