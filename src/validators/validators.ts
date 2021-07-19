export interface ValidatorOptions {
  value: number
  errors: { [key: string]: string }
}

/**
 * Validate Tilt
 */
export const validateTilt = ({ value, errors }: ValidatorOptions) => {
  if (value < 0) {
    errors = { ...errors, tilt: 'Must be 0 or more' }
  } else if (value > 90) {
    errors = { ...errors, tilt: 'Must be 90 or less' }
  }
  return errors
}

/**
 * Validate Orientation
 */
export const validateOrientation = ({ value, errors }: ValidatorOptions) => {
  if (value < 0) {
    errors = {
      ...errors,
      orientation: 'Must be 0 or more',
    }
  } else if (value >= 360) {
    errors = { ...errors, orientation: 'Must be less than 360' }
  }
  return errors
}

/**
 * Validate Area
 */
export const validateArea = ({ value, errors }: ValidatorOptions) => {
  if (!value) {
    errors = {
      ...errors,
      area: 'Please use the [ Polygon Tool ] to create an installation area.',
    }
  } else if (value <= 0) {
    errors = {
      ...errors,
      area: 'Please use the [ Polygon Tool ] to create an installation area.',
    }
  }

  return errors
}
