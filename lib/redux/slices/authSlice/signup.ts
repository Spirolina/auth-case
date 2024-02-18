import axios from "axios";

export const signup = async (
  username: string,
  password: string,
  isAdmin: boolean,
) => {
  const response = await axios.post(
    "https://case-backend-10e61875c491.herokuapp.com/api/users/signup",
    {
      username,
      password,
      isAdmin,
    },
  );

  return response;
};
