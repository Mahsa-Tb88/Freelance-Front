import React from "react";
import { FaStar } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
export default function ListOfReviews() {
  return (
    <div>
      <div className="border-b pb-3 mb-5">
        <div className="flex items-center">
          <div>
            <img
              width={25}
              className="rounded-full mr-3"
              src={SERVER_URL + "/uploads/profiles/profile1722016584144.png"}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">username</span>
            <span className="text-sm">country</span>
          </div>
        </div>
        <div className="flex mt-4">
          {Array(3)
            .fill("0")
            .map((i,index) => {
              return (
                <span className=" text-yellow-500 mx-px" key={index}>
                  <FaStar />
                </span>
              );
            })}
        </div>
        <div className="my-4">descsfsfsfsfsfs</div>
        <div className="flex gap-3">
          <h3>helpful?</h3>
          <div className="flex items-center">
            <SlLike className="hover:text-web4  cursor-pointer" />
            <span>Yes</span>
          </div>
          <div className="flex items-center">
            <SlDislike className="hover:text-web4 cursor-pointer" />
            <span className="ml-0.5">No</span>
          </div>
        </div>
      </div>
      <div className="border-b pb-3 mb-5">
        <div className="flex items-center">
          <div>
            <img
              width={25}
              className="rounded-full mr-3"
              src={SERVER_URL + "/uploads/profiles/profile1722016584144.png"}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">username</span>
            <span className="text-sm">country</span>
          </div>
        </div>
        <div className="flex mt-4">
          {Array(3)
            .fill("0")
            .map((i, index) => {
              return (
                <span className=" text-yellow-500 mx-px" key={index}>
                  <FaStar />
                </span>
              );
            })}
        </div>
        <div className="my-4">descsfsfsfsfsfs</div>
        <div className="flex gap-3">
          <h3>helpful?</h3>
          <div className="flex items-center">
            <SlLike className="hover:text-web4  cursor-pointer" />
            <span>Yes</span>
          </div>
          <div className="flex items-center">
            <SlDislike className="hover:text-web4 cursor-pointer" />
            <span className="ml-0.5">No</span>
          </div>
        </div>
      </div>
    </div>
  );
}
