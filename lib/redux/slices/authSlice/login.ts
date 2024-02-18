import axios from "axios";

export const login = async (username: string, password: string) => {
  const response = await axios.post(
    "https://case-backend-10e61875c491.herokuapp.com/api/users/login",
    {
      username,
      password,
    },
  );
  return response;
};
