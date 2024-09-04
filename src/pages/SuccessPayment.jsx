import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrderConfirm } from "../utils/queries";
import { Helmet } from "react-helmet";

export default function SuccessPayment() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [failMessage, setFailMessage] = useState(false);
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  const confirm = useOrderConfirm();

  useEffect(() => {
    let timeOut;

    confirm.mutate(
      { payment_intent },
      {
        onSuccess() {
          timeOut = setTimeout(() => {
            navigate("/Orders");
          }, 5000);
        },
        onError(error) {
          setFailMessage(error.response.data.message);
        },
      }
    );

    return () => clearTimeout(timeOut);
  }, []);

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const { data } = await axios.put("/api/orders", { payment_intent });
  //       console.log(data);
  //       const orderTime = setTimeout(() => {
  //         navigate("/Orders");
  //       }, 5000);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   makeRequest();
  //   // return () => clearTimeout(orderTime);
  // }, []);
  if (failMessage) {
    return (
      <div className="my-14 text-center">
        <span className="text-red-700 text-lg text-center">{failMessage}</span>
      </div>
    );
  }
  return (
    <div className="w-2/3 mx-auto  ">
      <Helmet>
        <title>Success Payment</title>
      </Helmet>
      <div className=" rounded flex justify-center items-center mt-20   ">
        <div className="text-green-600 font-bold flex flex-col justify-center items-center">
          <p className="mb-2 text-xl">Paymet Successul.</p>
          <p>
            You are being redirected to order page, please do not close the
            page.
          </p>
        </div>
      </div>
    </div>
  );
}
