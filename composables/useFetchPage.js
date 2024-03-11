export async function useFetchPage(slug) {
  const { data } = await useFetch(`${projectConfig.dataBaseUrl}/pages?filter[slug][_eq]=${slug}`);

  return {
    data,

  };
}