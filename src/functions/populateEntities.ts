import { readJson } from "https://deno.land/std/fs/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

import { url as databaseURL } from "../database/databaseURL.ts";

const databaseName = Deno.env.get("DB_NAME");

export const populateEntities = async (entities: string) => {
  const client = new MongoClient();

  client.connectWithUri(databaseURL);

  const db = client.database(databaseName || "");

  const entitiesCollection = db.collection(entities);

  const entitiesList: unknown = await readJson(`./data/${entities}.json`);

  const insertIds = await entitiesCollection.insertMany(
    entitiesList as Object[]
  );

  return insertIds;
};
