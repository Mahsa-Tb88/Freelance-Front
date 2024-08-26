import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useReviews } from "../utils/queries";
import { useParams } from "react-router-dom";
import { HiThumbUp } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiOutlineThumbUp } from "react-icons/hi";
import { HiOutlineThumbDown } from "react-icons/hi";

export default function ListOfReviews() {
  const params = useParams();
  const { data, isPending, isError, error } = useReviews(params.id);
  const [isLike, setIsLike] = useState({ like: false, dislike: false });

  function dateReview(dateString) {
    const myDate = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = myDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  return (
    <div>
      {isPending ? (
        <div> loading...</div>
      ) : isError ? (
        <div>error...</div>
      ) : (
        <div>
          {data.data.body.length ? (
            <h3 className="text-4xl text-web4 mb-8">Reviews</h3>
          ) : (
            <div>No reviews yet</div>
          )}

          {data.data.body.map((review) => {
            return (
              <div className="border-b pb-3 mb-5" key={review._id}>
                <div className="bg-web1 px-2 py-3 mb-3 rounded-md">
                  <div className="flex items-center">
                    <div>
                      <img
                        width={25}
                        className="rounded-full mr-3"
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
                </div>
                <div className="flex gap-3">
                  <h3>helpful?</h3>
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
                    <span>Yes</span>
                  </div>
                  <div className="flex items-center">
                    <span
                      onClick={() => setIsLike({ like: false, dislike: true })}
                    >
                      {isLike.dislike ? (
                        <HiThumbDown className=" text-lg transform transition-transform duration-300 hover:scale-110 cursor-pointer" />
                      ) : (
                        <HiOutlineThumbDown className="text-lg transform transition-transform duration-300 hover:scale-110 cursor-pointer" />
                      )}
                    </span>
                    <span className="ml-0.5">No</span>
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
