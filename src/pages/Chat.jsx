import React, { useState } from "react";
import { usegetChatsById, usetextChat } from "../utils/queries";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function Chat() {
  const [text, setText] = useState("");
  const params = useParams();

  const { data, isPending, isError, error } = usegetChatsById(params.id);

  if (data) {
    console.log(data.data.body);
  }
  const querryClient = useQueryClient();
  const sentChat = usetextChat();

  function submitHandler(e) {
    e.preventDefault();
    const myData = { desc: text, chatId: params.id };
    sentChat.mutate(myData, {
      onSuccess(data) {
        console.log("data...", data);
        setText("");
        querryClient.invalidateQueries({
          queryKey: ["singleChat"],
        });
      },
      onError(error) {
        console.log("error", error);
      },
    });
  }
  return (
    <div className="w-5/6 mx-auto my-14 ">
      <div className="bg-web1  px-2 py-4 rounded">
        {isPending ? (
          <div>pending</div>
        ) : isError ? (
          <div>error</div>
        ) : data ? (
          <div>
            {data.data.body.map((chat) => {
              return <p key={chat._id}>{chat.desc}</p>;
            })}
          </div>
        ) : (
          <div>Start chat</div>
        )}
      </div>
      <div>
        <textarea
          className="resize-none border my-4 w-full rounded px-2 py-3 outline-none focus-within:outline-web3 text-web4 text-lg"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          type="submit"
          onClick={(e) => submitHandler(e)}
          className="bg-web2 text-web4 hover:bg-web3 hover:text-web1 rounded px-2 py-2 w-20 font-bold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
