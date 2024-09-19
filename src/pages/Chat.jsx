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
  const user = useSelector((state) => state.user);
  const [newMsg, setNewMsg] = useState(user.unreadMsgs.length);

  const dispatch = useDispatch();
  const { data, isPending, isError, error, refetch } = usegetChatsById(
    params.id
  );
  useEffect(() => {
    if (user.unreadMsgs.length) {
      const newUnreadMsgs = user.unreadMsgs.filter((msg) => {
        return msg.chatId != params.id;
      });
      setNewMsg(newUnreadMsgs.length);
      dispatch(userActions.setUnreadMsgs(newUnreadMsgs));
    }
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
      onSuccess() {
        setText("");
        querryClient.invalidateQueries({
          queryKey: ["singleChat"],
        });
      },
      onError(error) {
        // setMsg(error.response.data.message);
        console.log("error is ", error.response.data.message);
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
                      <div className="flex justify-center items-center my-5">
                        <span className="bg-gray-200 w-full h-px "></span>
                        <span className="w-1/4 text-center text-gray-400">
                          {getDate(chat.createdAt)}
                        </span>
                        <span className="bg-gray-200 w-full h-px "></span>
                      </div>
                    )}
                    {chat.userId._id == user.user.id ? (
                      <div className="my-5">
                        <span className="flex justify-end">
                          {chat.userId.profileImg ? (
                            <img
                              src={SERVER_URL + chat.userId.profileImg}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <p className="w-10 h-10 bg-slate-200 rounded-full flex justify-center items-center text-web4 font-bold">
                              {chat.userId.username
                                .toUpperCase()
                                .substring(0, 1)}
                            </p>
                          )} 
                        </span>
                        <div className=" mt-2 ">
                          <div className="flex flex-col justify-end items-end  text-web4 ">
                            <div className="bg-web2 py-1 px-4 rounded-xl ">
                              <p>{chat.desc}</p>
                              <span className="text-xs  text-web1 pt-1 bg-web2">
                                {getTime(chat.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="my-5">
                          <span className="flex justify-start">
                            {chat.userId.profileImg ? (
                              <img
                                src={SERVER_URL + chat.userId.profileImg}
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <p className="w-10 h-10 bg-slate-200 rounded-full flex justify-center items-center text-web4 font-bold">
                                {chat.userId.username
                                  .toUpperCase()
                                  .substring(0, 1)}
                              </p>
                            )}
                          </span>
                          <div className=" mt-2 ">
                            <div className="flex flex-col justify-start items-start  text-web1 ">
                              <div className="bg-web3 py-1 px-4 rounded-xl ">
                                <p>{chat.desc}</p>
                                <span className="text-xs  text-web1 pt-1">
                                  {getTime(chat.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
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
