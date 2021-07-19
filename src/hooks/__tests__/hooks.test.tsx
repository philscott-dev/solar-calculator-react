import 'jest/mocks/windowMock'
import { renderHook, act } from '@testing-library/react-hooks'
import { useMapbox, UseMapboxOptions } from 'hooks'
import { getMapMock } from '../../jest/mocks/getMapMock'

describe('useMapbox', () => {
  let mapInstance
  let mapOptions: UseMapboxOptions
  beforeEach(() => {
    mapInstance = getMapMock()
    mapOptions = {
      containerRef: { current: document.createElement('div') },
      latitude: -60,
      longitude: 50,
      zoom: 5,
      mapInstance,
    }
  })

  it('should create a map instance', () => {
    const { result } = renderHook(() => useMapbox(mapOptions))
    expect(result.current.map.current).toEqual(mapInstance)
  })

  it('should update `latitude` `longitude` on move', () => {
    const { result } = renderHook((props) => useMapbox(props), {
      initialProps: mapOptions,
    })
    const coords = { lat: 1, lng: 1 }
    mapInstance.getCenter.mockReturnValue(coords)
    act(() => result.current.refreshLocation())
    expect(result.current.latitude).toBe(coords.lat)
    expect(result.current.longitude).toBe(coords.lng)
  })

  it('should update `zoom` on move', async () => {
    const { result } = renderHook(() => useMapbox(mapOptions))
    const zoom = 2
    mapInstance.getZoom.mockReturnValue(zoom)
    act(() => result.current.refreshLocation())
    expect(result.current.zoom).toBe(zoom)
  })
})
