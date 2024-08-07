import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isLoggedIn: false,
    isSeller: false,
    id: "",
    username: "",
    profileImg: "",
    desc: "",
  },
  isOpenMenu: false,
  isOpenUserMenu: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setOpenMenu(state, action) {
      state.isOpenMenu = action.payload;
    },
    setOpenUserMenu(state, action) {
      state.isOpenUserMenu = action.payload;
    },
  },
});

export default userSlice;
const userActions = userSlice.actions;
export { userActions };
