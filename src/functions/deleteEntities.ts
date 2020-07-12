import { deleteTrucks } from "../trucks/deleteTrucks.ts";
import { makeTrucksToDeleteMapper } from "../trucks/makeTrucksToDeleteMapper.ts";
import { genericDeleteEntity } from "./genericDeleteEntity.ts";
import { getEntitiesToDelete } from "./getEntitiesToDelete.ts";
import { makeEntitiesToDeleteMapper } from "./makeEntitiesToDeleteMapper.ts";

const root = Deno.env.get("BASE_URL") || "http://localhost";

export const deleteEntities = async (
  entities: string,
  property: string,
  regexp: string,
  options: Record<string, any>
) => {
  // But trucks are different...
  const entitiesToDelete = await getEntitiesToDelete(
    entities,
    entities !== "trucks"
      ? makeEntitiesToDeleteMapper(property)
      : makeTrucksToDeleteMapper(property),
    property,
    regexp
  );

  console.log(`Entities to delete count: ${entitiesToDelete.length}`);

  if (options.execute) {
    console.log("Deleting...");

    // But trucks are different...
    if (entities !== "trucks") {
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
    } else {
      await deleteTrucks(root, entitiesToDelete);
    }
  }

  return "Done.";
};
