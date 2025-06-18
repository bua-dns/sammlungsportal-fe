export default defineEventHandler(async (event) => {
    const { name } = getQuery(event)
  
    if (!name) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing "name" query parameter'
      })
    }
  
    const username = 'michaelmueller' // 🔁 Replace with your GeoNames username
    const maxRows = 10
    const searchParamName = encodeURIComponent(name)
    const geonamesEndpoint = `https://secure.geonames.org/searchJSON`
    const url = `${geonamesEndpoint}?maxRows=${maxRows}&username=${username}&name_startsWith=${searchParamName}`
  
    let response
    try {
      response = await fetch(url)
    } catch (err) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch from GeoNames API',
        data: err
      })
    }
  
    let data
    try {
      data = await response.json()
    } catch (err) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid JSON response from GeoNames',
        data: err
      })
    }
  
    // Handle GeoNames-specific API error
    if (data.status && data.status.message) {
      throw createError({
        statusCode: 502,
        statusMessage: `GeoNames API error: ${data.status.message}`
      })
    }
  
    return {
      results: data.geonames || []
    }
  })
  