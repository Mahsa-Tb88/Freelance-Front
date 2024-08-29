import React, { useState } from "react";
import { usegetChatsById, usetextChat } from "../utils/queries";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function Chat() {
  const [text, setText] = useState("");
  const params = useParams();
  const user = useSelector((state) => state.user.user);

  const { data, isPending, isError, error } = usegetChatsById(params.id);

  if (data) {
    console.log(data.data.body);
  }
  const querryClient = useQueryClient();
  const sentChat = usetextChat();

  function getTime(time) {
    const createdAt = new Date(time);

    const hours = createdAt.getHours().toString().padStart(2, "0");
    const minutes = createdAt.getMinutes().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }

  function getDate(dateString) {
    const myDate = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = myDate.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

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
          <div>
            <span className="text-center text-web3 font-bold text-lg">
              Loading ...
            </span>
          </div>
        ) : isError ? (
          <div className="text-center text-red-700 text-lg font-bold">
            <span>{error.response.data.message}</span>
          </div>
        ) : data.data.body.length ? (
          <div>
            {data.data.body.map((chat, index) => {
              return (
                <div key={chat._id}>
                  {getDate(chat.createdAt) ==
                  getDate(data.data.body[index - 1]?.createdAt) ? (
                    ""
                  ) : (
                    <div className="flex justify-center items-center">
                      <span className="bg-gray-200 w-full h-px "></span>
                      <span className="w-1/4 text-center text-gray-400">
                        {getDate(chat.createdAt)}
                      </span>
                      <span className="bg-gray-200 w-full h-px "></span>
                    </div>
                  )}
                  {chat.fromUserId == user.id ? (
                    <div className="  text-right ">
                      <div className="inline-block px-2 rounded-xl text-web4 py-1 my-1 bg-web2">
                        <span className="">{chat.desc}</span>
                        <p className="text-xs text-web1 mt-1">
                          {getTime(chat.createdAt)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-web3 inline-block px-2 rounded-xl text-web1 py-1 my-1">
                        <span className="">{chat.desc}</span>
                        <p className="text-xs text-web2 mt-1">
                          {getTime(chat.createdAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center">
            <span className="text-web4">There is no chat yet</span>
          </div>
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
