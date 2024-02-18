"use client";
import React from "react";
import { logOut, selectIsAdmin, selectIsLoggedIn } from "@/lib/redux";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  const color = isAdmin ? "black" : "primary";

  const onLogoutClick = (e: any) => {
    e.preventDefault();
    dispatch(logOut());
  };

  return (
    <div
      className={`flex bg-${color} h-[60px] items-center py-2 px-6 relative ${isLoggedIn ? "block" : "hidden"}`}
    >
      <div className="bg-white h-9 w-9 rounded-md"></div>
      <div className="text-white font-bold ml-2">Logo</div>

      <div className="absolute text-white font-semibold left-1/2 -translate-x-1/2">
        Autentication Case
      </div>

      <button
        onClick={onLogoutClick}
        className="bg-logout hover:bg-logout-hover ml-auto px-2 py-1 rounded-md "
      >
        {" "}
        Log Out{" "}
      </button>
    </div>
  );
}
