import { defaultBackground } from 'models/newtab'
import { IGridState } from 'reducers/grid'
import {
  getBackground,
  getColumnOrder,
  getColumns,
  getTiles,
} from 'selectors/grid'
import { testTile } from 'testObjects'

const testTiles = [
  'test.tile.id.1',
  'test.tile.id.2',
  'test.tile.id.3',
  'test.tile.id.4',
].map(id => ({
  ...testTile,
  id,
}))

const testState: IGridState = {
  tiles: {
    [testTiles[0].id]: testTiles[0],
    [testTiles[1].id]: testTiles[1],
    [testTiles[2].id]: testTiles[2],
    [testTiles[3].id]: testTiles[3],
  },
  columns: {
    'column-0': {
      id: 'column-0',
      tileIds: [testTiles[0].id],
    },
    'column-1': {
      id: 'column-1',
      tileIds: [testTiles[3].id],
    },
    'column-2': {
      id: 'column-2',
      tileIds: [testTiles[1].id, testTiles[2].id],
    },
  },
  columnOrder: ['column-0', 'column-1', 'column-2'],
  background: defaultBackground,
}

describe('Grid selectors', () => {
  it('getTiles should return tiles', () => {
    const selection = getTiles.resultFunc(testState)
    expect(selection).toEqual(testState.tiles)
  })

  it('getColumns should return columns', () => {
    const selection = getColumns.resultFunc(testState)
    expect(selection).toEqual(testState.columns)
  })

  it('getColumnOrder should return columnOrder', () => {
    const selection = getColumnOrder.resultFunc(testState)
    expect(selection).toEqual(testState.columnOrder)
  })

  it('getBackground should return the background', () => {
    const selection = getBackground.resultFunc(testState)
    expect(selection).toEqual(testState.background)
  })
})
