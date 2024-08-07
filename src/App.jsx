import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useInitialized } from "./utils/queries";
import { useDispatch } from "react-redux";
import { userActions } from "./store/slices/userSlices";

export default function App() {
  const dispatch = useDispatch();
  const { isPending, isError, data } = useInitialized();
  if (data) {
    const user = data.data.body.user;
    console.log("initialize", user);
    const noImage = SERVER_URL + "/uploads/profiles/profile1722016584144.png";
    dispatch(
      userActions.setUser({
        isLoggedIn: true,
        id: user._id,
        isSeller: user.isSeller,
        username: user.username,
        profileImg: user.profileImg ? SERVER_URL + user.profileImg : noImage,
        desc: user.desc,
      })
    );
  }

  return (
    <div className="">
      {isPending ? (
        <div>
          <h2>isPending</h2>
        </div>
      ) : isError ? (
        <div>
          <h2>error...</h2>
        </div>
      ) : (
        <div>
          <Header />
          <Outlet />
          <Footer />
        </div>
      )}
    </div>
  );
}
