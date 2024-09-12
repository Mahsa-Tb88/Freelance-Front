import React, { useEffect, useState } from "react";
import { useGetOrders, useGetProductById } from "../utils/queries";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import FormReviewSend from "../components/FormReviewSend";
import ListOfReviews from "../components/ListOfReviews";
import InfoProduct from "../components/InfoProduct";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

export default function Product() {
  const params = useParams();
  const { data, isPending, isError, error } = useGetProductById(params.id);
  const user = useSelector((state) => state.user.user);
  const orders = useGetOrders();

  let findOrder = [];
  if (orders.data) {
    findOrder = orders.data.data.body.filter(
      (order) => order.productId == params.id
    );
  }

  function dateMembership(dateString) {
    const myDate = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = myDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      {isPending ? (
        <div className="mt-32">
          <Helmet>
            <title>Product</title>
          </Helmet>
          <h2 className="text-web3 text-center font-bold text-3xl">
            Loading...
          </h2>
        </div>
      ) : isError ? (
        <div className="mt-32">
          <h2 className="text-web3 text-center font-bold text-3xl">
            {error.response.data.message}
          </h2>
        </div>
      ) : (
        <div className="mt-28">
          <div className="px-20 mt-5 flex items-center gap-2 text-web2 font-extrabold">
            <span>Product</span>
            <span>
              <IoIosArrowForward />
            </span>
            <span>{data.data.body.category}</span>
            <span>
              <IoIosArrowForward />
            </span>
            <span>
              {data.data.body.sellerId.username.replace(
                /(^\w|[\s_]\w)/g,
                (match) => match.toUpperCase()
              )}
            </span>
          </div>
          <div className="flex flex-col md:flex-row px-20 justify-between gap-20 my-14">
            <div className=" w-2/3">
              <div>
                <h1 className="mb-4 text-3xl text-web4">
                  {data.data.body.title}
                </h1>
                <div className="flex items-center mb-3">
                  <span>
                    <img
                      width={35}
                      className="rounded-full mr-2"
                      src={
                        SERVER_URL + data.data.body.sellerId.profileImg ||
                        SERVER_URL +
                          "/uploads/profiles/profile1722016584144.png"
                      }
                    />
                  </span>
                  <span className="text-web3 mr-2">
                    {data.data.body.sellerId.username.replace(
                      /(^\w|[\s_]\w)/g,
                      (match) => match.toUpperCase()
                    )}
                  </span>
                  <div className="flex ">
                    {Array(data.data.body.totalStar)
                      .fill("0")
                      .map((i, index) => {
                        return (
                          <span className=" text-yellow-500 mx-px" key={index}>
                            <FaStar />
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              {data.data.body.albumImage.length ? (
                <Slider {...settings}>
                  <div>
                    <img src={SERVER_URL + data.data.body.coverImage} />
                  </div>
                  {data.data.body.albumImage.map((s) => {
                    return (
                      <div key={s}>
                        <img src={SERVER_URL + s} />
                      </div>
                    );
                  })}
                </Slider>
              ) : (
                <div>
                  <img src={SERVER_URL + data.data.body.coverImage} />
                </div>
              )}

              <div className="bg-web1 px-2 py-3 mt-24 mb-12 rounded-md">
                <h3 className=" text-web3 font-bold">About This Product</h3>
                <p className="text-web4 mt-3">{data.data.body.desc}</p>
              </div>
              <div className="border  px-2 py-5 rounded-md">
                <h3 className="mb-4 text-web4 font-bold">About this Seller</h3>
                <div className="flex items-center">
                  <img
                    width={70}
                    className="rounded-full mr-3"
                    src={
                      SERVER_URL + data.data.body.sellerId.profileImg ||
                      SERVER_URL + "/uploads/profiles/profile1722016584144.png"
                    }
                  />
                  <div className="flex flex-col ">
                    <span className="text-web4 font-bold">
                      {data.data.body.sellerId.username}
                    </span>
                    <div className="flex my-2">
                      {Array(data.data.body.totalStar)
                        .fill("0")
                        .map((i, index) => {
                          return (
                            <span
                              className=" text-yellow-500 mx-px"
                              key={index}
                            >
                              <FaStar />
                            </span>
                          );
                        })}
                    </div>
                    {findOrder.length ? (
                      <Link
                        to={"/chat/" + params.id + user.id}
                        className="bg-web1 border border-web3 text-web3 px-2 py-1 rounded-md hover:bg-web3 hover:text-web1"
                      >
                        Contact me
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className=" px-2 py-3 mt-3 rounded-md flex items-center justify-between">
                  <div>
                    <div className="mb-3">
                      <span className="text-web4 font-bold">From: </span>
                      <span className="text-web3 font-bold">
                        {data.data.body.sellerId.country}
                      </span>
                    </div>
                    <div>
                      <span className="text-web4 font-bold">
                        Ave Response Time:
                      </span>
                      <span className="text-web3 font-bold">
                        {data.data.body.sellerId.aveResponseTime}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="mb-3">
                      <span className="text-web4 font-bold">Language:</span>
                      <span className="text-web3 font-bold">
                        {data.data.body.sellerId.language || "English"}
                      </span>
                    </div>
                    <div>
                      <span className="text-web4 font-bold">Member Since:</span>
                      <span className="text-web3 font-bold">
                        {dateMembership(data.data.body.sellerId.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-9">
                <ListOfReviews />
                {findOrder.length && user.username && !user.isSeller ? (
                  <FormReviewSend />
                ) : (
                  ""
                )}
              </div>
            </div>
            {!user.isSeller ? (
              <div className=" w-1/3">
                <InfoProduct data={data.data.body} id={params.id} />
              </div>
            ) : (
              <div className=" w-1/3 ">
                <div className="bg-web1 text-web3 px-3 pt-3 pb-11 text-xl font-bold rounded">
                  <div className="flex items-center">
                    <span>
                      <IoInformationCircleSharp />
                    </span>
                    <span className=" ml-2">Notice:</span>
                  </div>

                  <p className="">
                    If you would like to buy this product, you need to register
                    as a buyer.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
