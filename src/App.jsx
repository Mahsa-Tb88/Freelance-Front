import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useGetOrders, useInitialized } from "./utils/queries";
import { useDispatch } from "react-redux";
import { userActions } from "./store/slices/userSlices";

export default function App() {
  const dispatch = useDispatch();
  const { isPending, isError, data, error } = useInitialized();
  if (data) {
    const user = data.data.body.user;
    const unreadMsgs = data.data.body.unreadMsgs;
    const unSeenOrders = data.data.body.unSeenOrders;
    const noImage = SERVER_URL + "/uploads/profiles/profile1722016584144.png";
    dispatch(
      userActions.setUser({
        isLoggedIn: true,
        id: user._id,
        isSeller: user.isSeller,
        username: user.username,
        country: user.country || "World",
        profileImg: user.profileImg ? SERVER_URL + user.profileImg : noImage,
        desc: user.desc,
        unreadMsgs,
        unSeenOrders
      })
    );
  }

  return (
    <div>
      {isPending ? (
        <div className="flex justify-center items-center text-xl text-web3 font-bold h-svh">
          <h2>Loading ...</h2>
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center text-xl text-red-600 font-bold h-svh">
          <h2>{error.message}</h2>
        </div>
      ) : (
        <div className="flex flex-col min-h-svh">
          <Header />
          <Outlet />
          <Footer />
        </div>
      )}
    </div>
  );
}
