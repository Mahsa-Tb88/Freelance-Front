import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSeller } from "../utils/queries";
import { FaStar } from "react-icons/fa";
import CartProduct from "../components/CartProduct";
export default function SellerInfo() {
  const { id } = useParams();
  const { data, isPending, isError, error } = useGetSeller(id);
  const [sellerStar, setSellerStar] = useState(1);



  useEffect(() => {
    let sumTotalStar = 0;
    if (data && data.data.body.sellerProducts.length > 0) {
      data.data.body.sellerProducts.forEach((element) => {
        sumTotalStar = sumTotalStar + element.totalStar;
      });
      setSellerStar(
        Math.ceil(sumTotalStar / data.data.body.sellerProducts.length)
      );
    }
  }, [data]);

  function dateMembership(dateString) {
    const myDate = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = myDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  }
 
  return (
    <div className="my-32">
      <div className="lg:w-5/6 mx-auto px-4 lg:px-2 ">
        {isPending ? (
          <div className="text-center text-web3 font-bold text-lg">
            Loading...
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 font-bold text-lg">
            {error.response.data.message}
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-6">
              <img
                className="w-28 h-28 border rounded-full"
                src={SERVER_URL + data.data.body.sellerInfo.profileImg}
              />
              <div>
                <p className="text-web3 font-bold text-xl">
                  {data.data.body.sellerInfo.username.replace(
                    /(^\w|[\s_]\w)/g,
                    (match) => match.toUpperCase()
                  )}
                </p>
                <div className="flex items-center mt-2">
                  {Array(sellerStar)
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

            <div className="my-4 md:ps-6 text-web3">
              <p>{data.data.body.sellerInfo.country}</p>
              <p>{data.data.body.sellerInfo.language}</p>

              <p>
                Join At: {dateMembership(data.data.body.sellerInfo.createdAt)}
              </p>
              <p>
                Average Response Time:
                {data.data.body.sellerInfo.aveResponseTime} day(s)
              </p>
            </div>
            <div className="text-web4 mt-9 text-justify md:ps-6">
              <p className="text-web4 font-bold text-lg">Description</p>
              {data.data.body.sellerInfo.desc}
            </div>
            <div className="mt-12 md:ps-6 ">
              <div className="flex items-center justify-center mb-8  ">
                <div className="flex items-center">
                  <p className="text-web3 font-bold text-xl me-2">Product's </p>
                  <p className="text-web3 font-bold text-xl">
                    {data.data.body.sellerInfo.username.replace(
                      /(^\w|[\s_]\w)/g,
                      (match) => match.toUpperCase()
                    )}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 ">
                {data.data.body.sellerProducts.length > 0 &&
                  data.data.body.sellerProducts.map((product) => {
                    return (
                      <div key={product.title}>
                        <CartProduct p={product} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
