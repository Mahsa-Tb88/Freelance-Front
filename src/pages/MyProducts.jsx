import React, { useEffect } from "react";
import { useGetAllProductsOfSeller } from "../utils/queries";
import { useParams } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { userActions } from "../store/slices/userSlices";

export default function MyProducts() {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const { isPending, isError, data, error } = useGetAllProductsOfSeller(id);

  useEffect(() => {
    dispatch(userActions.setOpenUserMenu(false));
  });

  if (data) {
    if (!data.data.body.length) {
      return (
        <div className="mt-32 text-center text-2xl font-bold text-web3">
          No product has been created yet!
        </div>
      );
    }
  }
  return (
    <div className="mt-16">
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
          <h1 className="text-center mb-20 text-web3 text-3xl font-bold">
            My Products
          </h1>
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
