import React, { useState } from "react";

import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { useGetAllProducts, useGetSellers } from "../utils/queries";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { MdImportantDevices } from "react-icons/md";

export default function Home() {
  const [inputSearch, setInputSearch] = useState("");
  const { data, isPending, isError, error } = useGetSellers();
  const products = useGetAllProducts();

  let settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  let productSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  function dateMembership(dateString) {
    const myDate = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = myDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="bg-web1 px-3 my-12">
        <div className=" lg:max-w-5xl mx-auto pt-4  md:pt-7 flex justify-between items-center gap-12">
          <div className="w-3/5 md:mb-16">
            <h2 className="md:text-4xl font-semibold md:mb-20 text-web4">
              Find the perfect freelance services for your business
            </h2>
            <div className=" my-4 md:mt-8 w-full flex justify-center items-center border rounded-md border-web4 overflow-hidden focus-within:border-web3">
              <input
                className="w-full h-5 text-xs md:text-base px-1 md:h-10 rounded-l-sm md:rounded-l-md outline-none"
                onChange={(e) => setInputSearch(e.target.value)}
              />

              <Link
                className="text-xxs  md:text-base h-5  md:h-10 font-bold  rounded-r-md flex items-center justify-center px-1 md:px-2  text-web4  bg-web2 hover:bg-web3 hover:text-web1"
                to={`/AllProducts?search=${inputSearch}`}
              >
                Search
              </Link>
            </div>
            <div className="flex justify-start  items-center my-8 ">
              <div className="grid grid-cols-2 md:flex justify-start gap-2 ">
                <Link
                  className="border text-center font-semibold border-web4 hover:bg-web3 hover:border-web3 hover:text-web1 text-web4 px-2 text-xxs md:text-xs lg:text-sm  md:px-6 py-0.5 md:py-1 rounded-xl md:rounded-2xl"
                  to="/AllProducts?category=Design"
                >
                  Desing
                </Link>
                <Link
                  className="border text-center font-semibold border-web4 hover:bg-web3 hover:border-web3 hover:text-web1 text-web4 px-2 text-xxs md:text-xs lg:text-sm md:px-6 py-0.5 md:py-1 rounded-xl md:rounded-2xl"
                  to="/AllProducts?category=Programming"
                >
                  Programming
                </Link>
                <Link
                  className="border text-center font-semibold border-web4 hover:bg-web3 hover:border-web3 hover:text-web1 text-web4 px-2 text-xxs md:text-xs lg:text-sm md:px-6 py-0.5 md:py-1 rounded-xl md:rounded-2xl"
                  to="/AllProducts?category=Photography"
                >
                  Photography
                </Link>
                <Link
                  className="border text-center font-semibold border-web4 hover:bg-web3 hover:border-web3 hover:text-web1 text-web4 px-2 text-xxs md:text-xs lg:text-sm md:px-6 py-0.5 md:py-1 rounded-xl md:rounded-2xl"
                  to="/AllProducts?category=Logo"
                >
                  Logo
                </Link>
              </div>
            </div>
          </div>
          <div className="w-2/5">
            <div className=" float-end ">
              <img src="././public/img/girl.png" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-7 flex justify-center items-center">
        <h4 className="text-gray-400 font-bold text-xs md:text-base mr-2 md:mr-5">
          Trust By:
        </h4>
        <div className=" md:flex text-xxs md:text-base">
          <span className="text-gray-400 px-1">Google</span>
          <span className="text-gray-400 px-1">Facebook</span>
          <span className="text-gray-400 px-1">Youtube</span>
          <span className="text-gray-400 px-1">Netflix</span>
          <span className="text-gray-400 px-1">Paypal</span>
          <span className="text-gray-400 px-1">Meta</span>
        </div>
      </div>
      <div className="mt-40">
        {products.isPending ? (
          <div className="text-center font-bold text-xl text-web3">
            Loading...
          </div>
        ) : products.isError ? (
          <div className="text-center font-bold text-xl text-red-500">
            {products.error.response.data.message}
          </div>
        ) : (
          <div className="px-3 lg:w-5/6 lg:px-0 mx-auto pb-7 mb-10 ">
            <Slider {...productSettings}>
              {products.data.data.body.map((product) => {
                return (
                  <div className="px-3 flex flex-col" key={product._id}>
                    <Link
                      className="bg-web1 border-web1 border rounded flex flex-col h-full pb-7 cursor-pointer overflow-hidden"
                      to={`/product/${product._id}`}
                    >
                      <div className=" flex flex-col justify-center items-center w-full">
                        <img
                          className="w-full h-40 "
                          src={SERVER_URL + product.coverImage}
                        />
                        <div className="text-web3 lg:text-lg font-bold mt-4">
                          {product.title}
                        </div>
                      </div>
                      <div className="mb-auto w-full">
                        <div className="px-2 text-sm lg:text-base text-justify mb-3 my-5 h-24 text-web4">
                          {product.desc.substring(0, 100)}...
                        </div>
                        <div className="px-2 mt-9  text-web3 text-sm">
                          {product.category}
                        </div>
                        <div className="px-2 text-web3 text-sm flex items-center mt-2">
                          {Array(product.totalStar)
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
                      </div>
                    </Link>
                  </div>
                );
              })}
            </Slider>
          </div>
        )}
      </div>
      <div className=" mt-40">
        <div className="lg:w-5/6 mx-auto py-14 px-4 lg:px-0">
          <div className="flex flex-col  lg:flex-row-reverse justify-center items-center gap-4">
            <h3 className="lg:hidden text-web3 text-xl text-center lg:text-left md:text-3xl font-bold mb-10 ">
              A whole world of freelance talent at your fingertips
            </h3>
            <div className="lg:w-5/12 ">
              <img
                src="../../public/img/freelance.jpg"
                className="rounded-md"
              />
            </div>
            <div className="lg:w-7/12 px-2 text-center lg:px-0 lg:text-left">
              <h3 className="hidden lg:block text-web3 text-xl text-center lg:text-left md:text-3xl font-bold mb-10 ">
                A whole world of freelance talent at your fingertips
              </h3>
              <div>
                <div className="mb-6 lg:mb-10 ">
                  <h5 className="text-web3 text-xl font-bold">
                    The best for every budget
                  </h5>
                  <p className="text-web4 text-lg">
                    Lorem ipsum dolor sit amet. Aut similique explicabo aut
                    perferendis illo qui reiciendis explicabo ad mollitia
                    quibusdam.
                  </p>
                </div>
                <div className="mb-6 lg:mb-10 ">
                  <h5 className="text-web3 text-xl font-bold">
                    Quality work done quickly
                  </h5>
                  <p className="text-web4 text-lg">
                    Lorem ipsum dolor sit amet Aut similique explicabo. , Lorem
                    ipsum dolor sit amet Aut similique explicabo Lorem ipsum
                    dolor sit amet Aut similique explicabo
                  </p>
                </div>
                <div className="mb-6 lg:mb-10 ">
                  <h5 className="text-web3 text-xl font-bold">
                    Protected payments, every time
                  </h5>
                  <p className="text-web4 text-lg">
                    Lorem ipsum dolor sit amet. Aut similique explicabo aut
                    perferendis quibusdam.
                  </p>
                </div>
                <div className="mb-6 lg:mb-10 ">
                  <h5 className="text-web3 text-xl font-bold">
                    Protected payments, every time
                  </h5>
                  <p className="text-web4 text-lg">
                    Lorem ipsum dolor sit amet. Aut similique explicabo aut
                    reiciendis explicabo ad mollitia quibusdam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-web3 mt-40 py-14">
        <div className="px-4 lg:px-0">
          <div className="lg:w-5/6 mx-auto">
            <h3 className="text-web1 text-xl text-center lg:text-left md:text-3xl font-bold mb-10 ">
              FREELANCE BUSINESS
            </h3>
          </div>
          <div className="lg:w-5/6 mx-auto  flex flex-col lg:flex-row-reverse ">
            <div className="lg:w-1/2 relative ">
              <img src="../../public/img/ax.png" />
              <div className="absolute text-xxxs md:text-xs top-0 left-1/4  w-20 md:w-36 bg-orange-200 text-web4  rounded-md px-0.5 py-0.5 md:px-1 md:py-1">
                <span>Lorem ipsum or dolor sit amet bsbs...</span>
              </div>
              <div className="absolute text-xxxs md:text-xs bottom-7% sm:bottom-13%  md:bottom-13% w-20 md:w-36 bg-red-100 text-web4  rounded-md px-0.5 py-0.5 md:px-1 md:py-1">
                <span>Lorem ipsum or dolor sit amet bsbs...</span>
              </div>
              <div className="absolute text-xxxs md:text-xs bottom-0 right-23%  w-20 md:w-36 bg-purple-200 text-web4  rounded-md px-0.5 py-0.5 md:px-1 md:py-1">
                <span>Lorem ipsum or dolor sit amet bsbs...</span>
              </div>
            </div>
            <div className="lg:w-1/2 mt-7 lg:mt-0">
              <h4 className="text-web1 text-2xl  md:text-2xl font-bold mb-10 ">
                A business solution for design teams
              </h4>
              <span className="text-web2">
                Update to a curated experience packed with tools
                <br /> and benefite to dedicated business
              </span>
              <ul className="my-6 text-web1 text-lg">
                <li> Protected payments, every time </li>
                <li> Quality work done quickly</li>
                <li> The best for every budget</li>
              </ul>
              <button className="hover:bg-web4 hover:border-web4  font-semibold bg-web1 text-web4 border-web1 px-3 py-2 rounded-md hover:text-web1">
                Explore FEREELANCE. Business
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40 ">
        {isPending ? (
          <div className="text-center font-bold text-xl text-web3">
            Loading...
          </div>
        ) : isError ? (
          <div className="text-center font-bold text-xl text-red-500">
            {error.response.data.message}
          </div>
        ) : (
          <div className="px-3 lg:px-0 lg:w-5/6 mx-auto pb-7 mb-10 ">
            <Slider {...settings}>
              {data.data.body.map((slider) => {
                return (
                  <div className="px-3 flex flex-col " key={slider.username}>
                    <Link
                      className="bg-web2 border-web2 border rounded flex flex-col h-full py-7 cursor-pointer"
                      to={`/seller/${slider.sellerId}`}
                    >
                      <div className=" flex flex-col justify-center items-center w-full">
                        <img
                          className="w-14 h-14 text-center rounded-full border"
                          src={
                            slider.profileImg
                              ? SERVER_URL + slider.profileImg
                              : SERVER_URL +
                                "/uploads/profiles/profile1722016584144.png"
                          }
                        />
                        <div className="text-web1 text-lg font-bold mt-4">
                          {slider.username.replace(/(^\w|[\s_]\w)/g, (match) =>
                            match.toUpperCase()
                          )}
                        </div>
                      </div>
                      <div className="mb-auto w-full">
                        <div className="px-2 text-justify mb-3 my-5 h-24 text-web4">
                          {slider.desc.substring(0, 100)}...
                        </div>
                        <div className="px-2 text-web1 text-sm">
                          {slider.country}
                        </div>
                        <div className="px-2 text-web1 text-sm">
                          {dateMembership(slider.joinDate)}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}
