import { setToken as getToken } from "./setToken.ts";

export const makeGenericRequestHeaders = () => {
  const headers = {
    authorization: `JWT ${getToken()}`,
    "Content-Type": "application/json",
  };

  return headers;
};
