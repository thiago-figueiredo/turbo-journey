import { readJson } from "https://deno.land/std/fs/mod.ts";

import { dataDir } from "../config/dataDir.ts";

export const getEntitiesToDelete = async (
  entities: string,
  entitiesToDeleteMapper: Function,
  property: string,
  regexp: string,
) => {
  try {
    const entitiesList: any = await readJson(`${dataDir}/${entities}.json`);

    const pattern = new RegExp(regexp);

    return entitiesList
      .filter((entity: any) => pattern.test(entity[property]))
      .map(entitiesToDeleteMapper);
  } catch ({ message }) {
    console.error(message);

    console.log(`Did you forget to fetch ${entities}?`);

    Deno.exit();
  }
};
