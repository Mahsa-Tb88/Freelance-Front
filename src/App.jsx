import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useInitialized } from "./utils/queries";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/slices/userSlices";

export default function App() {
  const dispatch = useDispatch();
  const { isPending, isError, data, error, refetch } = useInitialized();
  const [timeFetch, setTimeFetch] = useState(new Date());
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
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
          unSeenOrders,
        })
      );
    }
  }, []);

  // get message and order every 30 seconds

  const { pathname } = useLocation();

  useEffect(() => {
    if (data) {
      const newDate = new Date();
      if ((newDate.getTime() - timeFetch) / 1000 >= 5) {
        console.log("time...", (newDate.getTime() - timeFetch) / 1000);
        refetch();
        console.log("refetch data...", data);
        setTimeFetch(newDate);
        const unreadMsgs = data.data.body.unreadMsgs;
        const unSeenOrders = data.data.body.unSeenOrders;
        console.log("unreadMsgs....", unreadMsgs);
        dispatch(userActions.setUser({ ...user, unreadMsgs, unSeenOrders }));
      }
    }
  }, [pathname]);

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
