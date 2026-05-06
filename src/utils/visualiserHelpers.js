/**
 * Maps a raw array of values to an array of objects with stable, unique IDs.
 * Useful for Framer Motion layout animations with duplicate values.
 */
export const mapArrayToUniqueIds = (array) => {
  const counts = {};
  return array.map((val) => {
    const isObj = typeof val === "object" && val !== null;
    const v = isObj ? val.value : val;
    const id = isObj ? val.id : null;

    if (id !== null) return { id, value: v };

    counts[v] = (counts[v] || 0) + 1;
    return {
      id: `${v}-${counts[v]}`,
      value: v,
    };
  });
};

/**
 * Calculates a relative height (0-100) for a value within a range.
 */
export const calculateRelativeHeight = (value, min, max, baseHeight = 10, scale = 75) => {
  const range = max - min || 1;
  return baseHeight + ((value - min) / range) * scale;
};
