import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { BsArrowRepeat } from "react-icons/bs";
import { Link } from "react-router-dom";
export default function InfoProduct({ data, id }) {
  return (
    <div className="border px-2 py-4 rounded-md bg-web1">
      <div className="flex items-center justify-between">
        <h2 className="text-web4 text-lg font-bold">{data.serviceTitle}</h2>
        <span className="text-web4 text-lg font-bold">${data.price}</span>
      </div>
      <p className="my-5 text-web4">{data.shortDesc}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CiDeliveryTruck className="text-web3 font-bold text-lg mr-1" />
          <span className="text-web4 text-sm mr-0.5">Days Delivery: </span>
          <span className="text-web4 text-sm">{data.deliveryTime} </span>
        </div>
        <div className="flex items-center">
          <BsArrowRepeat className="text-web3 font-bold mr-1" />
          <span className="text-web4 text-sm mr-0.5">{data.deliveryTime} </span>
          <span className="text-web4 text-sm">Revisions</span>
        </div>
      </div>
      <div className="mt-3">
        {data.features.map((p) => {
          return (
            <div className="flex items-center" key={p}>
              <span className="text-web3 text-sm">
                <FaCheck />
              </span>
              <span className="ml-1 text-sm text-web4">{p}</span>
            </div>
          );
        })}
      </div>
      <div className="bg-web3 mt-7 w-full text-center text-web1 rounded-md text-lg hover:bg-web4">
        <Link className="w-full inline-block py-2" to={`/pay/${id}`}>
          Continue
        </Link>
      </div>
    </div>
  );
}
