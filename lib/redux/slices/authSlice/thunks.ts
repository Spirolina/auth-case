import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { login } from "./login";
import { selectUser } from "./selectors";
import { authSlice, logOut, setResponseData, setStatus } from "./authSlice";
import type { ReduxThunkAction } from "@/lib/redux";
import { signup } from "./signup";
import { admin } from "./admin";
import { user } from "./user";

export const loginAsync: any = createAppAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }) => {
    try {
      const response = await login(credentials.username, credentials.password);
      return response.data;
    } catch (error: any) {
      throw error!.response.data;
    }
  },
);

export const signupAsync: any = createAppAsyncThunk(
  "auth/signup",
  async (credentials: {
    username: string;
    password: string;
    isAdmin: boolean;
  }) => {
    try {
      const response = await signup(
        credentials.username,
        credentials.password,
        credentials.isAdmin,
      );

      return response.data;
    } catch (error: any) {
      throw error!.response.data;
    }
  },
);

export const adminAsync: any =
  (token: string): ReduxThunkAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setStatus("loading"));
      const response = await admin(token);
      dispatch(setStatus("resolved"));
      dispatch(setResponseData(response.data));
    } catch (error: any) {
      dispatch(setStatus("rejected"));
      dispatch(logOut());
    }
  };

export const userAsync: any =
  (token: string): ReduxThunkAction =>
  async (dispatch, getState) => {
    try {
      dispatch(setStatus("loading"));
      const response = await user(token);
      dispatch(setStatus("resolved"));
      dispatch(setResponseData(response.data));
    } catch (error: any) {
      dispatch(setStatus("rejected"));
      dispatch(logOut());
    }
  };
