import { ArrayType } from 'enums/ArrayType'
import { ModuleType } from 'enums/ModuleType'
import { buildUrl } from 'helpers/url'
import fetch from 'isomorphic-unfetch'

/**
 * Base Fetch
 */

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: any
}

export async function fetcher<T>(
  url: string | URL,
  options: FetchOptions = {},
): Promise<T> {
  try {
    const { method, headers, body } = options
    const res = await fetch(url.toString(), {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.NEXT_PUBLIC_NREL_API_KEY,
      },
      method,
      body: JSON.stringify(body),
    })

    return (await res.json()) as T
  } catch (err) {
    console.log(err)
  }
}

interface GetPVWattsOptions {
  system_capacity: number
  module_type: ModuleType
  array_type: ArrayType
  tilt: number
  azimuth: number
  lat: number
  lon: number
}

export async function getPVWatts({
  system_capacity,
  module_type,
  array_type,
  tilt,
  azimuth,
  lat,
  lon,
}: GetPVWattsOptions) {
  const url = buildUrl({
    baseUrl: 'https://developer.nrel.gov/api',
    path: '/pvwatts/v6',
    query: {
      format: 'json',
      losses: 2, // assuming 2%
      system_capacity,
      module_type,
      array_type,
      tilt,
      azimuth,
      lat,
      lon,
    },
  })
  return await fetcher(url)
}
