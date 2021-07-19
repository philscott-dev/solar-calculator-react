import { validateArea, validateOrientation, validateTilt } from 'validators'

/**
 * Validate Tilt
 */

describe('validateTilt', () => {
  let errors = {}
  beforeEach(() => {
    errors = {}
  })

  it('should not error given a value in range', () => {
    const value = 30
    errors = validateTilt({ value, errors })
    expect(errors).toEqual({})
  })

  it('should error given a negative value', () => {
    const value = -1
    errors = validateTilt({ value, errors })
    const expected = { tilt: 'Must be 0 or more' }
    expect(errors).toHaveProperty('tilt')
    expect(errors).toMatchObject(expected)
  })

  it('should error given a value > 90', () => {
    const value = 91
    errors = validateTilt({ value, errors })
    const expected = { tilt: 'Must be 90 or less' }
    expect(errors).toHaveProperty('tilt')
    expect(errors).toMatchObject(expected)
  })
})

/**
 * Validate Orientation
 */

describe('validateOrientation', () => {
  let errors = {}
  beforeEach(() => {
    errors = {}
  })

  it('should not error given a value in range', () => {
    const value = 30
    errors = validateOrientation({ value, errors })
    expect(errors).toEqual({})
  })

  it('should error given a negative value', () => {
    const value = -1
    errors = validateOrientation({ value, errors })
    const expected = { orientation: 'Must be 0 or more' }
    expect(errors).toHaveProperty('orientation')
    expect(errors).toMatchObject(expected)
  })

  it('should error given a value >= 360', () => {
    const value = 360
    errors = validateOrientation({ value, errors })
    const expected = { orientation: 'Must be less than 360' }
    expect(errors).toHaveProperty('orientation')
    expect(errors).toMatchObject(expected)
  })
})

/**
 * Validate Area
 */
describe('validateArea', () => {
  let errors = {}
  beforeEach(() => {
    errors = {}
  })

  it('should not error given a value', () => {
    const value = 1000
    errors = validateArea({ value, errors })
    expect(errors).toEqual({})
  })

  it('should error given a value <= 0', () => {
    const value = 0
    errors = validateArea({ value, errors })
    const expected = {
      area: 'Please use the [ Polygon Tool ] to create an installation area.',
    }
    expect(errors).toHaveProperty('area')
    expect(errors).toMatchObject(expected)
  })

  it('should error given an undefined value', () => {
    const value = undefined
    errors = validateArea({ value, errors })
    const expected = {
      area: 'Please use the [ Polygon Tool ] to create an installation area.',
    }
    expect(errors).toHaveProperty('area')
    expect(errors).toMatchObject(expected)
  })
})
