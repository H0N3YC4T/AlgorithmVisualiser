/**
 * Universal Input Parser
 * Converts raw string input into the appropriate format for algorithms (arrays, numbers, etc.)
 */
export const parseInput = (val, type) => {
  if (!val) return null;
  const isArrayType = type === "sorting" || type === "searching";

  if (isArrayType) {
    const arr = val
      .split(",")
      .map((s) => Number.parseInt(s.trim(), 10))
      .filter((n) => !Number.isNaN(n));
    if (arr.length > 0) return arr;

    const single = Number.parseInt(val.trim(), 10);
    return Number.isNaN(single) ? val : single;
  }
  return val;
};
