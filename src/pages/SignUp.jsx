import React, { useEffect, useRef, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiEyesDuotone } from "react-icons/pi";
import { PiEyeClosedLight } from "react-icons/pi";
import { CiFlag1 } from "react-icons/ci";
import { MdLocalPhone } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function () {
  const [showPassword, setShowPassword] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const noImage = SERVER_URL + "/uploads/profiles/profile1722016584144.png";
  const [selectedImage, setSelectedImage] = useState(noImage);
  const [failMessage, setFailMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const clearSwitch = useRef(null);
  useEffect(() => {
    return () => clearTimeout(clearSwitch.current);
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const imageField = { ...register("profileImg") };

  async function handleImageSelect(e) {
    setFailMessage(false);
    imageField.onChange(e);
    const file = e.target.files[0];
    if (file) {
      setImageChanged(true);
      const result = await uploadFile(file);
      if (result.success) {
        setSelectedImage(SERVER_URL + result.body.url);
      } else {
        setFailMessage(result.message);
        return;
      }
    }
  }
  function handleRemoveImage() {
    setSelectedImage(noImage);
    setValue("profileImage", "");
  }

  const mutation = useMutation({
    mutationFn: (variable) => axios.post("/auth/register", variable),
    onSuccess() {
      setSuccessMessage(
        "Congratulations, your account has been successfully created."
      );
      window.scrollTo({ top: 0, behavior: "instant" });
      clearSwitch.current = setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
  });
  async function onSubmit(data) {
    if (data.profileImg?.length) {
      data.profileImg = selectedImage.substring(21);
    } else {
      data.profileImg = "";
    }
    console.log(data);
    mutation.mutate(data);
  }

  return (
    <div className="my-14 md:my-28  w-5/6 mx-auto ">
      {successMessage ? (
        <div className="bg-green-500 px-2 py-1 rounded-md text-center font-bold text-lg  md:text-3xl">
          <p className="text-white">{successMessage}</p>
        </div>
      ) : (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2  gap-10 md:gap-16">
            <div>
              <h1 className="text-2xl sm:text-4xl text-web3 font-bold text-center">
                Create a new account
              </h1>
              <div className="mt-14">
                <div className="mb-10 ">
                  <div className="border flex justify-start items-center px-1 rounded-md py-2 focus-within:border-web3 ">
                    <IoPersonOutline className="mr-2 text-web2 text-lg" />
                    <input
                      className="outline-none sm:text-lg text-web4"
                      placeholder="Enter your username"
                      {...register("username", {
                        required: "Enter a username please.",
                        minLength: {
                          value: 3,
                          message: "username must be 3 Characters at least",
                        },
                        maxLength: {
                          value: 10,
                          message: "username must be 10 Characters at most",
                        },
                      })}
                    />
                  </div>
                  {errors.username && (
                    <p className=" bg-red-700 text-white px-2 py-1 rounded-md mt-2">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className=" mb-10">
                  <div className="border flex justify-start items-center px-1 rounded-md py-2 focus-within:border-web3">
                    <MdOutlineEmail className="mr-2 text-web2 text-lg" />
                    <input
                      className="outline-none sm:text-lg text-web4"
                      placeholder="Enter your Email"
                      {...register("email", {
                        required: "Enter an email please.",
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className=" bg-red-700 text-white px-2 py-1 rounded-md mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-10">
                  <div className="border flex justify-start items-center px-1 rounded-md py-2 focus-within:border-web3 ">
                    <RiLockPasswordLine className="mr-2 text-web2 text-lg" />
                    <input
                      className="outline-none sm:text-lg text-web4"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Enter a password please.",
                        minLength: {
                          value: 6,
                          message: "password must be 6 Characters at least",
                        },
                        maxLength: {
                          value: 12,
                          message: "password must be 12 Characters at most",
                        },
                      })}
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
                  {errors.password && (
                    <p className=" bg-red-700 text-white px-2 py-1 rounded-md mt-2">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="mb-10">
                  <div className="border flex justify-start items-center px-1 rounded-md py-2 focus-within:border-web3">
                    <RiLockPasswordLine className="mr-2 text-web2 text-lg" />
                    <input
                      className="outline-none sm:text-lg text-web4"
                      placeholder="Enter your password again"
                      {...register("confirmPassword", {
                        required: "Enter the password again please.",
                        validate(value) {
                          if (watch("password") !== value) {
                            return "Confirm Password Is Not Equel To Password";
                          }
                        },
                      })}
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
                  {errors.confirmPassword && (
                    <p className=" bg-red-700 text-white px-2 py-1 rounded-md mt-2">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="mb-10">
                  <div className=" flex justify-around items-center ">
                    <div className="w-1/3">
                      <img
                        className="bg-red-200 rounded-md"
                        src={selectedImage}
                      />
                    </div>
                    <div>
                      <div className="flex mb-4">
                        <input
                          {...imageField}
                          className="outline-none hidden "
                          type="file"
                          id="selectImage"
                          accept="image/*"
                          onChange={handleImageSelect}
                        />
                        <label
                          htmlFor="selectImage"
                          className="sm:text-lg cursor-pointer border w-32 text-center  py-1 rounded-md bg-web2 hover:bg-web3 text-web4 hover:text-web1"
                        >
                          Upload Image
                        </label>
                      </div>
                      <button
                        onClick={handleRemoveImage}
                        type="button"
                        className="sm:text-lg cursor-pointer border w-32 text-center  py-1 rounded-md bg-web1 hover:bg-web4 text-web4 hover:text-web1"
                      >
                        Remove Image
                      </button>
                    </div>
                  </div>
                  {failMessage && (
                    <p className=" bg-red-700 text-white px-2 py-1 rounded-md mt-2">
                      {failMessage}
                    </p>
                  )}
                </div>
                <div className="mb-10">
                  <div className="border flex justify-start items-center px-1 rounded-md py-2 focus-within:border-web3 ">
                    <CiFlag1 className="mr-2 text-web2 text-lg" />
                    <input
                      className="outline-none sm:text-lg text-web4"
                      placeholder="Enter your country"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h2 className="text-2xl sm:text-4xl text-web3 font-bold text-center">
                I want to become a seller
              </h2>
              <div className=" mt-14 ">
                <label className="inline-flex items-center cursor-pointer py-2 mb-10">
                  <span className="text-web4 mr-2 text-lg">
                    Activate to become a seller
                  </span>
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    {...register("isSeller")}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-web2 dark:peer-focus:ring-web2 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-web2 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-web3"></div>
                </label>
                <div className="border flex justify-start items-center px-1 rounded-md py-2 focus-within:border-web3 mb-10">
                  <MdLocalPhone className="mr-2 text-web2 text-lg" />
                  <input
                    className="outline-none sm:text-lg text-web4 w-full"
                    placeholder="Enter your phonenumber"
                    type="number"
                    {...register("phoneNumber")}
                  />
                </div>
                <div>
                  <textarea
                    className="border w-full px-2 py-1 rounded-md"
                    rows={10}
                    placeholder="Description"
                    {...register("desc")}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className=" sm:w-1/2 mx-auto mt-6">
            <button
              type="submit"
              className="bg-web2 text-web4 hover:bg-web3 hover:text-web1  py-3 rounded-md font-bold  sm:text-lg w-full"
            >
              Create a new account
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
