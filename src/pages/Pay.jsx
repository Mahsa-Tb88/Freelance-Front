import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import { usePayment } from "../utils/queries";
import CheckOutForm from "./CheckOutForm";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51PaJL9HQVpJWtZk8i2ClXk2rLzojU8607POTCMyMRNc6JogZS5UjrSUVZVCmqqLzRcxiryjOOGbNZxPNDfGFSBcu00xUHYbwMJ"
);

export default function Pay() {
  const { id } = useParams();

  const [clientSecret, setClientSecret] = useState("");
  const [failMessage, setFailMessage] = useState(false);
  const mutationPayment = usePayment();

  useEffect(() => {
    mutationPayment.mutate(
      { id },
      {
        onSuccess(data) {
          setClientSecret(data.data.body.clientSecret);
        },
        onError(error) {
          setFailMessage(error.response.data.message);
        },
      }
    );
  }, []);
  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await axios.post(`/api/orders/create-payment-intent/${id}`);
  //       setClientSecret(res.data.body.clientSecret);
  //     } catch (err) {
  //       setFailMessage(err.response.data.message);
  //     }
  //   };
  //   makeRequest();
  // }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (failMessage) {
    return (
      <div className=" text-red-500 flex items-center justify-center my-28 w-2/3 mx-auto text-3xl py-3">
        {failMessage}
      </div>
    );
  }

  return (
    <div className="w-5/6 mx-auto my-20">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      )}
    </div>
  );
}
