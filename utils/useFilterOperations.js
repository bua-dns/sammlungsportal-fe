export function checkCriterium(item, criterium) {
  const itemArray = item['dns_p31_listing']
  if (!Array.isArray(itemArray)) return false;
  // console.log(itemArray[0], criterium[0]);
  // return true;
  if (!itemArray || !criterium || !itemArray.length) return false;
  return criterium.some(item => itemArray.includes(item));
}