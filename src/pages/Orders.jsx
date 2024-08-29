import React, { useEffect } from "react";
import { useGetOrders } from "../utils/queries";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/slices/userSlices";
export default function Orders() {
  const { data, isPending, isError, error } = useGetOrders();
  const user = useSelector((state) => state.user.user);
  console.log(user);

  // const user = useSelector((state) => state.user.user);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (data) {
  //     dispatch(userActions.setUser({ ...user, orders: data.data.body }));
  //   }
  // }, []);

  function dateOfOrder(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based in JavaScript
    const day = date.getDate();
    return year + "/" + month + "/" + day;
  }

  if (data) {
    console.log("data orders", data.data.body);
  }

  return (
    <div className="w-5/6 mx-auto my-20 flex justify-center items-center">
      {isPending ? (
        <div className="text-xl text-web3 font-semibold">loading</div>
      ) : isError ? (
        <div className="text-xl text-red-700 font-semibold">
          {error.response.data.message}
        </div>
      ) : !data.data.body.length ? (
        <div className="text-xl text-web3 font-semibold">
          There is no order!
        </div>
      ) : (
        <div>
          <table className="border-collapse table-auto  border border-web3 ">
            <thead>
              <tr>
                <th className="border border-web2 font-bold text-web3 py-4 text-xl px-2">
                  Title
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xl px-2">
                  Image
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xl px-2">
                  {user.isSeller ? "Buyer" : "Seller"}
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xl px-2">
                  Payment Id
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xl px-2">
                  Date
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xl px-2">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.body.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className="border border-web2 text-web4 text-sm  hover:bg-web2 ">
                      <Link
                        to={`/product/` + item.productId}
                        className=" flex justify-center items-center px-4 py-2 "
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="border  rounded-full border-web2 text-web4 text-sm px-4 py-2">
                      <img src={SERVER_URL + item.img} className="w-10" />
                    </td>
                    <td className="border border-web2 text-web4 text-sm px-4 py-2">
                      <span className="flex justify-center items-center">
                        {user.isSeller
                          ? item.buyerId.username
                          : item.sellerId.username}
                      </span>
                    </td>
                    <td className="border border-web2 text-web4 text-sm px-4 py-2">
                      <span className="flex justify-center items-center">
                        {item.payment_intent.slice(3)}
                      </span>
                    </td>
                    <td className="border border-web2 text-web4 text-sm px-4 py-2">
                      <span className="flex justify-center items-center">
                        {dateOfOrder(item.createdAt)}
                      </span>
                    </td>
                    <td className="border border-web2 text-web3 px-4 py-2 text-lg">
                      <Link
                        to={"/chat/" + (item.productId + item.buyerId._id)}
                        className="flex justify-center items-center transform transition-transform duration-300 hover:scale-150 cursor-pointer"
                      >
                        <IoChatbubbleEllipsesOutline />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
