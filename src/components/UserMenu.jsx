import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/slices/userSlices";
import { useSignOut } from "../utils/queries";

export default function UserMenu() {
  const user = useSelector((state) => state.user);
  console.log("userMenu...", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOutMutation = useSignOut();
  const userMenuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handlerUserMenu);
    return () => document.removeEventListener("mousedown", handlerUserMenu);
  }, []);

  function handlerUserMenu(e) {
    if (!userMenuRef.current?.contains(e.target)) {
      dispatch(userActions.setOpenUserMenu(false));
    }
  }

  function handlerSignOut() {
    signOutMutation.mutate(
      {},
      {
        onSuccess() {
          dispatch(
            userActions.setUser({
              isLoggedIn: false,
              isSeller: false,
              id: "",
              username: "",
              profileImg: "",
              desc: "",
              country: "",
            })
          );
          dispatch(userActions.setUnreadMsgs({ unreadMsgs: [] }));
          dispatch(userActions.setUnseenOrders({ unseenOrders: 0 }));
          dispatch(userActions.setOpenUserMenu(false));
          navigate("/");
        },

        onError(error) {
          console.log(error.respond.data.message);
        },
      }
    );
  }
  return (
    <div>
      <div ref={userMenuRef}>
        <div
          className={`w-36 rounded-md  px-1 transitionMenu ${
            user.isOpenUserMenu && !user.user.isSeller
              ? " bg-web2 h-32 md:h-36 lg:h-40 opacity-100"
              : user.isOpenUserMenu && user.user.isSeller
              ? "bg-web2 h-44 md:h-56  lg:h-60 opacity-100"
              : "h-0 opacity-0"
          }`}
        >
          {
            <div
              className={` flex-col gap-2 py-4 ${
                user.isOpenUserMenu ? "flex" : "hidden"
              }`}
            >
              {user.user.isSeller && (
                <div className=" flex flex-col items-center justify-center gap-1 md:gap-3">
                  <Link
                    to={"/myProducts/" + user.user.id}
                    className="text-web1 text-xs md:text-base hover:text-web4 hover:bg-web1 px-2 py-1 w-full rounded-md"
                  >
                    My Products
                  </Link>
                  <Link
                    to="addProduct"
                    className="text-web1 text-xs md:text-base hover:text-web4 hover:bg-web1 px-2 py-1 w-full rounded-md"
                  >
                    Add New Product
                  </Link>
                </div>
              )}
              <Link
                to="/orders"
                className="text-web1 text-xs md:text-base hover:text-web4 hover:bg-web1 px-2 py-1 w-full rounded-md flex justify-between items-center"
              >
                <span>Orders</span>
                {user.unseenOrders ? (
                  <span className="bg-red-500 text-web1 w-4 h-4 flex justify-center items-center rounded-full">
                    {user.unseenOrders}
                  </span>
                ) : (
                  ""
                )}
              </Link>
              <Link
                to={`/messages/${user.user.id}`}
                className="flex group items-center justify-between text-web1 text-xs md:text-base  hover:bg-web1 px-2 py-1 w-full rounded-md"
              >
                <span className="group-hover:text-web4">Messages</span>
                {user.unreadMsgs.length > 0 && (
                  <span className="bg-red-500 h-4 w-4 rounded-full flex items-center justify-center text-sm ">
                    {user.unreadMsgs.length}
                  </span>
                )}
              </Link>
              <Link
                className="text-web1 text-xs md:text-base hover:text-web4 hover:bg-web1 px-2 py-1 w-full rounded-md"
                onClick={() => handlerSignOut()}
              >
                SignOut
              </Link>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
