import React from "react";
import FormProduct from "./FormProduct";
import { useParams } from "react-router-dom";
import { useGetProductById } from "../utils/queries";

export default function EditProduct() {
  const params = useParams();
  const id = params.id;

  const { isPending, isError, data } = useGetProductById(id);
  console.log(data?.data.body);

  return (
    <div className="w-5/6 mx-auto my-20">
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
          <h1 className="text-web3 text-3xl sm:text-4xl">Edit Product</h1>
          <FormProduct product={data.data.body} type="edit" id={id} />
        </div>
      )}
    </div>
  );
}
