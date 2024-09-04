import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/slices/userSlices";
import { useSignOut } from "../utils/queries";

export default function UserMenu() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOutMutation = useSignOut();
  function handlerSignOut() {
    signOutMutation.mutate(
      {},
      {
        onSuccess() {
          dispatch(
            userActions.setUser({
              isLoggedIn: false,
              isSeller: false,
              id: "",
              username: "",
              profileImg: "",
              desc: "",
              country: "",
              unreadMsgs: 0,
              unSeenOrders: 0,
            })
          );
          navigate("/");
        },

        onError(error) {
          console.log(error);
        },
      }
    );
  }

  return (
    <div className=" flex flex-col justify-center items-start gap-1 md:gap-3 py-3 ">
      {user.isSeller && (
        <div className="flex flex-col items-center justify-center gap-1 md:gap-3">
          <Link
            to={"/myProducts/" + user.id}
            className="text-web1 text-xs md:text-base hover:text-web4 hover:bg-web1 px-2 py-1 w-full rounded-md"
          >
            My Products
          </Link>
          <Link
            to="addProduct"
            className="text-web1 text-xs md:text-base hover:text-web4 hover:bg-web1 px-2 py-1 w-full rounded-md"
          >
            Add New Product
          </Link>
        </div>
      )}
      <Link
        to="/orders"
        className="text-web1 text-xs md:text-base hover:text-web4 hover:bg-web1 px-2 py-1 w-full rounded-md flex justify-between items-center"
      >
        <span>Orders</span>
        {user.unSeenOrders ? (
          <span className="bg-red-500 text-web1 w-4 h-4 flex justify-center items-center rounded-full">
            {user.unSeenOrders}
          </span>
        ) : (
          ""
        )}
      </Link>
      <Link
        to={`/messages/${user.id}`}
        className="flex group items-center justify-between text-web1 text-xs md:text-base  hover:bg-web1 px-2 py-1 w-full rounded-md"
      >
        <span className="group-hover:text-web4">Messages</span>
        {user.unreadMsgs > 0 && (
          <span className="bg-red-500 h-4 w-4 rounded-full flex items-center justify-center text-sm ">
            {user.unreadMsgs}
          </span>
        )}
      </Link>
      <Link
        className="text-web1 text-xs md:text-base hover:text-web4 hover:bg-web1 px-2 py-1 w-full rounded-md"
        onClick={() => handlerSignOut()}
      >
        SignOut
      </Link>
    </div>
  );
}
