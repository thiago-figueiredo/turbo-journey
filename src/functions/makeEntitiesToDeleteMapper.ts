export const makeEntitiesToDeleteMapper = (property: string) => (
  entity: Record<string, any>
) => ({
  id: entity.id || entity._id,
  [property]: entity[property],
});
