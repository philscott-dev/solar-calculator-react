import axios from 'axios'

export default async function handler(req: Request, res) {
  const search = req.url.split('?')[1]
  const response = await axios.get(
    `https://developer.nrel.gov/api/pvwatts/v6.json?${search}`,
  )
  res.status(200).send(response.data)
}
