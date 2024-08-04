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



  const limit = 4;
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
      <div className="flex flex-col  justify-between items-start gap-9">
        <div className="bg-red-400">
          <Filter />
        </div>
        <div className="">
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
                    <div key={i} className="grid  grid-cols-4  gap-6">
                      {page.data.body.map((p, i) => (
                        <CartProduct p={p} key={i}/>
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
