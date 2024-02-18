"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLoggedIn,
  getCookies,
  selectIsAdmin,
  selectStatus,
  selectResponseMessage,
  selectError,
  selectToken,
  userAsync,
} from "@/lib/redux";
import { redirect } from "next/navigation";
import { Oval } from "react-loader-spinner";

export default function UserDashboard() {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const status = useSelector(selectStatus);
  const message = useSelector(selectResponseMessage);
  const error = useSelector(selectError);
  const token = useSelector(selectToken);

  const dispatch = useDispatch();

  dispatch(getCookies());

  const onSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(userAsync(token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        redirect("/admin/dashboard");
      }
    } else {
      redirect("/");
    }
  }, [isAuthenticated, isAdmin]);

  return (
    <div className="w-[512px] h-[256px] bg-gray-300 mx-auto my-32 p-8 flex flex-col items-center rounded-lg drop-shadow-xl">
      <div> Click user Operation to make an api request </div>
      <div className="text-xl font-bold"> Welcome to user dashboard </div>
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
          className="my-auto bg-primary p-3 rounded-md text-white hover:bg-primary-hover transition"
        >
          {" "}
          User Operation{" "}
        </button>
      )}

      {message && <div className="text-green-500 mt-4">{message}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}
