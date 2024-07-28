import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UserMenu() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="flex flex-col justify-center items-start gap-3 py-2 ">
      {user.isSeller && (
        <div className="flex flex-col">
          <Link className="text-web1 hover:text-web4 hover:bg-web1 px-2 rounded-md">My Products</Link>
          <Link className="text-web1 hover:text-web4 hover:bg-web1 px-2 rounded-md">Add New Product</Link>
        </div>
      )}
      <Link className="text-web1 hover:text-web4 hover:bg-web1 px-2 rounded-md">Orders</Link>
      <Link className="text-web1 hover:text-web4 hover:bg-web1 px-2 rounded-md">Messages</Link>
      <Link className="text-web1 hover:text-web4 hover:bg-web1 px-2 rounded-md">SignOut</Link>
    </div>
  );
}
