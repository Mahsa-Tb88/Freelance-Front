import React from "react";

export default function AddProduct() {
  return (
    <div className="w-5/6 mx-auto my-20">
      <h1 className="text-web3 text-3xl sm:text-4xl">Add New Product</h1>
      <div className="my-10">
        <form className="grid md:grid-cols-2  gap-10 md:gap-16">
          <div className="">
            <div className="flex flex-col mb-10">
              <label className="text-web3 text-xl mr-2 mb-1">Title</label>
              <input
                className="border  px-2 py-1 rounded-md"
                placeholder="Enter a title of product"
              />
            </div>
            <div className="flex flex-col mb-10">
              <label className=" mr-2 mb-1 text-web3 text-xl">Category</label>
              <select className="border text-web4 outline-none   px-2 py-2 rounded-md">
                <option className="my-2 hover:bg-web2">Web Design</option>
                <option className="my-2 hover:bg-web2">Programming</option>
                <option className="my-2 hover:bg-web2">Logo</option>
              </select>
            </div>
            <div className=" flex justify-around items-center  mb-10">
              <div className="w-1/3">
                <img
                  className="bg-red-200  rounded-md"
                  src="../../public/img/profile.png"
                />
              </div>
              <div>
                <div className="flex mb-4">
                  <input
                    className="outline-none  hidden "
                    placeholder="Enter your password again"
                    type="file"
                    id="cover"
                    accept="image/*"
                  />
                  <label
                    htmlFor="cover"
                    className="text-base sm:text-lg cursor-pointer border  w-36 sm:w-44 text-center  py-1 rounded-md bg-web2 hover:bg-web3 text-web4 hover:text-web1"
                  >
                    Upload Cover Image
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex justify-around items-center  mb-10">
              <div className="w-1/3">
                <img
                  className="bg-red-200  rounded-md"
                  src="../../public/img/profile.png"
                />
              </div>
              <div>
                <div className="flex mb-4">
                  <input
                    className="outline-none  hidden "
                    placeholder="Enter your password again"
                    type="files"
                    id="images"
                    accept="image/*"
                  />
                  <label
                    htmlFor="images"
                    className="text-base sm:text-lg cursor-pointer border w-36 sm:w-44 text-center  py-1 rounded-md bg-web2 hover:bg-web3 text-web4 hover:text-web1"
                  >
                    Upload Images
                  </label>
                </div>
                <div className="flex">
                  <input
                    className="outline-none  hidden "
                    placeholder="Enter your password again"
                    type="files"
                    id="removeImages"
                    accept="image/*"
                  />
                  <label
                    htmlFor="removeImages"
                    className="text-base sm:text-lg cursor-pointer border w-36 sm:w-44 text-center  py-1 rounded-md bg-web1 hover:bg-web4 text-web4 hover:text-web1"
                  >
                    Remove Images
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex flex-col justify-around items-start  mb-10">
              <label className=" mr-2 mb-2 text-web3 text-xl">
                Description of Product
              </label>

              <textarea
                className="rounded-md border px-2 py-1 w-full  "
                placeholder="Description"
                rows={10}
              ></textarea>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col mb-10">
              <label className="text-web3 text-xl mr-2 mb-1 outline-web3">
                Service Title
              </label>
              <input
                className="border  px-2 py-1 rounded-md"
                placeholder="e.g. One-page web design"
              />
            </div>
            <div className="flex flex-col mb-10">
              <label className="text-web3 text-xl mr-2 mb-1">
                Short Description
              </label>
              <textarea
                className="border  px-2 py-1 rounded-md outline-web3"
                placeholder="Short description of your product"
                rows={5}
              ></textarea>
            </div>
            <div className="flex flex-col mb-10">
              <label className="text-web3 text-xl mr-2 mb-1 ">
                Delivery Time
              </label>
              <input
                className="border outline-web3 px-2 py-1 rounded-md"
                type="number"
              />
            </div>
            <div className="flex flex-col mb-10">
              <label className="text-web3 text-xl mr-2 mb-1 ">
                Revision Number
              </label>
              <input
                className="border outline-web3 px-2 py-1 rounded-md"
                type="number"
              />
            </div>
            <div className="flex flex-col mb-10">
              <label className="text-web3 text-xl mr-2 mb-1 ">
                Add Feature
              </label>
              <div className="border focus-within:border-web3 flex justify-between items-start rounded-md overflow-hidden">
                <input className=" px-2 py-1 rounded-md outline-none h-8" />
                <span className="bg-web2 text-web4 hover:bg-web3 hover:text-web1 h-8 flex items-center px-3 cursor-pointer">
                  Add
                </span>
              </div>
            </div>
            <div className="flex flex-col mb-10">
              <label className="text-web3 text-xl mr-2 mb-1 ">Price</label>
              <input
                className="border outline-web3 px-2 py-1 rounded-md"
                type="number"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-web2 hover:bg-web3 text-web4 hover:text-web1  w-full rounded-md text-base sm:text-xl font-bold py-2"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
