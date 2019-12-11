import { RGBColor } from 'react-color'

/**
 * Converts an RGBColor value to a css useable string in the form 'rgba(r, g, b, a)'
 * @param {RGBColor} value the value to convert
 */
export const RGBColorToString = (value: RGBColor) => {
  let alpha = value.a === undefined ? 1 : value.a
  alpha = alpha > 1 || alpha < 0 ? 1 : alpha
  return `rgba(${value.r}, ${value.g}, ${value.b}, ${alpha})`
}
