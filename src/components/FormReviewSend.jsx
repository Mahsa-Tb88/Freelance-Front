import React from "react";

export default function FormReviewSend() {
  return (
    <div>
      <form className="bg-web3 px-8 py-7 rounded-md">
        <h3 className="font-bold text-web1 mb-3">Add Your Review</h3>
        <textarea
          className="placeholder:text-gray-100 resize-none border w-full bg-transparent border-web2 rounded-md outline-none focus-within:border-web1 px-2 py-2 text-lg text-web1"
          rows={6}
          placeholder="write your review..."
        />
        <div>
          <select className="w-1/5 py-2 px-2 rounded-md cursor-pointer mt-4 bg-web1 border-web1">
            <option className="" value={1}>
              1
            </option>
            <option className="" value={2}>
              2
            </option>
            <option className="" value={3}>
              3
            </option>
            <option className="" value={4}>
              4
            </option>
            <option className="" value={5}>
              5
            </option>
          </select>
        </div>
        <div className="mt-10 bg-web1 text-web3 w-1/2 hover:bg-web4 hover:text-web1 py-2 text-xl text-center rounded-md cursor-pointer">
          Submit
        </div>
      </form>
    </div>
  );
}
