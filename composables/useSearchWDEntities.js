export async function searchWdEntities(term) {
  const termArray = term
    .split(" ")
    .map((entry) => {
      const normalizedEntry = normalizeStringForSearch({
        str: entry,
        caseTo: 'lower'
      });
       return {
        search_pool: {
           _contains: normalizedEntry
        }
      }
    });
  const query = {
    limit: -1,
    fields: 'id, handle, q_number, dns_p31_listing',
    filter: {
      '_and': termArray
    }
  };
  const url = `https://ikb-lbs-hub.bua-dns.de/items/wd_entities`;
  const searchResponse = await $fetch(url, {
    query
  });
  return searchResponse;
}