import React from "react";
import FormProduct from "./FormProduct";
import { useParams } from "react-router-dom";
import { useGetProductById } from "../utils/queries";
import { Helmet } from "react-helmet";

export default function EditProduct() {
  const params = useParams();
  const id = params.id;

  const { isPending, isError, data } = useGetProductById(id);

  return (
    <div className="w-5/6 mx-auto my-20">
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      {isPending ? (
        <div className="flex justify-start items-center font-bold text-xl text-web3">
          <span>Loading</span>
        </div>
      ) : isError ? (
        <div>
          <span className="flex justify-start items-center font-bold text-xl text-red-700">
            Error
          </span>
        </div>
      ) : (
        <div>
          <FormProduct product={data.data.body} type="edit" id={id} />
        </div>
      )}
    </div>
  );
}
