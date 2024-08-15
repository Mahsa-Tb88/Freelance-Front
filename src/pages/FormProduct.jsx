import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { uploadFile } from "../utils/queries";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

export default function FormProduct({ product, type, id }) {
  const [successMessage, setSuccessMessage] = useState(false);
  const [failMessage, setFailMessage] = useState(false);
  const [failImgCoverMsg, setImgCoverMsg] = useState(false);
  const noImage = SERVER_URL + "/uploads/profiles/profile1722016584144.png";
  const [coverImageSelected, setCoverImageSelected] = useState(noImage);
  const [albumImage, setAlbumImage] = useState(noImage);
  const [coverImageChanged, setCoverImageChanged] = useState(false);

  useEffect(() => {
    if (type === "edit") {
      if (product.coverImage) {
        setCoverImageSelected(SERVER_URL + `${product.coverImage}`);
      } else {
        setCoverImageSelected(noImage);
      }
    }
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    resetField,
  } = useForm({
    defaultValues: {
      title: type == "edit" ? product.title : "",
      category: type == "edit" ? product.category : "",
      coverImage: type == "edit" ? product.coverImage : "",
      desc: type == "edit" ? product.desc : "",
      serviceTitle: type == "edit" ? product.serviceTitle : "",
      shortDesc: type == "edit" ? product.shortDesc : "",
      deliveryTime: type == "edit" ? product.deliveryTime : "",
      revisionNumber: type == "edit" ? product.revisionNumber : "",
      price: type == "edit" ? product.price : "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "feature",
    control,
  });

  function addFeature() {
    
    const newFeature = getValues("feature");
    if (newFeature) {
      append({ value: newFeature });
      resetField("feature");
    }
  }

  const coverImage = { ...register("coverImage") };
  async function handleImageCover(e) {
    console.log(e);
    setImgCoverMsg(false);
    coverImage.onChange(e);
    const file = e.target.files[0];
    if (file) {
      setCoverImageChanged(true);
      const result = await uploadFile(file);
      if (result.success) {
        setCoverImageSelected(SERVER_URL + result.body.url);
      } else {
        setImgCoverMsg(result.message);
        return;
      }
    }
  }

  const mutationCreate = useMutation({
    mutationFn: (variable) => axios.post("/api/products", variable),
    onSuccess() {
      setSuccessMessage(
        "Congratulations, your Prodcut has been successfully created."
      );
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => setSuccessMessage(""), 2000);
    },
    onError() {
      setFailMessage("Something");
      window.scrollTo({ top: 0, behavior: "instant" });
    },
  });

  const mutateEdit = useMutation({
    mutationFn: (variable) => axios.put(`/api/products/${id}`, variable),
    onSuccess() {
      setSuccessMessage(
        "Congratulations, your Prodcut has been successfully Upadted."
      );
      window.scrollTo({ top: 0, behavior: "instant" });
    },
    onError() {
      setFailMessage("Something");
      window.scrollTo({ top: 0, behavior: "instant" });
    },
  });

  async function onSubmit(data) {
    setFailMessage("");
    setSuccessMessage("");
    if (type == "edit") {
      if (data.coverImage?.length) {
        data.coverImage = coverImageSelected.substring(21);
      } else {
        data.coverImage = "";
      }
      mutateEdit.mutate(data);
    } else {
      if (data.coverImage?.length) {
        data.coverImage = coverImageSelected.substring(21);
      } else {
        data.coverImage = "";
      }
      mutationCreate.mutate(data);
    }
  }
  console.log(fields);
  function handleRemoveImage() {
    setAlbumImage(noImage);
    // setValue("coverImage", "");
  }
  // function handlerAddFeature(value) {
  //   console.log("value", value);
  //   setListFeature([...listFeature, value]);
  //   setAddF("");
  // }

  // function handlerRemoveFeature(value) {
  //   const newList = listFeature.filter((f) => f !== value);
  //   setListFeature(newList);
  // }
  return (
    <div className="">
      <div className="my-10">
        {successMessage ? (
          <div className="bg-green-500 px-2 py-1 my-10 rounded-md text-center font-bold text-lg  md:text-3xl">
            <p className="text-white">{successMessage}</p>
          </div>
        ) : failMessage ? (
          <div className="bg-red-700 px-2 py-2 my-10 rounded-md text-center font-bold text-lg  md:text-3xl">
            <p className="text-white">{failMessage}</p>
          </div>
        ) : (
          ""
        )}
        <form
          className="grid md:grid-cols-2  gap-10 md:gap-16"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="flex flex-col mb-10">
              <label className="text-web3 text-xl mr-2 mb-1">Title</label>
              <input
                className="border  px-2 py-1 rounded-md"
                placeholder="Enter a title of product"
                {...register("title", {
                  required: "Please enter a title for your product.",
                  minLength: {
                    value: 3,
                    message: "title must be 3 Characters at least",
                  },
                  maxLength: {
                    value: 20,
                    message: "title must be 20 Characters at most",
                  },
                })}
              />
              {errors.title && (
                <div className="bg-red-700 text-white py-1 px-2 rounded-md my-3">
                  <p>{errors.title.message}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col mb-10">
              <label className="  mr-2 mb-1 text-web3 text-xl">Category</label>
              <select
                className="border bg-white text-web4 outline-none px-2 py-2 rounded-md"
                {...register("category", {
                  required: "Select the category",
                })}
              >
                <option className="my-2  ">Web Design</option>
                <option className="my-2  ">Programming</option>
                <option className="my-2  ">Logo</option>
              </select>
              {errors.category && (
                <div className="bg-red-700 text-white py-1 px-2 rounded-md my-3">
                  <p>{errors.category.message}</p>
                </div>
              )}
            </div>
            <div className=" flex justify-around items-center  mb-10">
              <div className="w-1/3">
                <img
                  className="bg-red-200  rounded-md"
                  src={coverImageSelected}
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
                    {...coverImage}
                    onChange={handleImageCover}
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
                <img className="bg-red-200  rounded-md" src={albumImage} />
              </div>
              <div>
                <div className="flex mb-4">
                  <input
                    className="outline-none  hidden "
                    type="files"
                    id="images"
                    accept="image/*"
                  />
                  <label
                    htmlFor="images"
                    className="text-base sm:text-lg cursor-pointer border w-36 sm:w-44 text-center  py-1 rounded-md bg-web2 hover:bg-web3 text-web4 hover:text-web1"
                  >
                    Upload Album
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
                    onClick={() => handleRemoveImage()}
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
                {...register("desc", {
                  required: "Please enter a description for your product.",
                  minLength: {
                    value: 20,
                    message: "description must be 20 Characters at least",
                  },
                  maxLength: {
                    value: 500,
                    message: "description must be 500 Characters at most",
                  },
                })}
              ></textarea>
              {errors.desc && (
                <div className="bg-red-700 text-white py-1 px-2 rounded-md my-3">
                  <p>{errors.desc.message}</p>
                </div>
              )}
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
                {...register("serviceTitle", {
                  required: "Please enter a Service Title for your product.",
                  minLength: {
                    value: 3,
                    message: "Service Title must be 3 Characters at least",
                  },
                  maxLength: {
                    value: 20,
                    message: "Service Title must be 20 Characters at most",
                  },
                })}
              />
              {errors.serviceTitle && (
                <div className="bg-red-700 text-white py-1 px-2 rounded-md my-3">
                  <p>{errors.serviceTitle.message}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col mb-10">
              <label className="text-web3 text-xl mr-2 mb-1">
                Short Description
              </label>
              <textarea
                className="border  px-2 py-1 rounded-md outline-web3"
                placeholder="Short description of your product"
                rows={5}
                {...register("shortDesc", {
                  required: "Please enter a shortDesc for your product.",
                  minLength: {
                    value: 10,
                    message: "shortDesc must be 10 Characters at least",
                  },
                  maxLength: {
                    value: 70,
                    message: "shortDesc must be 70 Characters at most",
                  },
                })}
              ></textarea>
              {errors.shortDesc && (
                <div className="bg-red-700 text-white py-1 px-2 rounded-md my-3">
                  <p>{errors.shortDesc.message}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col mb-10">
              <label className="text-web3 text-xl mr-2 mb-1 ">
                Delivery Time
              </label>
              <input
                className="border outline-web3 px-2 py-1 rounded-md"
                type="number"
                {...register("deliveryTime", {
                  required: "Please enter a deliveryTime for your product.",
                })}
              />
              {errors.deliveryTime && (
                <div className="bg-red-700 text-white py-1 px-2 rounded-md my-3">
                  <p>{errors.deliveryTime.message}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col mb-10">
              <label className="text-web3 text-xl mr-2 mb-1 ">
                Revision Number
              </label>
              <input
                className="border outline-web3 px-2 py-1 rounded-md"
                type="number"
                {...register("revisionNumber", {
                  required: "Please enter a revisionNumber for your product.",
                })}
              />
              {errors.revisionNumber && (
                <div className="bg-red-700 text-white py-1 px-2 rounded-md my-3">
                  <p>{errors.revisionNumber.message}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col mb-10">
              <label className="text-web3 text-xl mr-2 mb-1 ">
                Add Feature
              </label>
              <div className="border mb-2 focus-within:border-web3 flex justify-between items-start rounded-md overflow-hidden">
                <input
                  className=" px-2 py-1 rounded-md outline-none h-8"
                  {...register("feature")}
                />
                <span
                  className="bg-web2 text-web4 hover:bg-web3 hover:text-web1 h-8 flex items-center px-3 cursor-pointer"
                  onClick={addFeature}
                >
                  Add
                </span>
              </div>
              <div>
                {fields.map((f, index) => {
                  return (
                    <div
                      key={f.id}
                      className="relative inline-block bg-web3 px-6 py-2 text-xs text-web1 mx-1 rounded-sm"
                    >
                      <span>{f.value}</span>
                      <span
                        className="text-xxs text-white border  absolute top-0.5 right-0.5 cursor-pointer hover:bg-web1 hover:text-web4 rounded-full"
                        onClick={() => remove(index)}
                      >
                        <RxCross2 />
                      </span>
                    </div>
                  );
                })}
              </div>
              {errors.title && (
                <div className="bg-red-700 text-white py-1 px-2 rounded-md my-3">
                  <p>{errors.title.message}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col mb-10">
              <label className="text-web3 text-xl mr-2 mb-1 ">Price</label>
              <input
                className="border outline-web3 px-2 py-1 rounded-md"
                type="number"
                {...register("price", {
                  required: "Please enter a price for your product.",
                })}
              />
              {errors.price && (
                <div className="bg-red-700 text-white py-1 px-2 rounded-md my-3">
                  <p>{errors.price.message}</p>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-web2 hover:bg-web3 text-web4 hover:text-web1  w-full rounded-md text-base sm:text-xl font-bold py-2"
          >
            {type == "edit" ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
