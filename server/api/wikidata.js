export default defineEventHandler(async (event) => {
  try {
    // Extract query parameters from the request
    const query = getQuery(event);

    // Set up the default parameters and override with query params if provided
    const params = new URLSearchParams({
      action: query.action || "wbsearchentities",
      format: query.format || "json",
      language: query.language || "en",
      limit: query.limit || "100",
      type: query.type || "item",
      search: query.search || "",
    });

    // Construct the Wikidata API URL
    const url = `https://www.wikidata.org/w/api.php?${params.toString()}`;

    // Fetch data from Wikidata API
    const response = await $fetch(url);

    // Return the JSON response
    return response;
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
});
