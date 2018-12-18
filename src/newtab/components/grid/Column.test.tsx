import { Column } from 'components/grid/Column'
import { Tile } from 'components/grid/Tile'
import * as enzyme from 'enzyme'
import * as React from 'react'

describe('Column component', () => {
  it('should render 2 tiles', () => {
    const testTiles = ['test.tile.id.1', 'test.tile.id.2'].map(id => ({
      id,
      name: 'test.tile.name',
      url: 'test.tile.url',
      displayMode: 'colour' as 'colour', // Suppress compiler warning
      backgroundColour: '#fff',
      fontColour: '#000',
      favicon: false,
      image: 'test.image.key',
    }))

    const tiles = {
      [testTiles[0].id]: testTiles[0],
      [testTiles[1].id]: testTiles[1],
    }
    const column = {
      id: 'column-0',
      tileIds: [testTiles[0].id, testTiles[1].id],
    }
    const grid = enzyme.shallow(<Column tiles={tiles} column={column} />)
    expect(grid.find(Tile)).toHaveLength(2)
  })
})
