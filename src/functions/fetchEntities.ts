import { writeJson } from "https://deno.land/std/fs/mod.ts";

import { dataDir } from "../config/dataDir.ts";
import { makeGenericLoadEntities } from "./makeGenericLoadEntities.ts";

const root = Deno.env.get("BASE_URL") || "http://localhost";

export const fetchEntities = async (entities: string) => {
  const loadEntities = makeGenericLoadEntities({
    path: `/v4/${entities}`,
    root,
  });

  const object = await loadEntities();

  await writeJson(`${dataDir}/${entities}.json`, object);

  return `${dataDir}/${entities}.json saved.`;
};
