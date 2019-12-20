import { RGBColor } from 'react-color'
import { testBackground } from 'testObjects'
import {
  getGradientString,
  RGBColorToHex,
  RGBColorToString,
} from 'utils/colour'

describe('RGBColor conversion', () => {
  it('should correctly convert RGBColor values to string representations', () => {
    let colour = {
      r: 100,
      g: 100,
      b: 100,
      a: 1,
    }
    let expected = 'rgba(100, 100, 100, 1)'
    expect(RGBColorToString(colour)).toEqual(expected)

    colour = {
      r: 255,
      g: 0,
      b: 50,
      a: 0.33,
    }
    expected = 'rgba(255, 0, 50, 0.33)'
    expect(RGBColorToString(colour)).toEqual(expected)

    colour = {
      b: 40,
      a: 0.01,
      g: 70,
      r: 200,
    }
    expected = 'rgba(200, 70, 40, 0.01)'
    expect(RGBColorToString(colour)).toEqual(expected)
  })

  it('should handle bad alpha values', () => {
    let colour: RGBColor = {
      r: 100,
      g: 100,
      b: 100,
    }
    let expected = 'rgba(100, 100, 100, 1)'
    expect(RGBColorToString(colour)).toEqual(expected)

    colour = {
      r: 100,
      g: 100,
      b: 100,
      a: -1,
    }
    expected = 'rgba(100, 100, 100, 1)'
    expect(RGBColorToString(colour)).toEqual(expected)

    colour = {
      r: 100,
      g: 100,
      b: 100,
      a: undefined,
    }
    expected = 'rgba(100, 100, 100, 1)'
    expect(RGBColorToString(colour)).toEqual(expected)
  }),
    it('should correctly convert RGBColor values to hex representations', () => {
      let colour: RGBColor = {
        r: 50,
        g: 168,
        b: 82,
        a: 1,
      }
      let expected = '#32a852'
      expect(RGBColorToHex(colour)).toEqual(expected)

      colour = {
        r: 235,
        g: 213,
        b: 234,
        a: undefined,
      }
      expected = '#ebd5ea'
      expect(RGBColorToHex(colour)).toEqual(expected)

      colour = {
        r: 1,
        g: 0,
        b: 1,
        a: undefined,
      }
      expected = '#010001'
      expect(RGBColorToHex(colour)).toEqual(expected)
    }),
    it('should correctly construct gradient strings', () => {
      let gradient = {
        ...testBackground.gradient,
        type: 'linear',
      }
      let expected =
        'linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(210, 210, 210, 1) 100%)'
      expect(
        getGradientString(
          gradient.startColour,
          gradient.endColour,
          gradient.angle,
          gradient.type
        )
      ).toEqual(expected)

      gradient = {
        ...gradient,
        type: 'radial',
      }
      expected =
        'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(210, 210, 210, 1) 100%)'
      expect(
        getGradientString(
          gradient.startColour,
          gradient.endColour,
          gradient.angle,
          gradient.type
        )
      ).toEqual(expected)
    })
})
