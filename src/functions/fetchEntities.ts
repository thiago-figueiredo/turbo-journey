import { writeJson } from "https://deno.land/std/fs/mod.ts";

import { makeGenericLoadEntities } from "./makeGenericLoadEntities.ts";

const root = Deno.env.get("BASE_URL") || "http://localhost";

export const fetchEntities = async (entities: string) => {
  const loadEntities = makeGenericLoadEntities({
    path: `/v4/${entities}`,
    root,
  });

  const object = await loadEntities();

  await writeJson(`./data/${entities}.json`, object);

  return `./data/${entities}.json saved.`;
};
