export default defineEventHandler(async (event) => {
  try {
    // Extract query parameters from the request
    const query = getQuery(event);

    // Ensure `ids` parameter is provided and properly formatted
    if (!query.ids) {
      return { error: "Missing 'ids' parameter. Provide comma-separated Q-numbers." };
    }

    // Format the Wikidata API request
    const params = new URLSearchParams({
      action: "wbgetentities",
      format: "json",
      ids: query.ids, // Expecting a comma-separated list of Q-numbers
      languages: query.languages || "en", // Optional: specify languages
      props: query.props || "labels|descriptions|claims", // Optional: define properties to fetch
    });

    // Construct the Wikidata API URL
    const url = `https://www.wikidata.org/w/api.php?${params.toString()}`;

    // Fetch data from Wikidata API
    const response = await $fetch(url);

    // Return the JSON response
    return response.entities;
  } catch (error) {
    return { error: "Failed to fetch data", details: error.message };
  }
});

