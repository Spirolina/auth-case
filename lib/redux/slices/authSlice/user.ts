import axios from "axios";

export const user = async (token: string) => {
  const response = await axios.get(
    "https://case-backend-10e61875c491.herokuapp.com/api/users/dashboard",
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return response;
};
