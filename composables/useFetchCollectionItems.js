export async function useFetchCollectionItems(label, api) {
  const fetches = {
    'HU - MAF': async () => {
      const allItems = [];
      let page = 1;
      const pageSize = 100; // adjust to your needs, depends on Strapi's max limit
      while (true) {
        const { data, error } = await useFetch(`${api}`, {
          query: {
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
          },
        });
        if (error.value) {
          console.error(`❌ Failed fetching page ${page}`, error.value);
          break;
        }
    
        if (!data.value?.data || data.value.data.length === 0) {
          break; // no more items
        }
    
        allItems.push(...data.value.data);
        page++;
      }
      return { allItems };
    }
  }
  return fetches[label] ? await fetches[label]() : { data: [] };
}
