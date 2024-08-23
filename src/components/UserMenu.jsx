import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/slices/userSlices";
import axios from "axios";
import { useSignOut } from "../utils/queries";

export default function UserMenu() {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignOut, setIsSignOut] = useState(false);

  const { data } = useSignOut(isSignOut);

  function handlerSignOut() {
    setIsSignOut(true);
    if (data?.data.success) {
      dispatch(
        userActions.setUser({
          isLoggedIn: false,
          id: "",
          isSeller: false,
          username: "",
          profileImg: "",
          desc: "",
        })
      );
      navigate("/login");
    }
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
        className="text-web1 text-xs md:text-base hover:text-web4 hover:bg-web1 px-2 py-1 w-full rounded-md"
      >
        Orders
      </Link>
      <Link
        to="/messages"
        className="text-web1 text-xs md:text-base hover:text-web4 hover:bg-web1 px-2 py-1 w-full rounded-md"
      >
        Messages
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
