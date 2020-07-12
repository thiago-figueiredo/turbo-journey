import { makeGenericRequestHeaders } from "./makeGenericRequestHeaders.ts";

export const genericDeleteEntity = async ({
  id,
  entities,
  root,
}: {
  id: string;
  entities: string;
  root: string;
}) => {
  return fetch(`${root}/v4/${entities}/${id}`, {
    headers: makeGenericRequestHeaders(),
    method: "DELETE",
  });
};
