import { readJson } from "https://deno.land/std/fs/mod.ts";

const getEntitiesToDelete = async (
  entities: string,
  property: string,
  regexp: string
) => {
  const entitiesList: any = await readJson(`./data/${entities}.json`);

  const pattern = new RegExp(regexp);

  return entitiesList
    .filter((entity: any) => pattern.test(entity[property]))
    .map((entity: any) => ({
      id: entity.id || entity._id,
      [property]: entity[property],
    }));
};

export const deleteEntities = async (
  entities: string,
  property: string,
  regexp: string
) => {
  const entitiesToDelete = await getEntitiesToDelete(
    entities,
    property,
    regexp
  );

  console.log(entitiesToDelete);
  console.log(entitiesToDelete.length);

  return "WIP";
};
