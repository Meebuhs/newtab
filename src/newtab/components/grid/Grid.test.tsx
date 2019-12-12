import { Column } from 'components/grid/Column'
import { Grid } from 'components/grid/Grid'
import { Instructions } from 'components/grid/Instructions'
import * as types from 'constants/types'
import * as enzyme from 'enzyme'
import * as React from 'react'
import { initialState, reducer } from 'reducers/grid'

const testTile = {
  id: 'test.tile.id.1',
  name: 'test.tile.name',
  url: 'test.tile.url',
  displayMode: 'colour' as 'colour', // Suppress compiler warning
  backgroundColour: { r: 255, g: 255, b: 255, a: 1 },
  fontColour: { r: 0, g: 0, b: 0, a: 1 },
  favicon: false,
  image: 'test.image.data',
}

describe('Grid component', () => {
  it('should render only the instructions component upon initialisation', () => {
    const { tiles, columns, columnOrder } = initialState
    const grid = enzyme.shallow(
      <Grid tiles={tiles} columns={columns} columnOrder={columnOrder} />
    )
    expect(grid.find(Instructions)).toHaveLength(1)
    expect(grid.find(Column)).toHaveLength(0)
  })

  it('should render only 3 columns after first tile is added', () => {
    const addedTileState = reducer(initialState, {
      type: types.ADD_TILE,
      payload: {
        tile: testTile,
      },
    })
    const { tiles, columns, columnOrder } = addedTileState
    const grid = enzyme.shallow(
      <Grid tiles={tiles} columns={columns} columnOrder={columnOrder} />
    )
    expect(grid.find(Column)).toHaveLength(3)
    expect(grid.find(Instructions)).toHaveLength(0)
  })

  it('should render an added column, but only after a tile is added', () => {
    let addedColumnState = reducer(initialState, {
      type: types.ADD_COLUMN,
      payload: {
        column: {
          id: 'new.column',
          tileIds: [],
        },
      },
    })

    const { tiles, columns, columnOrder } = addedColumnState
    let grid = enzyme.shallow(
      <Grid tiles={tiles} columns={columns} columnOrder={columnOrder} />
    )
    expect(grid.find(Column)).toHaveLength(0)

    addedColumnState = reducer(addedColumnState, {
      type: types.ADD_TILE,
      payload: {
        tile: testTile,
      },
    })

    const {
      tiles: newTiles,
      columns: newColumns,
      columnOrder: newColumnOrder,
    } = addedColumnState

    grid = enzyme.shallow(
      <Grid
        tiles={newTiles}
        columns={newColumns}
        columnOrder={newColumnOrder}
      />
    )
    expect(grid.find(Column)).toHaveLength(4)
  })
})
