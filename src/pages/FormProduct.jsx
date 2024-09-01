import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { uploadFile, useCreateProduct, useEditProduct } from "../utils/queries";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export default function FormProduct({ product, type, id }) {
  const [successMessage, setSuccessMessage] = useState(false);
  const [failMessage, setFailMessage] = useState(false);
  const [imgCoverMsg, setImgCoverMsg] = useState(false);
  const noImage = SERVER_URL + "/uploads/profiles/profile1722016584144.png";
  const [coverImageSelected, setCoverImageSelected] = useState(noImage);
  const [albumImageSelected, setAlbumImageSelected] = useState([]);
  const [coverImageChanged, setCoverImageChanged] = useState(false);
  const [albumImageChanged, setAlbumImageChanged] = useState(false);
  const [featureValue, setFeatureValue] = useState("");

  const navigate = useNavigate();
  const clearSwitch = useRef(null);

  useEffect(() => {
    if (type === "edit") {
      setCoverImageSelected(SERVER_URL + `${product.coverImage}`);
      const newAlbumImage = product.albumImage.map((p) => {
        return SERVER_URL + p;
      });
      setAlbumImageSelected(newAlbumImage);
    }

    return () => clearTimeout(clearSwitch.current);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
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
      features: type == "edit" ? product.features : [],
      albumImage: type == "edit" ? product.albumImage : [],
    },
  });

  function addFeature() {
    if (featureValue) {
      console.log(watch("features"));
      setFeatureValue("");
      setValue("features", [...watch("features"), featureValue]);
    }
  }
  function removeFeature(value) {
    const newList = watch("features").filter((f) => f !== value);
    setValue("features", newList);
  }

  const coverImage = {
    ...register(
      "coverImage",
      type != "edit" && {
        required: "Please Upload a cover Image.",
      }
    ),
  };
  async function handleImageCover(e) {
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

  const albumImage = { ...register("albumImage") };
  async function handleImageAlbum(e) {
    setImgCoverMsg(false);
    albumImage.onChange(e);
    const file = e.target.files[0];

    if (file && albumImageSelected.length <= 4) {
      setAlbumImageChanged(true);
      const result = await uploadFile(file);
      if (result.success) {
        setAlbumImageSelected([
          ...albumImageSelected,
          SERVER_URL + result.body.url,
        ]);
        setValue("albumImage", [
          ...albumImageSelected,
          SERVER_URL + result.body.url,
        ]);
      } else {
        setImgCoverMsg(result.message);
        return;
      }
    }
  }
  function handleRemoveImage(p) {
    const list = [...albumImageSelected];
    const newList = list.filter((image) => image !== p);
    setAlbumImageSelected(newList);
  }

  const mutationCreate = useCreateProduct();
  const mutateEdit = useEditProduct();

  async function onSubmit(data) {
    setFailMessage("");
    setSuccessMessage("");
    if (type == "edit") {
      data.coverImage = coverImageSelected.substring(21);
      let newAlbumImage;
      newAlbumImage = albumImageSelected.map((p) => {
        return p.substring(21);
      });
      data.albumImage = newAlbumImage;
      mutateEdit.mutate(
        { FormData: data, id },
        {
          onSuccess(data) {
            setSuccessMessage(
              "Congratulations, your Prodcut has been successfully Upadted."
            );
            window.scrollTo({ top: 0, behavior: "instant" });
          },
          onError(error) {
            setFailMessage(error);

            window.scrollTo({ top: 0, behavior: "instant" });
          },
        }
      );
    } else {
      if (data.coverImage?.length) {
        data.coverImage = coverImageSelected.substring(21);
      } else {
        data.coverImage = "";
      }
      let newAlbumImage = [];
      if (data.albumImage.length) {
        newAlbumImage = data.albumImage.map((p) => {
          return p.substring(21);
        });
      }
      data.albumImage = newAlbumImage;
      mutationCreate.mutate(data, {
        onSuccess(data) {
          setSuccessMessage(
            "Congratulations, your Prodcut has been successfully created."
          );

          window.scrollTo({ top: 0, behavior: "instant" });
          clearSwitch.current = setTimeout(
            () => navigate(`/editProduct/${data.data.body._id}`),
            4000
          );
          setTimeout(() => setSuccessMessage(""), 4000);
        },
        onError(error) {
          setFailMessage(error.response.data.message);
          window.scrollTo({ top: 0, behavior: "instant" });
        },
      });
    }
  }

  return (
    <div className="">
      <div className="my-10">
        {successMessage ? (
          <div className="bg-green-500 px-2 py-2 my-20 rounded text-center font-bold text-lg  md:text-3xl">
            <p className="text-white">{successMessage}</p>
          </div>
        ) : failMessage ? (
          <div className="bg-red-700 px-2 py-2 my-20 rounded text-center font-bold text-lg  md:text-3xl">
            <p className="text-white">{failMessage}</p>
          </div>
        ) : (
          ""
        )}
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          {type == "edit" ? (
            <h1 className="text-web3 text-3xl sm:text-4xl mb-16">
              Edit Product
            </h1>
          ) : (
            <h1 className="text-web3 text-3xl sm:text-4xl mb-16">
              Add New Product
            </h1>
          )}
          <div className="grid md:grid-cols-2  gap-10 md:gap-16">
            <div>
              <div className="flex flex-col mb-10">
                <label className="text-web3 text-xl mr-2 mb-1">Title</label>
                <input
                  className="border text-web4  px-2 py-1 rounded-md focus-within:border-web3 outline-none"
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
                <label className="  mr-2 mb-1 text-web3 text-xl">
                  Category
                </label>
                <select
                  className="border bg-white text-web4 px-2 py-2 rounded-md focus-within:border-web3 outline-none"
                  {...register("category", {
                    required: "Select the category",
                  })}
                >
                  <option className="my-2" value={""}>
                    {" "}
                    Select a Category
                  </option>
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
                <div className="w-1/6">
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
                  {errors.coverImage && (
                    <div className="bg-red-700 text-white py-1 px-2 rounded-md my-3">
                      <p>{errors.coverImage.message}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className=" flex justify-around items-center  mb-10">
                <div className="w-1/3">
                  {albumImageSelected.length ? (
                    albumImageSelected.map((p) => {
                      return (
                        <div
                          key={p}
                          className="border rounded-md p-2 mb-2 flex justify-between "
                        >
                          <span
                            className="text-xs cursor-pointer hover:text-red-700"
                            onClick={() => handleRemoveImage(p)}
                          >
                            <RxCross2 />
                          </span>
                          <div className="flex justify-end items-center">
                            <span>Uploaded</span>
                            <img className=" w-1/3  rounded-md ml-2" src={p} />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <span className="border  p-2 rounded-md bg-gray-200 text-web4">
                      ImageAlbum Empty
                    </span>
                  )}
                </div>
                <div>
                  <input
                    className="outline-none  hidden "
                    type="file"
                    id="images"
                    accept="image/*"
                    {...albumImage}
                    disabled={albumImageSelected.length == 4}
                    onChange={handleImageAlbum}
                  />
                  <label
                    htmlFor="images"
                    className={`${"text-base  sm:text-lg  border px-4  text-center  py-2 rounded-md   text-web4 "}${
                      albumImageSelected.length == 4
                        ? " bg-web1"
                        : "bg-web2 hover:bg-web3 hover:text-web1 cursor-pointer"
                    }`}
                  >
                    Upload Image of Album
                  </label>
                  <p className="text-web4 text-sm text-center pt-2">
                    Max 4 photos
                  </p>
                </div>
              </div>
              <div className=" flex flex-col justify-around items-start  mb-10">
                <label className=" mr-2 mb-2 text-web3 text-xl">
                  Description of Product
                </label>

                <textarea
                  rows={10}
                  className="rounded-md border resize-none text-web4 focus-within:border-web3 outline-none px-2 py-1 w-full  "
                  placeholder="Description"
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
                />
                {errors.desc && (
                  <div className="bg-red-700 text-white py-1 px-2 rounded-md my-3">
                    <p>{errors.desc.message}</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-col mb-10">
                <label className="text-web3 text-xl mr-2 mb-1 outline-web3">
                  Service Title
                </label>
                <input
                  className="border text-web4  px-2 py-1 rounded-md focus-within:border-web3 outline-none"
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
                  className="border resize-none  px-2 py-1 rounded-md text-web4  focus-within:border-web3 outline-none"
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
                />
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
                  className="border  px-2 py-1 rounded-md text-web4 focus-within:border-web3 outline-none"
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
                  className="border px-2 py-1 rounded-md text-web4 focus-within:border-web3 outline-none"
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
                <div className="border mb-2 focus-within:border-web3 outline-none flex justify-between items-start rounded-md overflow-hidden">
                  <input
                    className=" px-2 py-1 rounded-md outline-none h-8 text-web4  w-full"
                    onChange={(e) => setFeatureValue(e.target.value)}
                    value={featureValue}
                  />
                  <span
                    className="bg-web2 text-web4 hover:bg-web3 hover:text-web1 h-8 flex items-center px-3 cursor-pointer"
                    onClick={addFeature}
                  >
                    Add
                  </span>
                </div>
                <div>
                  {watch("features") &&
                    watch("features").map((f) => {
                      return (
                        <div
                          key={f}
                          className="relative inline-block bg-web3 px-6 py-2 text-xs text-web1 mx-1 rounded-sm"
                        >
                          <span>{f}</span>
                          <span
                            className="text-xxs text-white border  absolute top-0.5 right-0.5 cursor-pointer hover:bg-web1 hover:text-web4 rounded-full"
                            onClick={() => removeFeature(f)}
                          >
                            <RxCross2 />
                          </span>
                        </div>
                      );
                    })}
                </div>
                {/* errors.features && (
                <div className="bg-red-700 text-white py-1 px-2 rounded-md my-3">
                  <p>{errors.features.message}</p>
                </div>
              ) */}
              </div>
              <div className="flex flex-col mb-10">
                <label className="text-web3 text-xl mr-2 mb-1 ">Price</label>
                <input
                  className="border focus-within:border-web3 outline-none  px-2 py-1 rounded-md"
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
          </div>
        </form>
      </div>
    </div>
  );
}
