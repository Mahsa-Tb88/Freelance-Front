import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { TbMessageChatbot } from "react-icons/tb";
import { useForm } from "react-hook-form";

export default function ContactUs() {
  const [isSent, setIsSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  function onSubmit(data) {
    setIsSent(true);
  }
  function newFormHandler() {
    setIsSent(false);
    setValue("fullname", "");
    setValue("email", "");
    setValue("message", "");
  }
  return (
    <div className="">
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div className=" py-52 ">
        <div className="w-5/6 mx-auto flex justify-between items-center">
          <div className="w-full">
            <h3 className="text-web2 font-bold">How can I help you?</h3>
            <h1 className="text-web3 text-5xl font-bold mt-4 mb-10">
              Contact Us
            </h1>
            <p className="text-web4 clear-start text-lg">
              We are here to help and answer any quetions you might have,
            </p>
            <p className="text-web4 text-lg">
              We look forward to hearing from you!
            </p>
          </div>
          <div className="w-full">
            {isSent ? (
              <div className="text-center">
                <p className="text-web3 mb-5 font-bold text-lg">
                  Thank you for your Message. We will get back to you soon.
                </p>
                <button
                  onClick={newFormHandler}
                  className="border border-web2 hover:bg-web3 hover:text-web1 text-web3 py-2 px-4 rounded"
                >
                  New Form
                </button>
              </div>
            ) : (
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-7">
                  <div className="border flex justify-start items-center px-1 rounded-md py-2 focus-within:border-web3  ">
                    <IoPersonOutline className="mr-2 text-web2 text-lg" />
                    <input
                      className="outline-none sm:text-lg text-web4 w-full"
                      placeholder="Enter your fullname"
                      {...register("fullname", {
                        required: "Enter your fullname please.",
                      })}
                    />
                  </div>
                  {errors.fullname && (
                    <p className=" bg-red-700 text-white px-2 py-1 rounded mt-2">
                      {errors.fullname.message}
                    </p>
                  )}
                </div>

                <div className="mb-7">
                  <div className="border flex justify-start items-center px-1 rounded-md py-2 focus-within:border-web3">
                    <HiOutlineMail className="mr-2 text-web2 text-lg" />
                    <input
                      className="outline-none sm:text-lg text-web4 w-full"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Enter your email Plaeae!",
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className=" bg-red-700 text-white px-2 py-1 rounded mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-7">
                  <div className="border flex justify-start  px-1 rounded-md py-2 focus-within:border-web3  ">
                    <TbMessageChatbot className="mr-2 mt-2 text-web2 text-lg" />
                    <textarea
                      className="outline-none sm:text-lg text-web4 w-full resize-none"
                      placeholder="Enter your message"
                      {...register("message", {
                        required: "Enter your message",
                      })}
                    />
                  </div>
                  {errors.message && (
                    <p className=" bg-red-700 text-white px-2 py-1 rounded mt-2">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-web2 hover:bg-web3 text-web1 py-2 w-full rounded font-bold text-lg"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
