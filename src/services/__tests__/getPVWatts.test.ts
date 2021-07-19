import { mockResponse } from '../../jest/mocks/pvWattsMock'
import { getPVWatts } from 'services'
import { buildUrl } from 'helpers'

const axios = require('axios')
jest.mock('axios')

describe('getPVWatts Service', () => {
  it('should get data from the pvwatts service', async () => {
    const options = {
      api_key: process.env.NEXT_PUBLIC_NREL_API_KEY,
      format: 'json',
      losses: 2,
      system_capacity: 300,
      module_type: 0,
      array_type: 0,
      tilt: 0,
      azimuth: 0,
      lat: 35,
      lon: -80,
    }

    const url = buildUrl({
      baseUrl: `${window.location.protocol}//${window.location.host}`,
      path: '/api/production',
      query: options,
    })

    axios.get.mockResolvedValue(mockResponse)
    getPVWatts(options)

    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledWith(url)
  })
})
