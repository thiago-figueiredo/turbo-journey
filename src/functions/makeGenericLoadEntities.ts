import { makeGenericRequestHeaders } from "./makeGenericRequestHeaders.ts";

export const makeGenericLoadEntities = ({
  path,
  root,
}: {
  path: string;
  root: string;
}) => {
  const loadEntities = async () => {
    const response = await fetch(`${root}${path}`, {
      headers: makeGenericRequestHeaders(),
    });

    const entities = await response.json();

    return entities;
  };

  return loadEntities;
};
