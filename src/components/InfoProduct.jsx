import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { BiRevision } from "react-icons/bi";
export default function InfoProduct({ data }) {
  return (
    <div className="border px-2 py-4 rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-web4 text-lg">{data.serviceTitle}</h2>
        <span className="text-web4 text-lg">${data.price}</span>
      </div>
      <p className="my-5">{data.shortDesc}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CiDeliveryTruck />
          <span>Days Delivery: </span>
          <span>{data.deliveryTime} </span>
        </div>
        <div className="flex items-center">
          <BiRevision />
          <span>{data.deliveryTime} </span>
          <span>Revisions</span>
        </div>
      </div>
    </div>
  );
}
