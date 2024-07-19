import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-web1 text-web4">
      <div className="w-11/12 mx-auto">
        <nav className="w-11/12 h-20 mx-auto flex justify-between items-center">
          <div>
            <Link to="/" className="font-extrabold text-xl">
              FREELANCE.
            </Link>
          </div>
          <div className="flex justify-center items-center h-20 gap-10">
            <NavLink
              className="font-semibold h-full flex items-center text-lg"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="font-semibold h-full flex items-center text-lg"
              to="blogs"
            >
              Blogs
            </NavLink>
            <NavLink
              className="font-semibold h-full flex items-center text-lg"
              to="contactUs"
            >
              Contact us
            </NavLink>
            <NavLink
              className="font-semibold h-full flex items-center text-lg"
              to="aboutUs"
            >
              About us
            </NavLink>
          </div>
          <div>
            <Link>
              <button className="border-web2 hover:bg-web3 hover:text-web1 border px-3 py-1 rounded-md font-semibold text-lg mx-2">
                Sign in
              </button>
            </Link>
            <Link>
              <button className="bg-web2 hover:bg-web3 hover:text-web1 font-semibold text-lg border px-3 py-1 rounded-md">
                Join us
              </button>
            </Link>
          </div>
        </nav>
        <div className=" max-w-5xl mx-auto  mt-7 flex justify-between items-center gap-12">
          <div className="mb-16">
            <h2 className="text-4xl font-semibold ">
              Find the perfect freelance services for your business
            </h2>
            <div className="mb-4 mt-8 w-full flex justify-center items-center border rounded-md border-web4 overflow-hidden">
              <input className="w-full h-10 rounded-l-md" />
              <button className="text-md px-3 h-10 font-semibold bg-web2 rounded-r-md hover:bg-web3 hover:text-web1">
                Search
              </button>
            </div>
            <div className="flex justify-between items-center ">
              <h3 className="font-semibold mr-3">popular:</h3>
              <div className="flex justify-between items-center flex-1">
                <button className="border font-semibold border-web4 hover:bg-web3 hover:border-web3 hover:text-web1 text-web4 px-6 py-1 rounded-2xl">
                  Desin
                </button>
                <button className="border font-semibold border-web4 hover:bg-web3 hover:border-web3 hover:text-web1 text-web4 px-6 py-1 rounded-2xl">
                  Fronend
                </button>
                <button className="border font-semibold border-web4 hover:bg-web3 hover:border-web3 hover:text-web1 text-web4 px-6 py-1 rounded-2xl">
                  Backend
                </button>
                <button className="border font-semibold border-web4 hover:bg-web3 hover:border-web3 hover:text-web1 text-web4 px-6 py-1 rounded-2xl">
                  Logo
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className=" float-end ">
              <img src="././public/img/girl.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
