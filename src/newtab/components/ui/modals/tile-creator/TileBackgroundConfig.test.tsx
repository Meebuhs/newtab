import * as enzyme from 'enzyme'
import { TileColourBackgroundConfig } from 'modals/tile-creator/TileColourConfig'
import { TileImageBackgroundConfig } from 'modals/tile-creator/TileImageConfig'
import * as React from 'react'
import { emptyFunction } from 'testObjects'
import { TileBackgroundConfig } from './TileBackgroundConfig'

const testProps = {
  updateStateValue: emptyFunction,
  updateColourValue: emptyFunction,
  updateFaviconValue: emptyFunction,
  backgroundColour: { r: 255, g: 255, b: 255, a: 1 },
  fontColour: { r: 0, g: 0, b: 0, a: 1 },
  favicon: false,
  image: 'test.image.data',
}

describe('TileBackgroundConfig component', () => {
  it('should render the colour editor when display mode set to colour', () => {
    const config = enzyme.shallow(
      <TileBackgroundConfig {...testProps} displayMode="colour" />
    )
    expect(config.find(TileColourBackgroundConfig)).toHaveLength(1)
    expect(config.find(TileImageBackgroundConfig)).toHaveLength(0)
  })

  it('should render the image editor when display mode set to image', () => {
    const config = enzyme.shallow(
      <TileBackgroundConfig {...testProps} displayMode="image" />
    )
    expect(config.find(TileColourBackgroundConfig)).toHaveLength(0)
    expect(config.find(TileImageBackgroundConfig)).toHaveLength(1)
  })
})
