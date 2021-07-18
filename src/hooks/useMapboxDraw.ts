import { useEffect, useState, MutableRefObject } from 'react'
import { Map } from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import * as turf from '@turf/turf'

export function useMapboxDraw(map: MutableRefObject<Map>) {
  const [area, setArea] = useState(0)

  // handle updates to polygon
  const updateArea = (draw: MapboxDraw) => {
    const data = draw.getAll()
    if (data.features.length > 0) {
      //sq meteres
      const area = turf.area(data)
      const roundedArea = Math.round(area * 100) / 100
      setArea(roundedArea)
    }
  }

  useEffect(() => {
    if (!map) return
    // init polygon draw capabilities
    const draw = new MapboxDraw({
      controls: {
        polygon: true,
        trash: true,
        line_string: false,
        combine_features: false,
        uncombine_features: false,
        point: false,
      },
    })

    // Event Listeners
    map.current.on('draw.create', () => updateArea(draw))
    map.current.on('draw.delete', () => updateArea(draw))
    map.current.on('draw.update', () => updateArea(draw))

    // add control
    map.current.addControl(draw, 'top-right')
  }, [map])

  return { area, updateArea }
}
