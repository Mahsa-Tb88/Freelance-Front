import React from "react";
import { useForm } from "react-hook-form";
import { useCreateReview } from "../utils/queries";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function FormReviewSend() {
  const { register, handleSubmit, setValue } = useForm();
  const user = useSelector((state) => state.user.user);
  const params = useParams();

  const mutation = useCreateReview();

  const querryClient = useQueryClient();

  function onSubmit(formData) {
    formData.imgBuyer = user.profileImg.substring(21);
    formData.buyer = user.username;
    formData.buyerCountry = user.country;
    formData.id = params.id;
    mutation.mutate(formData, {
      onSuccess(data) {
        console.log("success", data.data);
        setValue("rateStar", "1");
        setValue("desc", "");
        querryClient.invalidateQueries({
          queryKey: ["reviews"],
        });
      },
      onError(error) {
        console.log(error);
      },
    });
  }

  return (
    <div>
      <form
        className="bg-web3 px-8 py-7 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="font-bold text-web1 mb-3">Add Your Review</h3>
        <textarea
          className="placeholder:text-gray-100 resize-none border w-full bg-transparent border-web2 rounded-md outline-none focus-within:border-web1 px-2 py-2 text-lg text-web1"
          rows={6}
          placeholder="write your review..."
          {...register("desc")}
        />
        <div>
          <select
            className="w-1/5 py-2 px-2 rounded-md cursor-pointer mt-4 bg-web1 border-web1"
            {...register("rateStar")}
          >
            {Array(5)
              .fill("0")
              .map((s, index) => {
                return (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                );
              })}
          </select>
        </div>
        <button
          type="submit"
          className="mt-10 bg-web1 text-web3 w-1/2 hover:bg-web4 hover:text-web1 py-2 text-xl text-center rounded-md cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
