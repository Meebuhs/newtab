import { IGridState } from 'reducers/grid'
import { getColumnOrder, getColumns, getTiles } from 'selectors/grid'

const testTiles = [
  'test.tile.id.1',
  'test.tile.id.2',
  'test.tile.id.3',
  'test.tile.id.4',
].map(id => ({
  id,
  name: 'test.tile.name',
  url: 'test.tile.url',
  displayMode: 'colour' as 'colour', // Suppress compiler warning
  backgroundColour: { r: 255, g: 255, b: 255, a: 1 },
  fontColour: { r: 0, g: 0, b: 0, a: 1 },
  favicon: false,
  image: 'test.image.data',
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
})
