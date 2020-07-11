import { readFileStr, writeFileStr } from "https://deno.land/std/fs/mod.ts";

export const setToken = async (token?: string) => {
  if (token) {
    await writeFileStr("./data/token", token);

    return "Token saved.";
  }

  const string = await readFileStr("./data/token", { encoding: "utf8" });

  return string;
};
