import { Tile } from 'components/grid/Tile'
import { TileDisplayMode } from 'constants/types'
import * as enzyme from 'enzyme'
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { testTile } from 'testObjects'
import { RGBColorToString } from 'utils/colour'

const colourTile = {
  ...testTile,
  displayMode: 'colour' as TileDisplayMode,
  favicon: false,
}

const colourFaviconTile = {
  ...testTile,
  displayMode: 'colour' as TileDisplayMode,
  favicon: true,
}

const imageTile = {
  ...testTile,
  displayMode: 'image' as TileDisplayMode,
  favicon: false,
}

const imageFaviconTile = {
  ...testTile,
  displayMode: 'image' as TileDisplayMode,
  favicon: true,
}

const gradientTile = {
  ...testTile,
  displayMode: 'gradient' as TileDisplayMode,
  favicon: false,
}

const gradientFaviconTile = {
  ...testTile,
  displayMode: 'gradient' as TileDisplayMode,
  favicon: true,
}

describe('Tile component', () => {
  it('should render tile with solid background colour', () => {
    const tile = enzyme.shallow(<Tile tile={colourTile} />)
    expect(tile.find('.tile').text()).toEqual(colourTile.name)
    expect(tile.find('.tile').get(0).props.style).toHaveProperty(
      'backgroundColor',
      RGBColorToString(colourTile.backgroundColour)
    )
    expect(tile.find('.tile').get(0).props.style).toHaveProperty(
      'color',
      RGBColorToString(colourTile.fontColour)
    )
    expect(tile.find('.tile').get(0).props.style).toHaveProperty(
      'fontSize',
      colourTile.fontSize
    )
    expect(tile.find('.tile-image')).toHaveLength(0)
  })

  it('should only render the favicon when required', () => {
    // favicon is only displayed when the favicon prop is true
    let tile = enzyme.shallow(<Tile tile={colourTile} />)
    expect(tile.find('.favicon')).toHaveLength(0)

    tile = enzyme.shallow(<Tile tile={colourFaviconTile} />)
    expect(tile.find('.favicon')).toHaveLength(1)

    tile = enzyme.shallow(<Tile tile={imageTile} />)
    expect(tile.find('.favicon')).toHaveLength(0)

    tile = enzyme.shallow(<Tile tile={imageFaviconTile} />)
    expect(tile.find('.favicon')).toHaveLength(1)

    tile = enzyme.shallow(<Tile tile={gradientTile} />)
    expect(tile.find('.favicon')).toHaveLength(0)

    tile = enzyme.shallow(<Tile tile={gradientFaviconTile} />)
    expect(tile.find('.favicon')).toHaveLength(1)
  })

  it('should render a background image when set', () => {
    const tile = enzyme.shallow(<Tile tile={imageTile} />)
    expect(tile.find('.tile').text()).toEqual(imageTile.name)
    expect(tile.find('.tile-image')).toHaveLength(1)
  })

  it('should not be draggable', () => {
    const tile = enzyme.shallow(<Tile tile={colourTile} />)

    expect(tile.find(Draggable)).toHaveLength(0)
  })
})
