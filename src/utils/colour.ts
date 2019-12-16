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

/**
 * Returns the style string for a gradient.
 */
export const getGradientString = (
  startColour: RGBColor,
  endColour: RGBColor,
  angle: string,
  type: string
) => {
  if (type === 'linear') {
    return `linear-gradient(${angle}deg, rgba(${startColour.r}, ${startColour.g}, ${startColour.b}, ${startColour.a}) 0%, rgba(${endColour.r}, ${endColour.g}, ${endColour.b}, ${endColour.a}) 100%)`
  } else {
    return `radial-gradient(circle, rgba(${startColour.r}, ${startColour.g}, ${startColour.b}, ${startColour.a}) 0%, rgba(${endColour.r}, ${endColour.g}, ${endColour.b}, ${endColour.a}) 100%)`
  }
}
