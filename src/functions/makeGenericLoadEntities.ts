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

    try {
      const entities = await response.json();

      return entities;
    } catch (error) {
      console.error(error);

      console.log(response.statusText);
    }
  };

  return loadEntities;
};
