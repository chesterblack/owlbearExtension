export function isPlainObject(item) {
  return (
    item !== null && typeof item === "object" && item.constructor === Object
  );
}

export function isMetadata(metadata) {
  return (
    isPlainObject(metadata) &&
    typeof metadata.health === "number"
  );
}