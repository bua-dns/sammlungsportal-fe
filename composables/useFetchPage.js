export async function useFetchPage(slug) {
  const { data } = await useFetch(
    `${projectConfig.dataBaseUrl}/pages?fields=*,translations.*&filter[slug][_eq]=${slug}`
  );
  return { data };
}