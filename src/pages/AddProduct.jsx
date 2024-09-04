import React from "react";
import FormProduct from "./FormProduct";
import { Helmet } from "react-helmet";

export default function AddProduct() {
  return (
    <div className="w-5/6 mx-auto my-20">
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <FormProduct type="new" />
    </div>
  );
}
