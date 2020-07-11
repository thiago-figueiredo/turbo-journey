import { readFileStrSync } from "https://deno.land/std/fs/mod.ts";

export const makeGenericRequestHeaders = () => {
  const headers = {
    authorization: `JWT ${readFileStrSync("./data/token", {
      encoding: "utf8",
    })}`,
    "Content-Type": "application/json",
  };

  return headers;
};
