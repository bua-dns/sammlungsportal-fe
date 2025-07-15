export async function useFetchCollectionItems(label, api, populate = []) {
  const fetches = {
    HUMAF: async () => {
      const allItems = []
      let page = 1
      const pageSize = 100

      while (true) {
        const params = new URLSearchParams()
        params.append("pagination[page]", page)
        params.append("pagination[pageSize]", pageSize)

        // Add populate fields dynamically
        populate.forEach((field, index) => {
          params.append(`populate[${index}]`, field)
        })

        const url = `${api}?${params.toString()}`
        const { data, error } = await useFetch(url)

        if (error.value) {
          console.error(`❌ Failed fetching page ${page}`, error.value)
          break
        }

        if (!data.value?.data || data.value.data.length === 0) {
          break
        }

        allItems.push(...data.value.data)
        page++
      }

      return { allItems }
    },
  }

  return fetches[label] ? await fetches[label]() : { data: [] }
}
