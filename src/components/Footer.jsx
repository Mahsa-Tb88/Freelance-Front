import React from "react";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ImFacebook } from "react-icons/im";
import { IoLogoTwitter } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div className="bg-web1 text-web4">
      <div className="w-5/6 mx-auto py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="">
          <h5 className="mb-5 font-bold text-lg">
            <Link className="text-web3 font-extrabold" to="/">
              FREELANCE.
            </Link>
          </h5>
          <p className="w-11/12 text-justify">
            Lorem epsum nsnh bags dgshs shshhhs lbs maba yts aha bdb hshas jajs
            Aut similique explicabo aut reiciendis explicaboad.
          </p>
        </div>
        <div className="md:text-center mt-8 md:mt-0">
          <h5 className="mb-5 font-bold text-lg ">Contact Us</h5>
          <div className="flex flex-col justify-center md:items-center mb-3">
            <div className="flex justify-start items-center mb-3">
              <span className="mr-2">
                <FiPhone className="text-web2 font-bold" />
              </span>
              <span>+1-672-654-111</span>
            </div>
            <div className="flex justify-start items-center mb-3">
              <span className="mr-2">
                <MdOutlineMail className="text-web2 font-bold" />
              </span>
              <span>Mah@Freelanceer.com</span>
            </div>
          </div>
          <div className="flex md:justify-around items-center">
            <div className="px-3 rounded-full hover:bg-web2 h-7 w-7 flex justify-center items-center ">
              <span>
                <ImFacebook className="" />
              </span>
            </div>
            <div className="px-3 rounded-full hover:bg-web2 h-7 w-7 flex justify-center items-center ">
              <span>
                <IoLogoTwitter className="" />
              </span>
            </div>
            <div className="px-3 rounded-full hover:bg-web2 h-7 w-7 flex justify-center items-center ">
              <span>
                <FaYoutube className="" />
              </span>
            </div>
            <div className="px-3 rounded-full hover:bg-web2 h-7 w-7 flex justify-center items-center ">
              <span>
                <FaLinkedinIn className="" />
              </span>
            </div>
          </div>
        </div>
        <div className="md:text-center mt-8 lg:mt-0">
          <h5 className="mb-5 font-bold text-lg">Categories</h5>
          <div className="flex md:justify-center items-center border-b pb-1 mb-3 border-dashed border-web2">
            <span className="mr-2">
              <IoMdCheckmarkCircleOutline className="text-web2 " />
            </span>
            <span>Graphics & Designs</span>
          </div>
          <div className="flex md:justify-center items-center border-b pb-1 mb-3 border-dashed border-web2">
            <span className="mr-2">
              <IoMdCheckmarkCircleOutline className="text-web2 " />
            </span>
            <span>Degital Marketing</span>
          </div>
          <div className="flex md:justify-center items-center border-b pb-1 mb-3 border-dashed border-web2">
            <span className="mr-2">
              <IoMdCheckmarkCircleOutline className="text-web2 " />
            </span>
            <span>Writting & Translation</span>
          </div>
          <div className="flex md:justify-center items-center border-b pb-1 mb-3 border-dashed border-web2">
            <span className="mr-2">
              <IoMdCheckmarkCircleOutline className="text-web2 " />
            </span>
            <span>Videos & Animation</span>
          </div>
          <div className="flex md:justify-center items-center pb-1 mb-3 ">
            <span className="mr-2">
              <IoMdCheckmarkCircleOutline className="text-web2 " />
            </span>
            <span>Programming & Tech</span>
          </div>
        </div>
        <div className="md:text-center mt-8 lg:mt-0">
          <h5 className="mb-5 font-bold text-lg">Some Projects</h5>
          <div className="flex flex-col justify-center items-cener gap-3">
            <div className="flex md:justify-center items-center">
              <IoIosArrowForward className="mr-2 text-web2" />
              <Link className="hover:bg-web2 px-2 rounded-md hover:text-web1">Project 1</Link>
            </div>
            <div className="flex md:justify-center items-center">
              <IoIosArrowForward className="mr-2 text-web2" />
              <Link className="hover:bg-web2 px-2 rounded-md hover:text-web1">Project 2</Link>
            </div>
            <div className="flex md:justify-center items-center">
              <IoIosArrowForward className="mr-2 text-web2" />
              <Link className="hover:bg-web2 px-2 rounded-md hover:text-web1">Project 3</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
