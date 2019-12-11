import { Tile } from 'components/grid/Tile'
import * as enzyme from 'enzyme'
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { RGBColorToString } from 'utils/colour'

const testTile = {
  id: 'tile.id',
  url: 'tile.url',
  name: 'test.tile',
  backgroundColour: { r: 255, g: 255, b: 255, a: 1 },
  fontColour: { r: 0, g: 0, b: 0, a: 1 },
  image: 'test.image.data',
}

const colourTile = {
  ...testTile,
  displayMode: 'colour' as 'colour', // Suppress compiler warning
  favicon: false,
}

const colourFaviconTile = {
  ...testTile,
  displayMode: 'colour' as 'colour', // Suppress compiler warning
  favicon: true,
}

const imageTile = {
  ...testTile,
  displayMode: 'image' as 'image', // Suppress compiler warning
  favicon: false,
}

const imageFaviconTile = {
  ...testTile,
  displayMode: 'image' as 'image', // Suppress compiler warning
  favicon: true,
}

describe('Tile component', () => {
  it('should render tile with solid background colour', () => {
    const tile = enzyme.shallow(<Tile tile={colourTile} />)
    expect(tile.find('.tile').text()).toEqual('test.tile')
    expect(tile.find('.tile').get(0).props.style).toHaveProperty(
      'backgroundColor',
      RGBColorToString(colourTile.backgroundColour)
    )
    expect(tile.find('.tile').get(0).props.style).toHaveProperty(
      'color',
      RGBColorToString(colourTile.fontColour)
    )
    expect(tile.find('.tile-image')).toHaveLength(0)
  })

  it('should only render the favicon when required', () => {
    // favicon is only displayed on a colour tile when the favicon prop is true
    let tile = enzyme.shallow(<Tile tile={colourTile} />)
    expect(tile.find('.favicon')).toHaveLength(0)

    tile = enzyme.shallow(<Tile tile={colourFaviconTile} />)
    expect(tile.find('.favicon')).toHaveLength(1)

    tile = enzyme.shallow(<Tile tile={imageTile} />)
    expect(tile.find('.favicon')).toHaveLength(0)

    tile = enzyme.shallow(<Tile tile={imageFaviconTile} />)
    expect(tile.find('.favicon')).toHaveLength(0)
  })

  it('should render a background image when set', () => {
    const tile = enzyme.shallow(<Tile tile={imageTile} />)
    expect(tile.find('.tile').text()).toEqual('test.tile')
    expect(tile.find('.tile-image')).toHaveLength(1)
  })

  it('should not be draggable', () => {
    const tile = enzyme.shallow(<Tile tile={colourTile} />)

    expect(tile.find(Draggable)).toHaveLength(0)
  })
})
