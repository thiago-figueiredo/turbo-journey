import { setToken as getToken } from "./setToken.ts";

const token = await getToken();

export const makeGenericRequestHeaders = () => {
  const headers = {
    authorization: `JWT ${token}`,
    "Content-Type": "application/json",
  };

  return headers;
};
