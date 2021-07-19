import axios from 'axios'
import { buildUrl } from 'helpers/url'
import { ArrayType } from 'enums/ArrayType'
import { ModuleType } from 'enums/ModuleType'

export interface GetPVWattsOptions {
  system_capacity: number
  module_type: ModuleType
  array_type: ArrayType
  tilt: number
  azimuth: number
  lat: number
  lon: number
}

export interface GetPVWattsResponse {
  inputs: {
    system_capacity: number
    lat: number
    lon: number
    azimuth: number
    tilt: number
    array_type: ArrayType
    module_type: ModuleType
    losses: number
  }
  errors: any[]
  warnings: any[]
  version: string
  ssc_info: {
    version: number
    build: string
  }
  station_info: {
    lat: number
    lon: number
    elev: number
    tz: number
    location: string
    city: string
    state: string
    solar_resource_file: string
    distance: number
  }
  outputs: {
    ac_monthly: number[]
    poa_monthly: number[]
    solrad_monthly: number[]
    dc_monthly: number[]
    ac_annual: number
    solrad_annual: number
    capacity_factor: number
  }
}

export async function getPVWatts(options: GetPVWattsOptions) {
  const url = buildUrl({
    baseUrl: `${window.location.protocol}//${window.location.host}`,
    path: '/api/production',
    query: {
      api_key: process.env.NEXT_PUBLIC_NREL_API_KEY,
      format: 'json',
      losses: 2, // assuming 2%
      system_capacity: options.system_capacity,
      module_type: options.module_type,
      array_type: options.array_type,
      tilt: options.tilt,
      azimuth: options.azimuth,
      lat: options.lat,
      lon: options.lon,
    },
  })
  return axios.get<GetPVWattsResponse>(url)
}
