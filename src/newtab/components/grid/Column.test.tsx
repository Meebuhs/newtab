import { Column } from 'components/grid/Column'
import { Tile } from 'components/grid/Tile'
import * as enzyme from 'enzyme'
import * as React from 'react'
import { testTile } from 'testObjects'

describe('Column component', () => {
  it('should render 2 tiles', () => {
    const testTiles = ['test.tile.id.1', 'test.tile.id.2'].map(id => ({
      ...testTile,
      id,
    }))

    const tiles = {
      [testTiles[0].id]: testTiles[0],
      [testTiles[1].id]: testTiles[1],
    }
    const column = {
      id: 'column-0',
      tileIds: [testTiles[0].id, testTiles[1].id],
    }
    const renderedColumn = enzyme.shallow(
      <Column tiles={tiles} column={column} />
    )
    expect(renderedColumn.find(Tile)).toHaveLength(2)
  })
})
