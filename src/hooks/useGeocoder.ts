import { Map } from 'mapbox-gl'
import { useEffect, MutableRefObject } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

export function useGeocoder(map: MutableRefObject<Map>) {
  useEffect(() => {
    if (!map) return

    // Init: MapboxGeocoder
    const geocoder = new MapboxGeocoder({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
      mapboxgl: map.current,
      marker: false,
      placeholder: 'Search an address',
    })

    // Add Control: MapboxGeocoder
    map.current.addControl(geocoder, 'top-right')
  }, [map])
}
