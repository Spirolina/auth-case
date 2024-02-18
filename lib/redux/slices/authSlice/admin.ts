import axios from "axios";

export const admin = async (token: string) => {
  const response = await axios.get(
    "https://case-backend-10e61875c491.herokuapp.com/api/admin/dashboard",
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return response;
};
