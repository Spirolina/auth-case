"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  adminAsync,
  selectError,
  selectIsAdmin,
  selectIsLoggedIn,
  selectResponseMessage,
  selectStatus,
  selectToken,
} from "@/lib/redux";
import { getCookies } from "@/lib/redux";
import { redirect } from "next/navigation";
import { Oval } from "react-loader-spinner";

export default function AdminDashboard() {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const status = useSelector(selectStatus);
  const message = useSelector(selectResponseMessage);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  dispatch(getCookies());

  const onSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(adminAsync(token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (!isAdmin) {
        redirect("/user/dashboard");
      }
    } else {
      redirect("/");
    }
  }, [isAuthenticated, isAdmin]);

  return (
    <div className="w-[512px] h-[256px] bg-gray-300 mx-auto my-32 p-8 flex flex-col items-center rounded-lg drop-shadow-xl">
      <div className="text-xl font-bold"> Welcome to admin dashboard </div>
      <div> Click admin Operation to make an api request </div>
      {status === "loading" ? (
        <Oval
          wrapperClass="mx-auto my-auto"
          color="#0588e7"
          height={40}
          width={40}
        />
      ) : (
        <button
          onClick={onSubmit}
          className="my-auto bg-black p-3 rounded-md text-white hover:bg-gray-800 transition"
        >
          {" "}
          Admin Operation{" "}
        </button>
      )}
      {message && <div className="text-green-500 mt-4">{message}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}
