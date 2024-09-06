import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useInitialized, useunreadMsg, useUnSeenOrder } from "./utils/queries";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/slices/userSlices";

export default function App() {
  const dispatch = useDispatch();
  const { isPending, isError, data, error } = useInitialized();
  const unSeenOrder = useUnSeenOrder();
  const unreadMsg = useunreadMsg();
  const [timeFetch, setTimeFetch] = useState(new Date());
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if ((data, unreadMsg.data, unSeenOrder.data)) {
      const user = data?.data.body.user;
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
          unreadMsgs: unreadMsg.data?.data.body.unreadMsg,
          unSeenOrders: unSeenOrder.data?.data.body.unSeenOrder,
        })
      );
    }
  }, [data, unreadMsg.data, unSeenOrder.data]);

  // get message and order every 30 seconds
  const { pathname } = useLocation();
  console.log("every 5 sec fetch....");

  useEffect(() => {
    if ((data, unreadMsg.data, unSeenOrder.data)) {
      const newDate = new Date();
      if ((newDate.getTime() - timeFetch) / 1000 >= 5) {
        if (user.isSeller) {
          setTimeout(unSeenOrder.refetch, 100);
        }
        setTimeout(unreadMsg.refetch, 100);
        setTimeFetch(newDate);
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
