import React, { useEffect } from "react";
import { useInfinityProducts } from "../utils/queries";
import CartProduct from "../components/CartProduct";
import { useInView } from "react-intersection-observer";
import Filter from "../components/Filter";

export default function AllProducts() {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

  const limit = 3;
  const {
    isPending,
    isFetching,
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfinityProducts(limit);
  return (
    <div className="my-10 w-11/12 mx-auto">
      <h1 className="text-center text-3xl text-web3 my-10">Products</h1>
      <div className="flex flex-col md:flex-row justify-between items-start gap-9" >
        <div className="bg-red-400 w-1/4 h-svh">
          <Filter />
        </div>
        <div className="w-3/4 bg-black h-svh overflow-auto">
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
              <div className="grid  md:grid-cols-4 gap-5">
                {data.pages.map((page, i) => {
                  return (
                    <div key={i}>
                      {page.data.body.map((p, i) => (
                        <CartProduct p={p} />
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
                <p className=" w-64 text-web2 text-center">
                  {isFetching
                    ? "Loading"
                    : hasNextPage
                    ? "Next Page"
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
