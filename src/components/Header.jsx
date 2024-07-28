import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu.jsx";

export default function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const user = useSelector((state) => state.user.user);
  return (
    <div className="bg-web1 text-web4 relative">
      <div className="md:w-11/12 mx-auto px-3 md:px-0">
        <nav className=" h-14 md:h-20 mx-auto  justify-between items-center flex ">
          <div
            className={`flex lg:hidden flex-col transitionMenu   justify-center items-center gap-6 absolute top-14 py-5 bg-web3 text-web1
              ${isOpenMenu ? "left-0" : "-left-40"}`}
          >
            <NavLink to="/" className="relative rounded-md   ">
              <span className="px-3 text-md font-semibold  h-full flex items-center before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:-bottom-2 before:opacity-0 before:bg-web1 before:duration-300 before:transition-all before:ease-in-out">
                Home
              </span>
            </NavLink>
            <NavLink className="relative rounded-md  " to="blogs">
              <span className="px-3 text-md font-semibold  h-full flex items-center before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:-bottom-2 before:opacity-0 before:bg-web1 before:duration-300 before:transition-all before:ease-in-out">
                Blogs
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
            <div className="lg:hidden mr-1">
              <span
                className="text-xl"
                onClick={() => setIsOpenMenu(!isOpenMenu)}
              >
                {isOpenMenu ? <IoIosCloseCircleOutline /> : <IoMdMenu />}
              </span>
            </div>
            <Link to="/" className="font-extrabold md:text-xl text-md">
              FREELANCE.
            </Link>
          </div>
          <div className="hidden lg:flex justify-center items-center gap-10">
            <NavLink to="/" className="relative rounded-md ">
              <span className="px-3 font-semibold h-full flex items-center text-lg before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:-bottom-2 before:opacity-0 before:bg-web3 before:duration-300 before:transition-all before:ease-in-out">
                Home
              </span>
            </NavLink>
            <NavLink className="relative rounded-md" to="blogs">
              <span className="px-3 font-semibold h-full flex items-center text-lg before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:-bottom-2 before:opacity-0 before:bg-web3 before:duration-300 before:transition-all before:ease-in-out">
                Blogs
              </span>
            </NavLink>
            <NavLink className="relative rounded-md" to="contactUs">
              <span className="px-3 font-semibold h-full flex items-center text-lg before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:-bottom-2 before:opacity-0 before:bg-web3 before:duration-300 before:transition-all before:ease-in-out">
                Contact us
              </span>
            </NavLink>
            <NavLink className="relative rounded-md" to="aboutUs">
              <span className="px-3 font-semibold h-full flex items-center text-lg before:hover:opacity-100 before:hover:w-full before:content-[''] before:h-0.5 before:w-0 before:absolute before:left-0 before:-bottom-2 before:opacity-0 before:bg-web3 before:duration-300 before:transition-all before:ease-in-out">
                About us
              </span>
            </NavLink>
          </div>
          <div className="">
            {user.username ? (
              <div className="relative">
                <div
                  className="flex justify-between items-center cursor-pointer   px-2 py-2"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div>
                    <img
                      src={user.profileImg}
                      className="rounded-full border border-web2 w-6 mr-1 md:mr-2 md:w-9"
                    />
                  </div>
                  <p className="text-web3 font-bold text-sm md:text-base">
                    {user.username}
                  </p>
                </div>
                {showUserMenu && (
                  <div className="absolute bg-web2 px-3 py-2 rounded-md">
                    <UserMenu />
                  </div>
                )}
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
