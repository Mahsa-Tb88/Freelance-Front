import React from "react";
import { useGetAllProductsOfSeller } from "../utils/queries";
import { useParams } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import { Helmet } from "react-helmet";

export default function MyProducts() {
  const params = useParams();
  const id = params.id;
  const { isPending, isError, data, error } = useGetAllProductsOfSeller(id);

  return (
    <div>
      <Helmet>
        <title>Product</title>
      </Helmet>
      {isPending ? (
        <div className="flex justify-center items-center font-bold text-xl text-web3 my-20">
          <span>Loading</span>
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center font-bold text-xl text-red-700 my-20">
          <span>{error.data.response.message}</span>
        </div>
      ) : (
        <div className="w-10/12 mx-auto my-32 ">
          <div className="grid  md:grid-cols-4 gap-5">
            {data.data.body.map((p) => {
              return <CartProduct p={p} key={p._id} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
