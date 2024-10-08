import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpenCat, setIsOpenCat] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isFilterByStar, setIsFilterByStar] = useState(false);
  const [isFilterBySort, setIsFilterBySort] = useState(false);
  const [categories, setCategories] = useState([]);

  const { star, search, sort, order, Min, Max } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (searchParams.get("category")) {
      const categoryGroup = searchParams.get("category").split(",");
      setCategories(categoryGroup);
    }
  }, []);

  function handlerSelectCategories(value) {
    let newCategories;
    if (categories.includes(value)) {
      newCategories = categories.filter((c) => c != value);
      setCategories(newCategories);
    } else {
      newCategories = [...categories, value];
      setCategories(newCategories);
    }
    const params = getNewSearchParams(
      searchParams,
      "category",
      newCategories.toString()
    );
    setSearchParams(params);
  }
  function getTypeCategory(value) {
    const categoryGroup = searchParams.get("category");
    if (categoryGroup) {
      if (categoryGroup.includes(value)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function handlerSearch(value) {
    const params = getNewSearchParams(searchParams, "search", value);
    setSearchParams(params);
  }

  function handlerPrice(value, p) {
    if (p == "Min") {
      const params = getNewSearchParams(searchParams, "Min", value);
      setSearchParams(params);
    } else {
      const params = getNewSearchParams(searchParams, "Max", value);
      setSearchParams(params);
    }
  }

  function handlerStar(value) {
    const params = getNewSearchParams(searchParams, "star", value);
    setSearchParams(params);
  }

  function handlerSort(value) {
    let newValue = { sort: "updatedAt", order: "desc" };
    if (value == "Cheapest") {
      newValue.sort = "price";
      newValue.order = "asc";
    } else if (value == "The most Expensive") {
      newValue.sort = "price";
    } else if (value == "Oldest") {
      newValue.order = "asc";
    }
    const params = getNewSearchParams(searchParams, "sort", newValue.sort);
    const secondparams = getNewSearchParams(params, "order", newValue.order);
    setSearchParams(secondparams);
  }

  function getSortType() {
    if (sort === "updatedAt" && order === "desc") {
      return "Newest";
    } else if (sort === "updatedAt" && order === "asc") {
      return "Oldest";
    } else if (sort === "price" && order === "desc") {
      return "The most Expensive";
    } else if (sort === "price" && order === "asc") {
      return "Cheapest";
    }
  }

  const categoriesList = ["Design", "Logo", "Programming", "Photography"];
  return (
    <div>
      <div className="border flex justify-between items-center px-2 py-1 rounded-md border-web2 focus-within:border-web3">
        <input
          placeholder="Search"
          className="w-full outline-none"
          onChange={(e) => handlerSearch(e.target.value)}
          value={search}
        />
        <IoSearchOutline />
      </div>
      <div className="mt-20">
        <div className="my-8">
          <div
            className="flex justify-between items-center text-web4 font-semibold text-xl border-b pb-1 my-2 cursor-pointer hover:border-b-web3 "
            onClick={() => setIsOpenCat(!isOpenCat)}
          >
            <span className="">Categories</span>
            <span>
              <IoIosArrowDown
                style={{
                  rotate: isOpenCat ? "180deg" : "0deg",
                  transition: "all 0.5s ease-out",
                }}
              />
            </span>
          </div>
          <div
            className={`text-web4   transitionMenu  ${
              isOpenCat ? "h-20  opacity-100 " : "h-0 opacity-0 "
            }`}
          >
            {categoriesList.map((c) => {
              return (
                <div key={c} className={`${isOpenCat ? "flex" : "hidden"}`}>
                  <input
                    id={c}
                    type="checkbox"
                    className="mx-2 accent-web2 "
                    value={c}
                    onChange={(e) => handlerSelectCategories(e.target.value)}
                    checked={getTypeCategory(c)}
                  />
                  <label htmlFor={c}>{c}</label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="my-8 ">
          <div
            className="flex  justify-between items-center text-web4 font-semibold text-xl border-b pb-1 mb-4 cursor-pointer hover:border-b-web3"
            onClick={() => setIsOpenPrice(!isOpenPrice)}
          >
            <span>Filter by Price</span>
            <span>
              <IoIosArrowDown
                style={{
                  rotate: isOpenPrice ? "180deg" : "0deg",
                  transition: "all 0.5s ease-out",
                }}
              />
            </span>
          </div>
          <div
            className={`text-web4 transitionMenu    ${
              isOpenPrice ? " opacity-100 h-16" : " opacity-0 h-0"
            }`}
          >
            {["Min", "Max"].map((p) => {
              return (
                <div
                  className={`text-web4 mb-3 ${
                    isOpenPrice ? "flex" : "hidden"
                  }`}
                  key={p}
                >
                  <label className="mr-2">{p} Price: $</label>
                  <input
                    className="border rounded-md w-1/3 outline-none px-1"
                    type="number"
                    onChange={(e) => handlerPrice(e.target.value, p)}
                    value={p == "Min" ? Min : Max}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="my-8">
          <div
            className="flex justify-between items-center text-web4 font-semibold text-xl border-b pb-1 mb-4 cursor-pointer hover:border-b-web3"
            onClick={() => setIsFilterByStar(!isFilterByStar)}
          >
            <span>Filter By Star</span>
            <p>
              <IoIosArrowDown
                style={{
                  rotate: isFilterByStar ? "180deg" : "0deg",
                  transition: "all 0.5s ease-out",
                }}
              />
            </p>
          </div>
          <div
            className={`text-web4  transitionMenu  ${
              isFilterByStar ? "h-5 opacity-100 " : "h-0 opacity-0 "
            }`}
          >
            <div
              className={` text-web4 mb-4 ${
                isFilterByStar ? "flex" : "hidden"
              }`}
            >
              <label className="mr-2">Num of Star:</label>
              <input
                className="border rounded-md w-1/3 outline-none px-1"
                type="number"
                onChange={(e) => handlerStar(e.target.value)}
                value={star}
              />
            </div>
          </div>
        </div>

        <div className="my-8">
          <div
            className="flex justify-between items-center text-web4 font-semibold text-xl border-b pb-1 my-3 cursor-pointer hover:border-b-web3"
            onClick={() => setIsFilterBySort(!isFilterBySort)}
          >
            <span>Sort By</span>

            <span>
              <IoIosArrowDown
                style={{
                  rotate: isFilterBySort ? "180deg" : "0deg",
                  transition: "all 0.5s ease-out",
                }}
              />
            </span>
          </div>
          <div
            className={`text-web4  transitionMenu  ${
              isFilterBySort ? "h-3 opacity-100" : "h-0 opacity-0 "
            }`}
          >
            {["The most Expensive", "Cheapest", "Newest", "Oldest"].map((s) => {
              return (
                <div className="mb-3" key={s}>
                  <input
                    type="radio"
                    name="filter"
                    className="mx-2 accent-web2 "
                    onChange={(e) => handlerSort(e.target.value)}
                    value={s}
                    checked={getSortType() == s}
                  />
                  <label>{s}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
