import React from "react";
import { Helmet } from "react-helmet";

export default function AboutUs() {
  return (
    <div>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <div className=" py-20  ">
        <div className=" py-10 px-3">
          <div className="w-5/6 mx-auto">
            <div>
              <h1 className="text-web3 text-5xl font-bold my-7">About Us</h1>
            </div>
            <div className="w- mx-auto">
              <img src="././public/img/aboutus.jpg" className="rounded" />
            </div>
            <h3 className="text-web3 text-2xl font-bold mt-16">
              Would you like to know about us?
            </h3>
            <p className="mb-4 mt-2 text-web4 text-lg text-justify">
              orem ipsum dolor sit amet. Est internos nihil in repellendus
              corrupti eum quod mollitia et excepturi reprehenderit. A quis
              dolores et voluptatem rerum et rerum laboriosam et quisquam iste.
              Et necessitatibus dolore qui doloremque quis hic fuga voluptatem
              et internos modi rem itaque neque et eveniet debitis. eum quod
              mollitia et excepturi reprehenderit. A quis dolores et voluptatem
              rerum et rerum laboriosam et quisquam iste. eum quod mollitia et
              excepturi reprehenderit. A quis dolores et voluptatem rerum et
              rerum laboriosam et quisquam iste.
            </p>

            <div className="grid grid-cols-4 my-20 bg-web1 rounded-md">
              <div className="text-web3  py-7 flex flex-col text-center ">
                <span className="text-lg font-extrabold"> Projects</span>
                <span className="text-web3 font-bold text-2xl mt-4">300 +</span>
              </div>
              <div className="text-web3  py-7 flex flex-col text-center ">
                <span className="text-lg font-extrabold"> Employees</span>
                <span className="text-web3 font-bold text-2xl mt-4">50 +</span>
              </div>
              <div className="text-web3  py-7 flex flex-col text-center ">
                <span className="text-lg font-extrabold"> Users</span>
                <span className="text-web3 font-bold text-2xl mt-4">500 +</span>
              </div>
              <div className="text-web3  py-7 flex flex-col text-center ">
                <span className="text-lg font-extrabold"> Sellers</span>
                <span className="text-web3 font-bold text-2xl mt-4">200 +</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
