import { useRef, useState, useEffect, MutableRefObject } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY
const style = 'mapbox://styles/mapbox/streets-v11'

export interface UseMapboxOptions {
  containerRef: MutableRefObject<HTMLDivElement>
  longitude?: number
  latitude?: number
  zoom?: number
  mapInstance?: any
}

export function useMapbox(options: UseMapboxOptions) {
  const { containerRef, mapInstance } = options
  const map = useRef<Map>(null)
  const [longitude, setLongitude] = useState(options.longitude ?? -70.9)
  const [latitude, setLatitude] = useState(options.latitude ?? 42.35)
  const [zoom, setZoom] = useState(options.zoom ?? 9)

  // use a preconfigured map instance
  if (mapInstance) {
    map.current = mapInstance
  }

  // exposing for manually updating state
  const refreshLocation = () => {
    setLongitude(map.current.getCenter().lng)
    setLatitude(map.current.getCenter().lat)
    setZoom(map.current.getZoom())
  }

  useEffect(() => {
    // Init: Mapbox Map
    if (!map.current) {
      map.current = new Map({
        container: containerRef.current,
        center: [longitude, latitude],
        style,
        zoom,
        attributionControl: false,
        logoPosition: 'bottom-right',
      })
    }
    // Attach event listener
    map.current.on('move', refreshLocation)
  }, []) //eslint-disable-line

  return { map, longitude, latitude, zoom, refreshLocation }
}
