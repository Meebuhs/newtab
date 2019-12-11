import * as enzyme from 'enzyme'
import { RGBColor } from 'react-color'
import { RGBColorToString } from 'utils/colour'

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
  })
})
