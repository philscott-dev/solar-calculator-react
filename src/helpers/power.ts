/**
 * Average Residential Panels
 * Dimensions: 65 x 39 inches
 * Area: 62.4078 meters squared
 * Watts: 300w
 */

const PANEL_AREA = 62.4078 // meteres squared
const PANEL_WATTAGE = 300 // watts

/**
 * @param totalArea (m2)
 * @returns (kW) for a given solar installation
 */
export const calculateNominalPower = (totalArea: number) => {
  return ((totalArea / PANEL_AREA) * PANEL_WATTAGE) / 1000
}
