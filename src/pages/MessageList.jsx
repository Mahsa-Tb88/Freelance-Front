import React, { useEffect } from "react";
import { useGetMessageList, useGetOrders } from "../utils/queries";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { userActions } from "../store/slices/userSlices";
import { Helmet } from "react-helmet";

export default function MessageList() {
  console.log("meesgae comp");
  const { id } = useParams();
  const { data, isPending, isError, error } = useGetMessageList(id);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  function dateOrder(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based in JavaScript
    const day = date.getDate();
    return day + "/" + month + "/" + year;
  }
  function timeOrder(time) {
    const createdAt = new Date(time);

    const hours = createdAt.getHours().toString().padStart(2, "0");
    const minutes = createdAt.getMinutes().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }

  useEffect(() => {
    dispatch(userActions.setOpenUserMenu(false));
  }, []);

  return (
    <div className="w-5/6 mx-auto my-36 flex justify-center items-center">
      <Helmet>
        <title>Message's List</title>
      </Helmet>
      {isPending ? (
        <div className="text-center">
          <h2 className="text-center text-lg font-bold text-web4">
            Loading...
          </h2>
        </div>
      ) : isError ? (
        <div>
          <h2 className="text-center font-bold text-red-700 text-lg">
            {error}
          </h2>
        </div>
      ) : data.data.body.length ? (
        <div className="w-full">
          <table className="border-collapse w-full  border border-web3 ">
            <thead>
              <tr>
                <th className="border border-web2 font-bold text-web3 py-4 text-xl px-2">
                  From
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xl px-2">
                  to
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xl px-2">
                  Product
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xl px-2">
                  Last Message
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
                    <td className="border text-center border-web2 text-web4 text-sm  ">
                      {item.from}
                    </td>
                    <td className="border text-center border-web2 text-web4 text-sm  ">
                      {item.to}
                    </td>
                    <td className="border text-center  rounded-full border-web2 text-web4 text-sm px-4 py-2">
                      {item.product}
                    </td>
                    <td className="border text-center  rounded-full border-web2 text-web4 text-sm px-4 py-2">
                      {item.lastMsg}
                    </td>
                    <td className="border border-web2 text-web4 text-sm px-4 py-2">
                      <span className="flex justify-center items-center">
                        {timeOrder(item.updatedAt)}
                        {dateOrder(item.updatedAt)}
                      </span>
                    </td>
                    <td className="border border-web2 text-web3 px-4 py-2 text-lg">
                      <Link
                        to={"/chat/" + item.chatId}
                        className="flex justify-center items-center transform transition-transform duration-300 hover:scale-110  cursor-pointer"
                      >
                        {!item.isSeen && item.to == user.username ? (
                          <span className="text-red-700 text-base">
                            New Message
                          </span>
                        ) : (
                          <IoChatbubbleEllipsesOutline />
                        )}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2 className="text-center font-bold text-web3 text-lg">
            There is no message!
          </h2>
        </div>
      )}
    </div>
  );
}
