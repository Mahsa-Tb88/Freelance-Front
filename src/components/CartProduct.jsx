import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRemoveProductById } from "../utils/queries";
import { useQueryClient } from "@tanstack/react-query";

export default function CartProduct({ p }) {
  const user = useSelector((state) => state.user.user);
  const querryClient = useQueryClient();

  const mutationDelete = useRemoveProductById();

  function removeCartHandler() {
    if (!confirm("Are you sure for deleting the product?")) {
      return;
    }
    mutationDelete.mutate(p._id, {
      onSuccess() {
        querryClient.invalidateQueries({
          queryKey: ["products"],
        });
        window.scrollTo({ top: 0, behavior: "instant" });
      },
      onError(error) {
        console.log(error);
        window.scrollTo({ top: 0, behavior: "instant" });
      },
    });
  }

  return (
    <div className="flex flex-col overflow-hidden shadow-md rounded-md border  mb-16 ">
      <Link
        className="rounded-md cursor-pointer w-full"
        to={`/product/${p._id}`}
      >
        <img src={SERVER_URL + p.coverImage} className="w-full h-44" />
      </Link>
      <div className="px-2 py-4 w-full mt-auto">
        <div className="flex justify-between items-center ">
          <h3 className="text-web4 font-bold text-xl hover:text-web3">
            <Link to={`/product/${p._id}`}>{p.title}</Link>
          </h3>
          <div className="flex justify-start items-center">
            <span>
              <FaStar className=" text-yellow-300" />
            </span>
            <span className="ml-1">{p.totalStar}</span>
          </div>
        </div>
        <p className="text-web4 text-justify h-28 bg-red-20m0">
          {p.desc.substring(1, 100)}...
        </p>
        <div className="text-web4 font-extrabold text-lg flex justify-between items-center mt-10">
          <h5>Price</h5>
          <span>$ {p.price}</span>
        </div>
      </div>
      {user.isSeller && p.sellerId == user.id ? (
        <button className="w-full flex justify-between items-center bg-web2 hover:text-web1   py-3 px-2 ">
          <div>
            <Link
              to={`/editProduct/${p._id}`}
              className=" text-web4 hover:text-web3 font-semibold  text-xl"
            >
              <BiEdit />
            </Link>
          </div>

          <div
            className="text-web4 hover:text-red-700 text-xl"
            onClick={() => removeCartHandler(p._id)}
          >
            <RiDeleteBin6Line />
          </div>
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
