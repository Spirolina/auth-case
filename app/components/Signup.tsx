import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  selectError,
  selectStatus,
  setError,
  setForm,
  signupAsync,
  useSelector,
} from "@/lib/redux";
import Toggle from "react-toggle";
import { Oval } from "react-loader-spinner";

export default function Signup() {
  const [isToggled, setIsToggled] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();
  const onClickSignup = (e: any) => {
    e.preventDefault();
    if (username === "" || password === "" || passwordConfirmation === "") {
      dispatch(setError("Please fill in all fields"));
      return;
    }
    if (password !== passwordConfirmation) {
      dispatch(setError("Passwords do not match"));
      return;
    }
    const credentials = { username, password, isAdmin: isToggled };
    dispatch(signupAsync(credentials)); // Specify the type of the action being dispatched
  };

  const onClickLogin = (e: any) => {
    e.preventDefault();
    dispatch(setForm("login"));
  };
  return (
    <>
      <form className="flex flex-col w-[512px] mx-auto mt-16 bg-gray-200 p-16 rounded-lg drop-shadow-lg">
        <div className="mb-4 font-bold text-xl"> Signup </div>
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
          className="drop-shadow py-3 px-2 mb-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          type="password"
          placeholder="Password"
        />
        <input
          onChange={(e: any) => setPasswordConfirmation(e.target.value)}
          value={passwordConfirmation}
          className="drop-shadow py-3 px-2 mb-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          type="password"
          placeholder="Password Confirmation"
        />

        <label className="flex items-center mb-8">
          <Toggle
            defaultChecked={isToggled}
            onChange={() => setIsToggled(!isToggled)}
          />
          <span className="ml-2"> Are you registering as an admin ?</span>
        </label>
        {status === "loading" ? (
          <Oval wrapperClass="mx-auto" color="#0588e7" height={40} width={40} />
        ) : (
          <button
            onClick={onClickSignup}
            className="bg-primary p-2 text-white w-[256px] mx-auto rounded-md drop-shadow-lg hover:bg-primary-hover transition"
          >
            Signup
          </button>
        )}
      </form>
      <div>
        <div className="flex justify-center mt-6">
          <div className="text-gray-500"> Already have an account? </div>
          <button
            onClick={onClickLogin}
            className="text-primary ml-2 hover:underline transition"
          >
            {" "}
            Login{" "}
          </button>
        </div>
      </div>
    </>
  );
}
