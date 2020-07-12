import { readJson } from "https://deno.land/std/fs/mod.ts";

export const getEntitiesToDelete = async (
  entities: string,
  entitiesToDeleteMapper: Function,
  property: string,
  regexp: string
) => {
  const entitiesList: any = await readJson(`./data/${entities}.json`);

  const pattern = new RegExp(regexp);

  return entitiesList
    .filter((entity: any) => pattern.test(entity[property]))
    .map(entitiesToDeleteMapper);
};
