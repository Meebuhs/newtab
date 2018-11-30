import * as types from '../constants/types'
import { reducer } from '../reducers/grid'
import { initialState } from './grid'

describe('Grid reducer', () => {
  it('should handle ADD_TILE on empty grid', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_TILE,
        payload: {
          tile: {
            id: 'new.tile',
            url: 'new.url',
          },
        },
      })
    ).toEqual({
      tiles: {
        'new.tile': {
          id: 'new.tile',
          url: 'new.url',
        },
      },
      columns: {
        'column-0': {
          id: 'column-0',
          tileIds: ['new.tile'],
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
            'existing.tile.1': {
              id: 'existing.tile.1',
              url: 'existing.url.1',
            },
            'existing.tile.2': {
              id: 'existing.tile.2',
              url: 'existing.url.2',
            },
            'existing.tile.3': {
              id: 'existing.tile.3',
              url: 'existing.url.3',
            },
          },
          columns: {
            'column-0': {
              id: 'column-0',
              tileIds: ['existing.tile.2'],
            },
            'column-1': {
              id: 'column-1',
              tileIds: [],
            },
            'column-2': {
              id: 'column-2',
              tileIds: ['existing.tile.1', 'existing.tile.3'],
            },
          },
          columnOrder: ['column-0', 'column-1', 'column-2'],
        },
        {
          type: types.ADD_TILE,
          payload: {
            tile: {
              id: 'new.tile',
              url: 'new.url',
            },
          },
        }
      )
    ).toEqual({
      tiles: {
        'existing.tile.1': {
          id: 'existing.tile.1',
          url: 'existing.url.1',
        },
        'existing.tile.2': {
          id: 'existing.tile.2',
          url: 'existing.url.2',
        },
        'existing.tile.3': {
          id: 'existing.tile.3',
          url: 'existing.url.3',
        },
        'new.tile': {
          id: 'new.tile',
          url: 'new.url',
        },
      },
      columns: {
        'column-0': {
          id: 'column-0',
          tileIds: ['existing.tile.2'],
        },
        'column-1': {
          id: 'column-1',
          tileIds: ['new.tile'],
        },
        'column-2': {
          id: 'column-2',
          tileIds: ['existing.tile.1', 'existing.tile.3'],
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
        tile: {
          id: 'new.tile',
          url: 'new.url',
        },
      },
    })

    expect(
      reducer(newState, {
        type: types.REMOVE_TILE,
        payload: {
          id: 'new.tile',
        },
      })
    ).toEqual(initialState)
  })

  it('should handle REMOVE_TILE correctly when multiple tiles exist', () => {
    let newState = Object.assign({}, initialState)
    for (let i = 1; i < 4; i++) {
      newState = reducer(newState, {
        type: types.ADD_TILE,
        payload: {
          tile: {
            id: 'new.tile.' + i,
            url: 'new.url.' + i,
          },
        },
      })
    }

    const expectedState = Object.assign({}, newState)
    newState = reducer(newState, {
      type: types.ADD_TILE,
      payload: {
        tile: {
          id: 'new.tile.4',
          url: 'new.url.4',
        },
      },
    })

    expect(
      reducer(newState, {
        type: types.REMOVE_TILE,
        payload: {
          id: 'new.tile.4',
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
})
