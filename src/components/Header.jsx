import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import UserMenu from "./UserMenu.jsx";
import { userActions } from "../store/slices/userSlices.js";
import { IoNotificationsCircleOutline } from "react-icons/io5";

export default function Header() {
  const user = useSelector((state) => state.user);

  const menuRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener("mousedown", handlerMenu);
    return () => document.removeEventListener("mousedown", handlerMenu);
  }, []);

  function handlerMenu(e) {
    if (!menuRef.current?.contains(e.target)) {
      dispatch(userActions.setOpenMenu(false));
    }
  }

  return (
    <div className="bg-web1 text-web4 fixed w-full z-30">
      <div className="md:w-11/12 mx-auto px-3 md:px-0 ">
        <nav className=" h-14 md:h-20 mx-auto  justify-between items-center flex ">
          <div
            ref={menuRef}
            className={`flex lg:hidden flex-col transitionMenu   justify-center items-center gap-6 absolute top-14 py-5 bg-web3 text-web1
              ${user.isOpenMenu ? "left-0" : "-left-40"}`}
          >
            <NavLink to="/" className="relative rounded-md   ">
              <span className="px-3 text-md font-semibold  h-full flex items-center before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:-bottom-2 before:opacity-0 before:bg-web1 before:duration-300 before:transition-all before:ease-in-out">
                Home
              </span>
            </NavLink>
            <NavLink className="relative rounded-md  " to="AllProducts">
              <span className="px-3 text-md font-semibold  h-full flex items-center before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:-bottom-2 before:opacity-0 before:bg-web1 before:duration-300 before:transition-all before:ease-in-out">
                Products
              </span>
            </NavLink>
            <NavLink className="relative rounded-md  " to="contactUs">
              <span className="px-3 text-md font-semibold h-full flex items-center before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:-bottom-2 before:opacity-0 before:bg-web1 before:duration-300 before:transition-all before:ease-in-out">
                Contact us
              </span>
            </NavLink>
            <NavLink className="relative rounded-md  " to="aboutUs">
              <span className="px-3 text-md font-semibold h-full flex items-center before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:-bottom-2 before:opacity-0 before:bg-web1 before:duration-300 before:transition-all before:ease-in-out">
                About us
              </span>
            </NavLink>
          </div>
          <div className="flex justify-between items-center">
            <div
              className="lg:hidden mr-1"
              onClick={() =>
                dispatch(userActions.setOpenMenu(!user.isOpenMenu))
              }
            >
              <span className="text-xl">
                {user.isOpenMenu ? <IoIosCloseCircleOutline /> : <IoMdMenu />}
              </span>
            </div>
            <Link to="/" className="font-extrabold md:text-xl text-md">
              FREELANCE.
            </Link>
          </div>
          <div className=" h-20 hidden  lg:flex justify-center items-center gap-10">
            <NavLink to="/" className="relative rounded-md h-full ">
              <span className="px-3   font-semibold h-full flex items-center text-lg before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:bottom-0 before:opacity-0 before:bg-web3 before:duration-300 before:transition-all before:ease-in-out">
                Home
              </span>
            </NavLink>
            <NavLink className="relative rounded-md h-full" to="AllProducts">
              <span className="px-3 font-semibold h-full flex items-center text-lg before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:bottom-0 before:opacity-0 before:bg-web3 before:duration-300 before:transition-all before:ease-in-out">
                Products
              </span>
            </NavLink>
            <NavLink className="relative rounded-md h-full" to="contactUs">
              <span className="px-3 font-semibold h-full flex items-center text-lg before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:bottom-0 before:opacity-0 before:bg-web3 before:duration-300 before:transition-all before:ease-in-out">
                Contact us
              </span>
            </NavLink>
            <NavLink className="relative rounded-md h-full" to="aboutUs">
              <span className="px-3 font-semibold h-full flex items-center text-lg before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:bottom-0 before:opacity-0 before:bg-web3 before:duration-300 before:transition-all before:ease-in-out">
                About us
              </span>
            </NavLink>
          </div>
          <div>
            {user.user.username ? (
              <div>
                <div
                  className="flex justify-between items-center cursor-pointer   px-2 py-1 md:py-2"
                  onClick={() =>
                    dispatch(userActions.setOpenUserMenu(!user.isOpenUserMenu))
                  }
                >
                  <div className="relative">
                    <img
                      src={user.user.profileImg}
                      className="rounded-full border border-web2 w-6 h-6  mr-1 md:mr-2 md:w-9 md:h-9"
                    />
                    {user.user.unreadMsgs > 0 || user.user.unSeenOrders > 0 ? (
                      <p className="absolute -top-2 -left-1">
                        <IoNotificationsCircleOutline className="text-red-800 text-xl" />
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="text-web3 font-bold text-sm md:text-base">
                    {user.user.username}
                  </p>
                </div>
                <div className="fixed top-14 md:top-20 right-3  md:right-10">
                  <UserMenu />
                </div>
              </div>
            ) : (
              <div>
                <Link to="login">
                  <button className="border-web2 hover:bg-web3 hover:text-web1 border md:px-3 md:py-1 rounded-md font-semibold  px-1 py-0.5 text-xs md:text-lg mx-1 md:mx-2">
                    Sign in
                  </button>
                </Link>
                <Link to="signUp">
                  <button className="bg-web2 hover:bg-web3 hover:text-web1 font-semibold text-xs md:text-lg border md:px-3 px-1 py-0.5  md:py-1 rounded-md">
                    Join us
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
