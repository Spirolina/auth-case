import type { ReduxState } from "@/lib/redux";

export const selectUser = (state: ReduxState) => state.auth.user;
export const selectIsLoggedIn = (state: ReduxState) => state.auth.user !== null;
export const selectForm = (state: ReduxState) => state.auth.form;
export const selectIsAdmin = (state: ReduxState) =>
  state.auth.user?.role === "admin";
export const selectError = (state: ReduxState) => state.auth.error;
export const selectStatus = (state: ReduxState) => state.auth.status;
export const selectToken = (state: ReduxState) => state.auth.user?.accessToken;
export const selectResponseMessage = (state: ReduxState) =>
  state.auth.responseData?.message;
