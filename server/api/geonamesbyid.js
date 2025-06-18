export default defineEventHandler(async (event) => {
  const { geonameId } = getQuery(event)

  if (!geonameId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing "geonameId" query parameter'
    })
  }

  // CORS headers for dev environment
  setHeader(event, 'Access-Control-Allow-Origin', '*') // or restrict to 'http://localhost:5173'
  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type')

  const username = 'michaelmueller'
  const id = encodeURIComponent(geonameId)
  const geonamesEndpoint = `https://secure.geonames.org/getJSON`
  const url = `${geonamesEndpoint}?username=${username}&geonameId=${geonameId}`

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

  if (data.status && data.status.message) {
    throw createError({
      statusCode: 502,
      statusMessage: `GeoNames API error: ${data.status.message}`
    })
  }

  return data
})
