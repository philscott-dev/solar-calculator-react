import { calculateNominalPower, buildUrl } from 'helpers'

describe('calculateNominalPower', () => {
  it('should return kW given an area', () => {
    const area = 500
    const power = calculateNominalPower(area)
    const expectedKw = 2.403545710632325
    expect(power).toBe(expectedKw)
  })
})

describe('buildUrl', () => {
  it('should return a path string from a query object', () => {
    const baseUrl = 'http://homepage.com'
    const path = '/api/location'
    const query = {
      something: 'value',
      a: 1,
      b: 2,
    }
    const url = buildUrl({ baseUrl, path, query })
    const keys = Object.keys(query)
    const querystring = keys
      .reduce((acc, key) => [...acc, `${key}=${query[key]}`], [])
      .join('&')
    expect(url).toEqual(baseUrl + path + '?' + querystring)
  })
})
