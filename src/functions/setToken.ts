import { readFileStr, writeFileStr } from "https://deno.land/std/fs/mod.ts";

export const setToken = async (token?: string) => {
  if (token) {
    await writeFileStr("./data/token", token);

    return "Token saved.";
  }

  try {
    const string = await readFileStr("./data/token", { encoding: "utf8" });

    return string;
  } catch (error) {
    console.error(error);

    console.log("Did you forget to set the token?");

    Deno.exit();
  }
};
