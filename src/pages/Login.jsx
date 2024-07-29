import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiEyesDuotone } from "react-icons/pi";
import { PiEyeClosedLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLogin } from "../utils/queries";
import { userActions } from "../store/slices/userSlices";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const [failMessage, setFailMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useLogin();

  function onSubmit(data) {
    mutation.mutate(data, {
      onError(data) {
        setFailMessage(data.response.data.message);
        window.scrollTo({ top: 0, behavior: "instant" });
      },
      onSuccess(data) {
        const user = data.data.body.user;
        const noImage =
          SERVER_URL + "/uploads/profiles/profile1722016584144.png";
        dispatch(
          userActions.setUser({
            isLoggedIn: true,
            isSeller: user.isSeller,
            username: user.username,
            id: user._id,
            profileImg: user.profileImg
              ? SERVER_URL + user.profileImg
              : noImage,
            desc: user.desc,
          })
        );
        navigate("/");
      },
    });
  }

  return (
    <div className="flex flex-col justify-center items-center py-16 px-7 md:px-0 md:w-2/4 lg:w-1/3 mx-auto">
      <h1 className="text-3xl sm:text-4xl text-web3 font-bold">Welcome Back</h1>
      <h4 className="text-xs sm:text-base text-web3 mt-2">
        Enter your credential for login
      </h4>
      <div>
        {failMessage && (
          <div className="mt-4">
            <p className="bg-red-700 text-white px-4 rounded-md py-2 text-center font-bold">
              {failMessage}
            </p>
          </div>
        )}
      </div>
      <form className="mt-14 w-full " onSubmit={handleSubmit(onSubmit)}>
        <div className="border flex justify-start items-center px-1 rounded-md py-2 focus-within:border-web3 mb-7 w">
          <IoPersonOutline className="mr-2 text-web2 text-lg" />
          <input
            className="outline-none sm:text-lg text-web4"
            placeholder="Enter your username"
            {...register("username")}
          />
        </div>

        <div className="border flex justify-start items-center px-1 rounded-md py-2 focus-within:border-web3 mb-8">
          <RiLockPasswordLine className="mr-2 text-web2  text-lg" />
          <input
            className="outline-none sm:text-lg text-web4"
            placeholder="Enter your password"
            {...register("password")}
          />
          {!showPassword ? (
            <PiEyeClosedLight
              className=" text-web2 text-lg ml-auto hover:text-web3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <PiEyesDuotone
              className=" text-web2 text-lg ml-auto hover:text-web3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <button className="bg-web2 text-web4 hover:bg-web3 hover:text-web1 w-full py-2 rounded-md font-bold sm:text-lg">
          Login in
        </button>
      </form>

      <div className="w-full mt-3 mb-10">
        <Link className="text-web4 hover:text-web3 text-sm sm:text-base">
          Forgot Password?
        </Link>
      </div>
      <div className="w-full text-sm sm:text-base">
        <span className="text-web4 px-1 sm:px-2 border-b-2  pb-2 border-web1 text-sm sm:text-base ">
          Don't have an account?
        </span>
        <Link
          to="/signUp"
          className="text-web4 px-1 border-b-2 pb-2 sm:px-2 border-web1 hover:border-web3 cursor-pointer text-sm sm:text-base"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
