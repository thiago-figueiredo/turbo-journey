import { readFileStr, writeFileStr } from "https://deno.land/std/fs/mod.ts";

import { dataDir } from "../config/dataDir.ts";

export const setToken = async (token?: string) => {
  if (token) {
    await writeFileStr(`${dataDir}/token`, token);

    return "Token saved.";
  }

  try {
    const string = await readFileStr(`${dataDir}/token`, { encoding: "utf8" });

    return string;
  } catch ({ message }) {
    console.error(message);

    console.log("Did you forget to set the token?");

    Deno.exit();
  }
};
