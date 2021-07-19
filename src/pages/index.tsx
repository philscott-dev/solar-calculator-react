import { NextPage } from 'next'
import { useRef } from 'react'
import { Map, PVDetails } from 'components'
import {
  useGeocoder,
  useGeolocateControl,
  useMapbox,
  useMapboxDraw,
} from 'hooks'

const IndexPage: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { map, latitude, longitude } = useMapbox({ containerRef })
  useGeocoder(map)
  useGeolocateControl(map)
  const { area } = useMapboxDraw(map)

  return (
    <>
      <Map ref={containerRef} className="map-container" />
      <PVDetails area={area} latitude={latitude} longitude={longitude} />
    </>
  )
}

export default IndexPage
