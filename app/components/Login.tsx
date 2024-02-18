import {
  loginAsync,
  selectError,
  selectStatus,
  setError,
  setForm,
} from "@/lib/redux";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

  const onClickSignup = (e: any) => {
    e.preventDefault();
    dispatch(setForm("signup"));
  };

  const onClickLogin = (e: any) => {
    e.preventDefault();
    if (username === "" || password === "") {
      dispatch(setError("Please fill in all fields"));
      return;
    }
    const credentials = { username, password };
    dispatch(loginAsync(credentials));
  };

  return (
    <>
      <form className="flex flex-col w-[512px] mx-auto mt-16 bg-gray-200 p-16 rounded-lg drop-shadow-lg">
        <div className="mb-4 font-bold text-xl "> Login </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          onChange={(e: any) => setUsername(e.target.value)}
          value={username}
          className="drop-shadow py-3 px-2 mb-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          type="text"
          placeholder="Username"
        />
        <input
          onChange={(e: any) => setPassword(e.target.value)}
          value={password}
          className="drop-shadow py-3 px-2 mb-8 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          type="password"
          placeholder="Password"
        />
        {status === "loading" ? (
          <Oval wrapperClass="mx-auto" color="#0588e7" height={40} width={40} />
        ) : (
          <button
            onClick={onClickLogin}
            className="bg-primary p-2 text-white w-[256px] mx-auto rounded-md drop-shadow-lg hover:bg-primary-hover transition"
          >
            Login
          </button>
        )}
      </form>
      <div>
        <div className="flex justify-center mt-6">
          <div className="text-gray-500"> {"Don't have an account?"} </div>

          <button
            onClick={onClickSignup}
            className="text-primary ml-2 hover:underline transition"
          >
            {" "}
            Signup{" "}
          </button>
        </div>
      </div>
    </>
  );
}
