import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/slices/userSlices";
import { useSignOut } from "../utils/queries";

export default function UserMenu() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOutMutation = useSignOut();
  const userMenuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handlerUserMenu);
    return () => removeEventListener("mousedown", handlerUserMenu);
  }, []);

  function handlerUserMenu(e) {
    console.log("userMenuRef.current is: ", userMenuRef.current);
    if (!userMenuRef.current?.contains(e.target)) {
      dispatch(userActions.setOpenUserMenu(false));
    }
  }

  function handlerSignOut() {
    signOutMutation.mutate({},{
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
              unreadMsgs: 0,
              unSeenOrders: 0,
            })
          );
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
          className={`w-36 rounded-md  px-1 transitionMenu  ${
            user.isOpenUserMenu && !user.user.isSeller
              ? " bg-web2 h-40"
              : user.isOpenUserMenu && user.user.isSeller
              ? "bg-web2 h-60"
              : "h-0"
          }`}
        >
          {user.isOpenUserMenu && (
            <div className="flex flex-col gap-2 py-4 ">
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
                {user.user.unSeenOrders ? (
                  <span className="bg-red-500 text-web1 w-4 h-4 flex justify-center items-center rounded-full">
                    {user.user.unSeenOrders}
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
                {user.user.unreadMsgs > 0 && (
                  <span className="bg-red-500 h-4 w-4 rounded-full flex items-center justify-center text-sm ">
                    {user.user.unreadMsgs}
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
          )}
        </div>
      </div>
    </div>
  );
}

{
  /* 
className={`transitionMenu ${
  user.isOpenUserMenu && user.user.isSeller
    ? "h-40 bg-web2  md:h-60 overflow-hidden flex flex-col justify-center items-start gap-1 md:gap-3 py-3 w-36  px-1  rounded-md"
    : "h-0 hidden "
}${
  user.isOpenUserMenu && !user.user.isSeller
    ? "h-105 bg-web2 md:h-40  overflow-hidden flex flex-col justify-center items-start gap-1 md:gap-3 py-3 w-36  px-1  rounded-md"
    : "h-0 hidden"
}` */
}
