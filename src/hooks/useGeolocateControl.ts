import { MAPBOX_CONTROL_LOCATION } from 'constants/index'
import { Map, GeolocateControl } from 'mapbox-gl'
import { MutableRefObject, useEffect } from 'react'

export function useGeolocateControl(map: MutableRefObject<Map>) {
  useEffect(() => {
    if (!map) return
    // Init: GeolocateControl
    const geolocateControl = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })

    // Add Control: GeolocateControl
    map.current.addControl(geolocateControl, MAPBOX_CONTROL_LOCATION)
  }, [map])
}
