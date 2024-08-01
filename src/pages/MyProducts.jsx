import React from "react";
import { useGetAllProductsOfSeller } from "../utils/queries";
import { useParams } from "react-router-dom";

export default function MyProducts() {
  const params = useParams();
  const id = params.id;
  const { isPending, isError, data } = useGetAllProductsOfSeller(id);
  console.log(data?.data.body);

  return (
    <div>
      {isPending ? (
        <div>is pending</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        data.data.body.map((p) => {
          return <div key={p._id}>{p.title}</div>;
        })
      )}
    </div>
  );
}
