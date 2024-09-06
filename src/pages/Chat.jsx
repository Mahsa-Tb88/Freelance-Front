import React, { useEffect, useState } from "react";
import { usegetChatsById, usetextChat } from "../utils/queries";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/slices/userSlices";
import { Helmet } from "react-helmet";

export default function Chat() {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState(false);
  const params = useParams();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { data, isPending, isError, error } = usegetChatsById(params.id);

  console.log("component chat...");
  if (data) {
    console.log("data chat comp", data);
  }
  useEffect(() => {
    console.log("useeffect chat comp");
    dispatch(userActions.setUser({ ...user, unreadMsgs: 0 }));
  }, []);

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

  function textHandler(value) {
    setText(value);
    setMsg(false);
  }

  function submitHandler(e) {
    e.preventDefault();

    let myData;
    if (text) {
      myData = { desc: text, chatId: params.id };
    } else {
      setMsg("Please write your words, the filed is empty!");
    }
    sentChat.mutate(myData, {
      onSuccess(data) {
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
    <div className="w-5/6 mx-auto my-28 ">
      <Helmet>
        <title>Chat</title>
      </Helmet>
      <div className="">
        {isPending ? (
          <div className="bg-web1  px-2 py-4 rounded">
            <span className="text-center text-web3 font-bold text-lg">
              Loading ...
            </span>
          </div>
        ) : isError ? (
          <div className="text-center text-red-700 text-lg font-bold bg-web1  px-2 py-4 rounded">
            <span>{error.response.data.message}</span>
          </div>
        ) : data.data.body.length ? (
          <div>
            <div className="bg-web1 py-5 rounded">
              {data.data.body.map((chat, index) => {
                return (
                  <div key={chat._id} className="bg-web1  px-2   rounded">
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
                    {chat.userId == user.id ? (
                      <div className="text-right ">
                        <div className="inline-block px-4 rounded-xl text-web4 py-1 my-1 bg-web2">
                          <span className="">{chat.desc}</span>
                          <p className="text-xs text-web1 mt-1">
                            {getTime(chat.createdAt)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="bg-web3 inline-block px-4 rounded-xl text-web1 py-1 my-1">
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
            <div>
              <textarea
                className="resize-none border my-4 w-full rounded px-2 py-3 outline-none focus-within:outline-web3 text-web4 text-lg"
                onChange={(e) => textHandler(e.target.value)}
                value={text}
              />
              {msg && <p className="text-red-600 mb-3">{msg}</p>}

              <button
                type="submit"
                onClick={(e) => submitHandler(e)}
                className="bg-web2 text-web4 hover:bg-web3 hover:text-web1 rounded px-2 py-2 w-20 font-bold"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="">
            <p className="text-web4 bg-web1  px-2 py-4 rounded">
              There is no chat yet
            </p>
            <div className="bg-transparent">
              <textarea
                className="resize-none border my-4 w-full rounded px-2 py-3 outline-none focus-within:outline-web3 text-web4 text-lg"
                onChange={(e) => textHandler(e.target.value)}
                value={text}
              />
              {msg && <p className="text-red-600 mb-3">{msg}</p>}
              <button
                type="submit"
                onClick={(e) => submitHandler(e)}
                className="bg-web2 text-web4 hover:bg-web3 hover:text-web1 rounded px-2 py-2 w-20 font-bold"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
