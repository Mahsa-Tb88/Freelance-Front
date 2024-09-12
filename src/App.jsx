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
    if (data) {
      if (Object.keys(data.data.body.user).length !== 0) {
        const userData = data.data.body.user;
        const noImage =
          SERVER_URL + "/uploads/profiles/profile1722016584144.png";
        dispatch(
          userActions.setUser({
            ...user,
            isLoggedIn: true,
            id: userData._id,
            isSeller: userData.isSeller,
            username: userData.username.replace(/(^\w|[\s_]\w)/g, (match) =>
              match.toUpperCase()
            ),
            country: userData.country || "World",
            profileImg: userData.profileImg
              ? SERVER_URL + userData.profileImg
              : noImage,
            desc: userData.desc,
          })
        );
      }
    }
  }, [data]);

  useEffect(() => {
    if (unreadMsg.data) {
      dispatch(
        userActions.setUser({
          ...user,
          unreadMsgs: unreadMsg.data.data.body.unreadMsg,
        })
      );
    }
  }, [unreadMsg.data]);

  useEffect(() => {
    if (unSeenOrder.data) {
      dispatch(
        userActions.setUser({
          ...user,
          unSeenOrders: unSeenOrder.data.data.body.unSeenOrder,
        })
      );
    }
  }, [unSeenOrder.data]);
  if (unreadMsg.data) {
    console.log("app...unSennMSgs", unreadMsg.data.data.body);
  }
  // get messages and orders after 5 seconds with the change of path
  const { pathname } = useLocation();

  useEffect(() => {
    if (data && unreadMsg.data && unSeenOrder.data) {
      const newDate = new Date();
      if ((newDate.getTime() - timeFetch) / 1000 >= 5) {
        console.log("every 5 seconds change route");
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
