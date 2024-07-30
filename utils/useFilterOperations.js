export function checkCriterium(params) {
  const { item, prop, criterium } = params;
  // item: item to check
  // prop: property that contains the values to check
  // criterium: array of values to check against
  let valuesArray = item[prop]
  if (!Array.isArray(item[prop])) {
    // make sure, we have an array to compare against
    valuesArray = [item[prop]];
  }
  if (!valuesArray || !criterium || !valuesArray.length) return false;
  return criterium.some(item => valuesArray.includes(item));
}

export function getPrioritizedEntities(items, weight) {
  return items.filter((entry) => entry.weight === weight);
}