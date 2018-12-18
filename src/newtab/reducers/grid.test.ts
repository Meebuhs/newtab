import * as types from 'constants/types'
import { initialState, reducer } from 'reducers/grid'

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
  backgroundColour: '#fff',
  fontColour: '#000',
  favicon: false,
  image: 'test.image.key',
}))

describe('Grid reducer', () => {
  it('should handle ADD_TILE on empty grid', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_TILE,
        payload: {
          tile: testTiles[0],
        },
      })
    ).toEqual({
      tiles: {
        [testTiles[0].id]: testTiles[0],
      },
      columns: {
        'column-0': {
          id: 'column-0',
          tileIds: [testTiles[0].id],
        },
        'column-1': {
          id: 'column-1',
          tileIds: [],
        },
        'column-2': {
          id: 'column-2',
          tileIds: [],
        },
      },
      columnOrder: ['column-0', 'column-1', 'column-2'],
    })
  })

  it('should add a tile to the shortest column', () => {
    expect(
      reducer(
        {
          tiles: {
            [testTiles[0].id]: testTiles[0],
            [testTiles[1].id]: testTiles[1],
            [testTiles[2].id]: testTiles[2],
          },
          columns: {
            'column-0': {
              id: 'column-0',
              tileIds: [testTiles[0].id],
            },
            'column-1': {
              id: 'column-1',
              tileIds: [],
            },
            'column-2': {
              id: 'column-2',
              tileIds: [testTiles[1].id, testTiles[2].id],
            },
          },
          columnOrder: ['column-0', 'column-1', 'column-2'],
        },
        {
          type: types.ADD_TILE,
          payload: {
            tile: testTiles[3],
          },
        }
      )
    ).toEqual({
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
    })
  })

  it('should handle EDIT_TILE correctly', () => {
    const testTile = {
      id: 'test.tile.id',
      name: 'test.tile.name',
      url: 'test.tile.url',
      displayMode: 'colour' as 'colour', // Suppress compiler warning
      backgroundColour: '#fff',
      fontColour: '#000',
      favicon: false,
      image: 'test.image.key',
    }

    const editedTile = {
      id: 'test.tile.id',
      name: 'test.tile.name',
      url: 'test.tile.url',
      displayMode: 'colour' as 'colour', // Suppress compiler warning
      backgroundColour: '#000',
      fontColour: '#fff',
      favicon: false,
      image: 'test.image.key',
    }

    const newState = reducer(initialState, {
      type: types.ADD_TILE,
      payload: {
        tile: testTile,
      },
    })

    expect(
      reducer(newState, {
        type: types.EDIT_TILE,
        payload: {
          tile: editedTile,
        },
      })
    ).toEqual({
      tiles: {
        [editedTile.id]: editedTile,
      },
      columns: {
        'column-0': {
          id: 'column-0',
          tileIds: [editedTile.id],
        },
        'column-1': {
          id: 'column-1',
          tileIds: [],
        },
        'column-2': {
          id: 'column-2',
          tileIds: [],
        },
      },
      columnOrder: ['column-0', 'column-1', 'column-2'],
    })
  })

  it('should handle REMOVE_TILE correctly when only one tile exists', () => {
    let newState = Object.assign({}, initialState)
    newState = reducer(newState, {
      type: types.ADD_TILE,
      payload: {
        tile: testTiles[0],
      },
    })

    expect(
      reducer(newState, {
        type: types.REMOVE_TILE,
        payload: {
          id: testTiles[0].id,
        },
      })
    ).toEqual(initialState)
  })

  it('should handle REMOVE_TILE correctly when multiple tiles exist', () => {
    let newState = Object.assign({}, initialState)
    for (let i = 1; i < 3; i++) {
      newState = reducer(newState, {
        type: types.ADD_TILE,
        payload: {
          tile: testTiles[i],
        },
      })
    }

    const expectedState = Object.assign({}, newState)
    newState = reducer(newState, {
      type: types.ADD_TILE,
      payload: {
        tile: testTiles[3],
      },
    })

    expect(
      reducer(newState, {
        type: types.REMOVE_TILE,
        payload: {
          id: testTiles[3].id,
        },
      })
    ).toEqual(expectedState)
  })

  it('should not crash if invalid id passed to REMOVE_TILE', () => {
    expect(
      reducer(initialState, {
        type: types.REMOVE_TILE,
        payload: {
          id: 'fake.id',
        },
      })
    ).toEqual(initialState)
  })

  it('should handle REORDER_TILE correctly', () => {
    const column = {
      id: 'column-0',
      tileIds: [testTiles[0].id, testTiles[1].id],
    }

    const twoTileSingleColumnState = {
      tiles: {
        [testTiles[0].id]: testTiles[0],
        [testTiles[1].id]: testTiles[1],
      },
      columns: {
        'column-0': column,
      },
      columnOrder: ['column-0'],
    }

    const reorderedState = {
      ...twoTileSingleColumnState,
      columns: {
        'column-0': {
          ...twoTileSingleColumnState.columns['column-0'],
          tileIds: [testTiles[1].id, testTiles[0].id],
        },
      },
    }

    expect(
      reducer(twoTileSingleColumnState, {
        type: types.REORDER_TILE,
        payload: {
          column,
          startIndex: 0,
          endIndex: 1,
        },
      })
    ).toEqual(reorderedState)
  })

  it('should handle MOVE_TILE correctly', () => {
    const twoTileTwoColumnState = {
      tiles: {
        [testTiles[0].id]: testTiles[0],
        [testTiles[1].id]: testTiles[1],
      },
      columns: {
        'column-0': { id: 'column-0', tileIds: [testTiles[0].id] },
        'column-1': { id: 'column-1', tileIds: [testTiles[1].id] },
      },
      columnOrder: ['column-0', 'column-1'],
    }

    const reorderedState = {
      ...twoTileTwoColumnState,
      columns: {
        'column-0': {
          ...twoTileTwoColumnState.columns['column-0'],
          tileIds: [],
        },
        'column-1': {
          ...twoTileTwoColumnState.columns['column-1'],
          tileIds: [testTiles[1].id, testTiles[0].id],
        },
      },
    }

    const droppableSource = {
      droppableId: 'column-0',
      index: 0,
    }

    const droppableDestination = {
      droppableId: 'column-1',
      index: 1,
    }

    expect(
      reducer(twoTileTwoColumnState, {
        type: types.MOVE_TILE,
        payload: {
          droppableSource,
          droppableDestination,
        },
      })
    ).toEqual(reorderedState)
  })

  it('should handle ADD_COLUMN correctly', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_COLUMN,
        payload: {
          column: {
            id: 'new.column',
            tileIds: [],
          },
        },
      })
    ).toEqual({
      tiles: {},
      columns: {
        'column-0': {
          id: 'column-0',
          tileIds: [],
        },
        'column-1': {
          id: 'column-1',
          tileIds: [],
        },
        'column-2': {
          id: 'column-2',
          tileIds: [],
        },
        'new.column': {
          id: 'new.column',
          tileIds: [],
        },
      },
      columnOrder: ['column-0', 'column-1', 'column-2', 'new.column'],
    })
  })

  it('should handle REMOVE_COLUMN correctly', () => {
    let newState = Object.assign({}, initialState)
    newState = reducer(newState, {
      type: types.ADD_COLUMN,
      payload: {
        column: {
          id: 'new.column',
          tileIds: [],
        },
      },
    })

    expect(
      reducer(newState, {
        type: types.REMOVE_COLUMN,
        payload: {
          id: 'new.column',
        },
      })
    ).toEqual(initialState)
  })

  it('should not crash if invalid id passed to REMOVE_COLUMN', () => {
    expect(
      reducer(initialState, {
        type: types.REMOVE_COLUMN,
        payload: {
          id: 'fake.column',
        },
      })
    ).toEqual(initialState)
  })

  it('should handle REORDER_COLUMN correctly', () => {
    const reorderedState = {
      ...initialState,
      columnOrder: ['column-2', 'column-0', 'column-1'],
    }

    expect(
      reducer(initialState, {
        type: types.REORDER_COLUMN,
        payload: {
          columnOrder: initialState.columnOrder,
          startIndex: 2,
          endIndex: 0,
        },
      })
    ).toEqual(reorderedState)
  })
})
