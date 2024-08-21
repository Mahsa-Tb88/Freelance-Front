import React from "react";
import { useGetProductById } from "../utils/queries";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";

import FormReviewSend from "../components/FormReviewSend";
import ListOfReviews from "../components/ListOfReviews";
import InfoProduct from "../components/InfoProduct";

export default function Product() {
  const params = useParams();
  const { data, isPending, isError } = useGetProductById(params.id);
  console.log("data of product....", data?.data.body);

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
        <div>Loading</div>
      ) : isError ? (
        <div>error</div>
      ) : (
        <div>
          <div>prr</div>
          <div className="flex flex-col md:flex-row px-20 justify-between gap-20 my-20">
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
                        data.data.body.sellerId.profileImg ||
                        SERVER_URL +
                          "/uploads/profiles/profile1722016584144.png"
                      }
                    />
                  </span>
                  <span className="text-web3 mr-2">
                    {data.data.body.sellerId.username}
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
              <Slider {...settings}>
                {data.data.body.albumImage.map((s) => {
                  return (
                    <div key={s}>
                      <img src={SERVER_URL + s} />
                    </div>
                  );
                })}
              </Slider>

              <div className="bg-web1 px-2 py-3 mt-24 mb-12 rounded-md">
                <h3 className=" text-web3 font-bold">About This Product</h3>
                <p className="text-web4 mt-3">{data.data.body.desc}</p>
              </div>
              <div className="border  px-2 py-5 rounded-md">
                <h3 className="mb-4">About this Seller</h3>
                <div className="flex items-center">
                  <img
                    width={70}
                    className="rounded-full mr-3"
                    src={
                      data.data.body.sellerId.profileImg ||
                      SERVER_URL + "/uploads/profiles/profile1722016584144.png"
                    }
                  />
                  <div className="flex flex-col ">
                    <span>Seller</span>
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
                    <button className="bg-web1 text-web3 px-2 py-1 rounded-md hover:bg-web3 hover:text-web1">
                      Contact me
                    </button>
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
                        Ave Response Time:{" "}
                      </span>
                      <span className="text-web3 font-bold">3</span>
                    </div>
                  </div>
                  <div>
                    <div className="mb-3">
                      <span className="text-web4 font-bold">Language:</span>
                      <span className="text-web3 font-bold"> English</span>
                    </div>
                    <div>
                      <span className="text-web4 font-bold">
                        Member Since:{" "}
                      </span>
                      <span className="text-web3 font-bold">23 Aug 2021</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-9">
                <h3 className="text-4xl text-web4 mb-8">Reviews</h3>
                <ListOfReviews />
                <FormReviewSend />
              </div>
            </div>
            <div className=" w-1/3">
              <InfoProduct data={data.data.body} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
