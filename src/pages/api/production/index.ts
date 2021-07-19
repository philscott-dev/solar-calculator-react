import axios from 'axios'

const NREL_URL = 'https://developer.nrel.gov/api/pvwatts/v6.json'

/**
 * Proxy call from UI to NREL
 */

export default async function handler(req: Request, res) {
  const search = req.url.split('?')[1]
  const response = await axios.get(`${NREL_URL}?${search}`)
  res.status(200).send(response.data)
}
