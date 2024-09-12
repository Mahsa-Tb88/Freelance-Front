import React, { useEffect, useState } from "react";
import { useGetOrders, useSeenOrder } from "../utils/queries";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaCalendarCheck } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/slices/userSlices";
import { useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
export default function Orders() {
  const { data, isPending, isError, error } = useGetOrders();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const orderMutation = useSeenOrder();
  const [failMessage, setFailMessage] = useState(false);

  useEffect(() => {
    dispatch(userActions.setOpenUserMenu(false));
  }, []);

  function dateOfOrder(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based in JavaScript
    const day = date.getDate();
    return year + "/" + month + "/" + day;
  }
  const querryClient = useQueryClient();

  function seenOrerHandler(id) {
    dispatch(
      userActions.setUser({ ...user, unSeenOrders: user.unSeenOrders - 1 })
    );

    orderMutation.mutate(
      { id },
      {
        onSuccess() {
          querryClient.invalidateQueries({
            queryKey: ["orders"],
          });
        },
        onError(error) {
          console.log(error);
          setFailMessage(error.data.data.message);
        },
      }
    );
  }

  return (
    <div className="px-2 lg:px-0 lg:w-5/6 lg:mx-auto my-36 flex justify-center items-center">
      <Helmet>
        <title>Orders</title>
      </Helmet>
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
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className=" font-bold text-web3 text-lg lg:text-3xl mb-8">
            Orders
          </h1>
          <table className="border-collapse table-autvo w-full  border border-web3 ">
            <thead>
              <tr>
                <th className="border border-web2 font-bold text-web3 py-4 text-xxxs md:text-base lg:text-xl px-1 md:px-2">
                  Title
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xxxs md:text-base lg:text-xl px-1 md:px-2">
                  Image
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xxxs md:text-base lg:text-xl px-1 md:px-2">
                  {user.isSeller ? "Buyer" : "Seller"}
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xxxs md:text-base lg:text-xl px-1 md:px-2">
                  Payment Id
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xxxs md:text-base lg:text-xl px-1 md:px-2">
                  Date
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xxxs md:text-base lg:text-xl px-1 md:px-2">
                  Message
                </th>
                {user.isSeller && (
                  <th className="border border-web2 font-bold text-web3 py-4 text-xxxs md:text-base lg:text-xl px-1 md:px-2">
                    Seen Status
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.data.body.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className="border border-web2 text-web4 text-xxxs px-1 md:text-xs lg:text-sm lg:px-4 py-2  hover:bg-web2 hover:text-web1 ">
                      <Link
                        to={`/product/` + item.productId}
                        className={`flex justify-center items-center px-4 py-2 `}
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="border  rounded-full border-web2 text-web4 text-xxxs px-1 md:text-xs lg:text-sm lg:px-4 py-2">
                      <img src={SERVER_URL + item.img} className="w-10" />
                    </td>
                    <td className="border border-web2 text-web4 text-xxxs px-1 md:text-xs lg:text-sm lg:px-4 py-2">
                      <span className="flex justify-center items-center">
                        {user.isSeller
                          ? item.buyerId.username.replace(
                              /(^\w|[\s_]\w)/g,
                              (match) => match.toUpperCase()
                            )
                          : item.sellerId.username.replace(
                              /(^\w|[\s_]\w)/g,
                              (match) => match.toUpperCase()
                            )}
                      </span>
                    </td>
                    <td className="border border-web2 text-web4 text-xxxs px-1 md:text-xs lg:text-sm lg:px-4 py-2">
                      <span className="flex justify-center items-center">
                        {item.payment_intent.slice(3)}
                      </span>
                    </td>
                    <td className="border border-web2 text-web4 text-xxxs px-1 md:text-xs lg:text-sm lg:px-4 py-2">
                      <span className="flex justify-center items-center">
                        {dateOfOrder(item.createdAt)}
                      </span>
                    </td>
                    <td className="border border-web2 text-web3 text-xxxs px-1 md:text-xs lg:text-sm lg:px-4 py-2">
                      <Link
                        to={"/chat/" + (item.productId + item.buyerId._id)}
                        className="flex justify-center items-center transform transition-transform duration-300 hover:scale-150 cursor-pointer"
                      >
                        <IoChatbubbleEllipsesOutline />
                      </Link>
                    </td>
                    {user.isSeller && (
                      <td className="border border-web2 text-web3 px-4 py-2 text-sm lg:text-lg ">
                        {item.isSeen ? (
                          <p className="text-emerald-600 flex justify-center items-center">
                            <FaCalendarCheck />
                          </p>
                        ) : (
                          <p
                            className="flex justify-center items-center  text-red-500 cursor-pointer hover:text-emerald-600"
                            onClick={() => seenOrerHandler(item._id)}
                          >
                            <FaCalendar />
                          </p>
                        )}
                      </td>
                    )}
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
