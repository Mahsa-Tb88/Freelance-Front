import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user.user);
  console.log(" home...", user);

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="bg-web1 px-3 my-8">
        <div className=" md:max-w-5xl mx-auto pt-4  md:pt-7 flex justify-between items-center gap-12">
          <div className="w-3/5 md:mb-16">
            <h2 className="md:text-4xl font-semibold md:mb-20 text-web4">
              Find the perfect freelance services for your business
            </h2>
            <div className=" my-4 md:mt-8 w-full flex justify-center items-center border rounded-md border-web4 overflow-hidden">
              <input className="w-full h-5 text-xs px-1 md:h-10 rounded-l-sm md:rounded-l-md" />
              <button className="text-xxs text-web4 h-5 md:text-base px-1 md:px-2  md:h-10 font-bold bg-web2 rounded-r-md hover:bg-web3 hover:text-web1">
                Search
              </button>
            </div>
            <div className="flex justify-start  items-center my-8 ">
              <h3 className="text-xxs md:text-sm  font-semibold mr-1  md:mr-3">
                popular:
              </h3>
              <div className="grid grid-cols-2 md:flex justify-start gap-2 ">
                <button className="border font-semibold border-web4 hover:bg-web3 hover:border-web3 hover:text-web1 text-web4 px-2 text-xxs md:text-xs lg:text-sm  md:px-6 py-0.5 md:py-1 rounded-xl md:rounded-2xl">
                  Desing
                </button>
                <button className="border font-semibold border-web4 hover:bg-web3 hover:border-web3 hover:text-web1 text-web4 px-2 text-xxs md:text-xs lg:text-sm md:px-6 py-0.5 md:py-1 rounded-xl md:rounded-2xl">
                  Fronend
                </button>
                <button className="border font-semibold border-web4 hover:bg-web3 hover:border-web3 hover:text-web1 text-web4 px-2 text-xxs md:text-xs lg:text-sm md:px-6 py-0.5 md:py-1 rounded-xl md:rounded-2xl">
                  Backend
                </button>
                <button className="border font-semibold border-web4 hover:bg-web3 hover:border-web3 hover:text-web1 text-web4 px-2 text-xxs md:text-xs lg:text-sm md:px-6 py-0.5 md:py-1 rounded-xl md:rounded-2xl">
                  Logo
                </button>
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
      <div className="mt-40"></div>
    </div>
  );
}
