import React, { useEffect } from "react";
import { useInfinityProducts } from "../utils/queries";
import CartProduct from "../components/CartProduct";
import { useInView } from "react-intersection-observer";
import Filter from "../components/Filter";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../store/slices/productSlice";

export default function AllProducts() {
  const { category, star, search, sort, order, Min, Max } = useSelector(
    (state) => state.product
  );
  console.log(star);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const star = searchParams.get("star") || "";
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "updatedAt";
    const order = searchParams.get("order") || "desc";
    const Min = searchParams.get("Min") || 0;
    const Max = searchParams.get("Max") || null;
    dispatch(
      productAction.setFilter({ category, star, search, sort, order, Min, Max })
    );
  }, [searchParams]);

  const limit = 6;
  const {
    isPending,
    isFetching,
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfinityProducts(limit, category, star, search, sort, order, Min, Max);
  return (
    <div className="my-10 w-11/12 mx-auto">
      <h1 className="text-center text-3xl text-web3 my-10">Products</h1>
      <div className="flex flex-col md:flex-row justify-between items-start gap-9">
        <div className=" w-1/4">
          <Filter />
        </div>
        <div className="w-3/4">
          {isPending ? (
            <div>
              <h2>Loading</h2>
            </div>
          ) : isError ? (
            <div>
              <h2>{error}</h2>
            </div>
          ) : (
            <div>
              <div>
                {data.pages.map((page, i) => {
                  return (
                    <div key={i} className="grid  grid-cols-3  gap-6">
                      {page.data.body.map((p, i) => (
                        <CartProduct p={p} key={i} />
                      ))}
                    </div>
                  );
                })}
              </div>
              <div
                className="flex justify-center items-center my-8"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetching}
                ref={ref}
              >
                <hr className="bg-web2 h-px w-full " />
                <p className=" w-72 text-web2 text-center">
                  {isFetching
                    ? "Loading"
                    : hasNextPage
                    ? "Next Page"
                    : !data.pages[0].data.body.length
                    ? "No Found Product"
                    : "No more Page"}
                </p>
                <hr className="bg-web2 h-px w-full" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
