import { ensureDirSync } from "https://deno.land/std/fs/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

import { cac } from "https://unpkg.com/cac/mod.js";

import { dataDir } from "./config/dataDir.ts";
import { deleteEntities } from "./functions/deleteEntities.ts";
import { fetchEntities } from "./functions/fetchEntities.ts";
import { populateEntities } from "./functions/populateEntities.ts";
import { setToken } from "./functions/setToken.ts";

ensureDirSync(dataDir);

const cli = cac("tj");

cli
  .command("token [token]", "Set/show authentication token", {})
  .action(async (token: string) => {
    const result = await setToken(token);

    console.log(result);
  });

cli
  .command("fetch <entities>", "Fetch entities and save as JSON", {})
  .option("-p, --and-populate", "Populate after fetching", {})
  .action(async (entities: string, options: Record<string, any>) => {
    const fetchResult = await fetchEntities(entities);

    if (options.andPopulate) {
      console.log(fetchResult);
      console.log("Starting populating.");

      let populateResult = await populateEntities(entities);

      console.log(populateResult);

      return;
    }

    console.log(fetchResult);
  });

cli
  .command(
    "populate <entities>",
    "Populate database with entities saved as JSON",
    {},
  )
  .action(async (entities: string) => {
    const result = await populateEntities(entities);

    console.log(result);
  });

cli
  .command(
    "delete <entities> <property> <regexp>",
    "Delete entities when property matches regexp",
    {},
  )
  .option("-s, --show", "Show matched entities", {})
  .option("-x, --execute", "Actually delete, for safety reasons :)", {})
  .action(
    async (
      entities: string,
      property: string,
      regexp: string,
      options: Record<string, any>,
    ) => {
      const result = await deleteEntities(entities, property, regexp, options);

      console.log(result);
    },
  );

cli.help(() => {});
cli.version("1.0.0");
cli.parse();
