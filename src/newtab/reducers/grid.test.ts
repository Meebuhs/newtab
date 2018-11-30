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
  }),
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
})
