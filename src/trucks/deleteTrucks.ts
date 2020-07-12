import type { Truck } from "./trucks.types.ts";

import { makeGenericRequestHeaders } from "../functions/makeGenericRequestHeaders.ts";

export const deleteTrucks = async (root: string, trucksToDelete: Truck[]) => {
  const paddingLength = trucksToDelete.length.toString().length;

  let i = 0;

  while (trucksToDelete.length > 0) {
    const truck = trucksToDelete.shift() as Truck;

    if (!truck.emsAgency) {
      console.log(`Skipping truck ${truck.id}. No EMS agency.`);

      continue;
    }

    const {
      id: truckID,
      emsAgency: { id: emsAgencyID },
    } = truck;

    const response = await fetch(
      `${root}/v4/emsAgencies/${emsAgencyID}/trucks/${truckID}`,
      {
        headers: makeGenericRequestHeaders(),
        method: "DELETE",
      },
    );

    console.log(
      String(++i).padStart(paddingLength, "0"),
      response.statusText,
      emsAgencyID,
      truckID,
    );
  }
};
