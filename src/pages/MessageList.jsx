import React, { useEffect } from "react";
import { useGetMessageList, useGetOrders } from "../utils/queries";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { userActions } from "../store/slices/userSlices";
import { Helmet } from "react-helmet";

export default function MessageList() {
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
    <div className="px-2 lg:px-0 lg:w-5/6 mx-auto my-36 flex justify-center items-center">
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
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className=" font-bold text-web3 text-lg lg:text-3xl mb-8">
            Messages
          </h1>

          <table className="border-collapse w-full  border border-web3 ">
            <thead>
              <tr>
                <th className="border border-web2 font-bold text-web3 py-4 text-xxxs md:text-base lg:text-xl px-1 md:px-2">
                  From
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xxxs md:text-base lg:text-xl px-1 md:px-2">
                  To
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xxxs md:text-base lg:text-xl px-1 md:px-2">
                  Product
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xxxs md:text-base lg:text-xl px-1 md:px-2">
                  Last Message
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xxxs md:text-base lg:text-xl px-1 md:px-2">
                  Date
                </th>

                <th className="border border-web2 font-bold text-web3 py-4 text-xxxs md:text-base lg:text-xl px-1 md:px-2">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.body.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className="border text-center border-web2 text-web4 text-xxxs px-1 md:text-xs lg:text-sm  lg:px-4 py-2">
                      {item.from.replace(/(^\w|[\s_]\w)/g, (match) =>
                        match.toUpperCase()
                      )}
                    </td>
                    <td className="border text-center border-web2 text-web4 text-xxxs px-1 md:text-xs lg:text-sm  lg:px-4 py-2">
                      {item.to.replace(/(^\w|[\s_]\w)/g, (match) =>
                        match.toUpperCase()
                      )}
                    </td>
                    <td className="border text-center  rounded-full border-web2 text-web4 text-xxxs px-1 md:text-xs lg:text-sm lg:px-4 py-2">
                      {item.product}
                    </td>
                    <td className="border text-center  rounded-full border-web2 text-web4 text-xxxs px-1 md:text-xs lg:text-sm lg:px-4 py-2">
                      {item.lastMsg.substring(1, 20)}...
                    </td>
                    <td className="border border-web2 text-web4 text-xxxs  md:text-xs lg:text-sm lg:px-4 py-2">
                      <div className="flex justify-center items-center">
                        <span className="mr-2">
                          {timeOrder(item.updatedAt)}{" "}
                        </span>
                        <span>{dateOrder(item.updatedAt)}</span>
                      </div>
                    </td>
                    <td className="border border-web2 text-web3 px-4 py-2 text-base md:text-lg">
                      <Link
                        to={"/chat/" + item.chatId}
                        className="flex justify-center items-center transform transition-transform duration-300 hover:scale-110  cursor-pointer"
                      >
                        {!item.isSeen &&
                        item.to.replace(/(^\w|[\s_]\w)/g, (match) =>
                          match.toUpperCase()
                        ) == user.username ? (
                          <span className="text-red-700 text-base">
                            New Message
                          </span>
                        ) : (
                          <span>
                            <IoChatbubbleEllipsesOutline />
                          </span>
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
