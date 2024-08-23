import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrderConfirm } from "../utils/queries";

export default function SuccessPayment() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [failMessage, setFailMessage] = useState(false);
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  console.log(payment_intent);

  const confirm = useOrderConfirm();

  // confirm.mutate(
  //   { payment_intent },
  //   {
  //     onSuccess() {
  //       setTimeout(() => {
  //         navigate("/Orders");
  //       }, 5000);
  //     },
  //     onError(error) {
  //       // setFailMessage(error)
  //       console.log("error...successPayment", error);
  //     },
  //   }
  // );

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const { data } = await axios.put("/api/orders", { payment_intent });
        console.log(data);
        const orderTime = setTimeout(() => {
          navigate("/Orders");
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
    // return () => clearTimeout(orderTime);
  }, []);

  return (
    <div className="w-2/3 mx-auto">
      <div className="bg-web1 rounded">
        <span>
          Paymet Successul. You are being redirected to order page, please do
          not close the page.
        </span>
      </div>
    </div>
  );
}
