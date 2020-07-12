export const makeTrucksToDeleteMapper = (property: string) => (
  entity: Record<string, any>
) => ({
  id: entity.id || entity._id,
  [property]: entity[property],
  emsAgency: entity.emsAgency,
});
