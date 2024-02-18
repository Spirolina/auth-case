"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCookies,
  selectForm,
  selectIsAdmin,
  selectIsLoggedIn,
} from "@/lib/redux";
import Login from "./Login";
import Signup from "./Signup";
import { redirect } from "next/navigation";

export default function Form() {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const form = useSelector(selectForm);
  const dispatch = useDispatch();

  dispatch(getCookies());

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        redirect("/admin/dashboard");
      } else {
        redirect("/user/dashboard");
      }
    }
  }, [isAuthenticated, isAdmin]);

  return form === "login" ? <Login /> : <Signup />;
}
