import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { BiRevision } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
export default function InfoProduct({ data }) {
  return (
    <div className="border px-2 py-4 rounded-md bg-web1">
      <div className="flex items-center justify-between">
        <h2 className="text-web4 text-lg">{data.serviceTitle}</h2>
        <span className="text-web4 text-lg">${data.price}</span>
      </div>
      <p className="my-5 text-web4">{data.shortDesc}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CiDeliveryTruck className="text-web3 font-bold text-lg" />
          <span className="text-web4 text-sm">Days Delivery: </span>
          <span className="text-web4 text-sm">{data.deliveryTime} </span>
        </div>
        <div className="flex items-center">
          <BiRevision className="text-web3 font-bold " />
          <span className="text-web4 text-sm">{data.deliveryTime} </span>
          <span className="text-web4 text-sm">Revisions</span>
        </div>
      </div>
      <div className="mt-3">
        {data.features.map((p) => {
          return (
            <div className="flex items-center">
              <span className="text-web3 text-sm">
                <FaCheck />
              </span>
              <span className="ml-1 text-sm text-web4">{p}</span>
            </div>
          );
        })}
      </div>
      <button className="bg-web3 mt-4 w-full text-web1 py-2 rounded-md text-lg hover:bg-web4">Continue</button>
    </div>
  );
}
