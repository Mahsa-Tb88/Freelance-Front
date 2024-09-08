import React, { useEffect } from "react";
import FormProduct from "./FormProduct";
import { Helmet } from "react-helmet";
import { userActions } from "../store/slices/userSlices";
import { useDispatch } from "react-redux";

export default function AddProduct() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.setOpenUserMenu(false));
  });
  return (
    <div className="w-5/6 mx-auto my-20">
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <FormProduct type="new" />
    </div>
  );
}
