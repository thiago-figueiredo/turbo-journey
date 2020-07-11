import "https://deno.land/x/dotenv/load.ts";

import { cac } from "https://unpkg.com/cac/mod.js";

import { setToken } from "./functions/setToken.ts";
import { fetchEntities } from "./functions/fetchEntities.ts";
import { populateEntities } from "./functions/populateEntities.ts";

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
        console.log("Starting populating.")

        let populateResult = await populateEntities(entities);

        console.log(populateResult);
    }

    console.log(fetchResult);
  });

cli
  .command(
    "populate <entities>",
    "Populate database with entities saved as JSON, in chunks",
    {}
  )
  .action(async (entities: string) => {
    const result = await populateEntities(entities);

    console.log(result);
  });

cli.help(() => {});
cli.version("0.0.0");
cli.parse();
