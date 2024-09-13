import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDeleteReview, useReviews } from "../utils/queries";
import { useParams } from "react-router-dom";
import { HiThumbUp } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiOutlineThumbUp } from "react-icons/hi";
import { HiOutlineThumbDown } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

export default function ListOfReviews() {
  const params = useParams();
  const user = useSelector((state) => state.user.user);
  const { data, isPending, isError, error } = useReviews(params.id);
  const [isLike, setIsLike] = useState({ like: false, dislike: false });

  function dateReview(dateString) {
    const myDate = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = myDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  }
  const deleteReviewMutation = useDeleteReview();
  const querryClient = useQueryClient();
  function deleteReviewHandler(id) {
    if (!confirm("Are you sure for deleting the review?")) {
      return;
    }
    deleteReviewMutation.mutate(
      { id },
      {
        onSuccess() {
          querryClient.invalidateQueries({
            queryKey: ["reviews"],
          });
          querryClient.invalidateQueries({
            queryKey: ["product", params.id],
          });
        },
        onError(error) {
          console.log(error.response.data.message);
        },
      }
    );
  }

  return (
    <div>
      {isPending ? (
        <div> loading...</div>
      ) : isError ? (
        <div>{error}</div>
      ) : (
        <div>
          {data.data.body.length ? (
            <h3 className="text-4xl text-web4 mb-8">Reviews</h3>
          ) : (
            <div className="text-lg font-bold text-web4 bg-web2 px-2 py-3 border rounded text-center mb-7">
              No reviews yet
            </div>
          )}

          {data.data.body.map((review) => {
            return (
              <div className="border-b pb-3 mb-5" key={review._id}>
                <div className="bg-web1 px-2 py-3 mb-3 rounded-md">
                  <div className="flex items-center">
                    <div className="">
                      <img
                        
                        className="rounded-full mr-3 w-10 h-10"
                        src={SERVER_URL + review.imgBuyer}

                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-web3 font-semibold">
                        {review.buyer}
                      </span>
                      <span className="text-sm text-web3 font-semibold">
                        {review.buyerCountry}
                      </span>
                    </div>
                  </div>
                  <div className="flex mt-2">
                    {Array(parseInt(review.rateStar))
                      .fill("0")
                      .map((i, index) => {
                        return (
                          <span className=" text-yellow-500 mx-px" key={index}>
                            <FaStar />
                          </span>
                        );
                      })}
                  </div>
                  <div className="my-4 text-web4 text-lg">{review.desc}</div>
                  <div className="text-web4 text-sm mt-3 flex justify-end">
                    {dateReview(review.createdAt)}
                  </div>
                  {user.username == review.buyer && (
                    <div
                      className="text-web4 hover:text-red-700 cursor-pointer"
                      onClick={() => deleteReviewHandler(review._id)}
                    >
                      <RiDeleteBinLine />
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <h3 className="text-web4">helpful?</h3>
                  <div className="flex items-center">
                    <span
                      onClick={() => setIsLike({ like: true, dislike: false })}
                    >
                      {isLike.like ? (
                        <HiThumbUp className=" text-lg transform transition-transform duration-300 hover:scale-110 cursor-pointer" />
                      ) : (
                        <HiOutlineThumbUp className=" text-lg transform transition-transform duration-300 hover:scale-110 cursor-pointer" />
                      )}
                    </span>
                    <span className="text-web4">Yes</span>
                  </div>
                  <div className="flex items-center">
                    <span
                      onClick={() => setIsLike({ like: false, dislike: true })}
                    >
                      {isLike.dislike ? (
                        <HiThumbDown className="text-lg transform transition-transform duration-300 hover:scale-110 cursor-pointer" />
                      ) : (
                        <HiOutlineThumbDown className="text-lg transform transition-transform duration-300 hover:scale-110 cursor-pointer" />
                      )}
                    </span>
                    <span className="ml-0.5 text-web4">No</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
