import { readJson } from "https://deno.land/std/fs/mod.ts";

import { genericDeleteEntity } from "./genericDeleteEntity.ts";

const root = Deno.env.get("BASE_URL") || "http://localhost";

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
  regexp: string,
  options: Record<string, any>
) => {
  const entitiesToDelete = await getEntitiesToDelete(
    entities,
    property,
    regexp
  );

  console.log(`Entities to delete count: ${entitiesToDelete.length}`);

  if (options.execute) {
    console.log("Deleting...");

    const paddingLength = entitiesToDelete.length.toString().length;

    let i = 0;

    while (entitiesToDelete.length > 0) {
      const { id } = entitiesToDelete.shift();

      const response = await genericDeleteEntity({ id, entities, root });

      console.log(
        String(++i).padStart(paddingLength, "0"),
        response.statusText,
        id
      );
    }
  }

  return "Done.";
};
