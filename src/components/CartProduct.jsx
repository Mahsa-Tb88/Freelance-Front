import React from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CartProduct({ p }) {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="flex flex-col overflow-hidden shadow-md rounded-md border  mb-16 ">
      <Link className="rounded-md cursor-pointer " to={`/product/${p._id}`}>
        <img src={SERVER_URL + p.coverImage} />
      </Link>
      <div className="px-2 py-4 mt-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-web4 font-bold text-xl">{p.title}</h3>
          <div className="flex justify-start items-center">
            <span>
              <FaStar className=" text-yellow-300" />
            </span>
            <span className="ml-1">{p.totalStar}</span>
          </div>
        </div>
        <p className="text-web4 text-justify mt-5">
          {p.desc.substring(1, 70)}...
        </p>
        <div className="text-web4 font-extrabold text-lg flex justify-between items-center mt-5">
          <h5>Price</h5>{" "}
          <span>
            $ {p.price} {p.category}
            {}
          </span>
        </div>
        <div className="flex justify-start items-center mt-3">
          <h5 className="text-web3 text-sm font-semibold mr-2">
            Revision Number
          </h5>
          <span className="text-web3 text-sm font-semibold">
            {p.revisionNumber}
          </span>
        </div>
        <div className="flex justify-start items-center mt-2">
          <h5 className="text-web3 text-sm font-semibold mr-2">
            Delivery Time
          </h5>
          <span className="text-web3 text-sm font-semibold">
            {p.deliveryTime}
          </span>
        </div>
      </div>
      {user.isSeller && (
        <button className="w-full flex">
          <Link
            to={`/editProduct/${p._id}`}
            className="bg-web2 text-web4 font-semibold hover:text-web1 hover:bg-web3 py-3 w-full"
          >
            Edit
          </Link>
        </button>
      )}
    </div>
  );
}
