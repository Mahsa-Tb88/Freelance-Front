import React from "react";
import { useGetOrders } from "../utils/queries";

export default function Orders() {
  const { data, isPending, isError, error } = useGetOrders();
  console.log(error);
  if (data) {
  }

  function dateOfOrder(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based in JavaScript
    const day = date.getDate();
    return year + "/" + month + "/" + day;
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
          <table className="border-collapse table-auto border border-web3 ">
            <thead>
              <tr>
                <th className="border border-web2 font-bold text-web3 py-4 text-xl px-2">
                  Title
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xl px-2">
                  Image
                </th>
                <th className="border border-web2 font-bold text-web3 py-4 text-xl px-2">
                  Seller
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
                    <td className="border border-web2 text-web4 text-sm px-4 py-2">
                      {item.title}
                    </td>
                    <td className="border  rounded-full border-web2 text-web4 text-sm px-4 py-2">
                      <img src={SERVER_URL + item.img} className="w-10" />
                    </td>
                    <td className="border border-web2 text-web4 text-sm px-4 py-2">
                      {item.seller}
                    </td>
                    <td className="border border-web2 text-web4 text-sm px-4 py-2">
                      {item.payment_intent}
                    </td>
                    <td className="border border-web2 text-web4 text-sm px-4 py-2">
                      {dateOfOrder(item.createdAt)}
                    </td>
                    <td className="border border-web2 text-web4 text-sm px-4 py-2">
                      Message
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
