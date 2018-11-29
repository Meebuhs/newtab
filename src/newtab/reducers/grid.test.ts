import * as types from '../constants/types'
import { reducer } from '../reducers/grid'
import { initialState } from './grid'

describe('Grid reducer', () => {
  it('should handle ADD_TILE', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_TILE,
        payload: {
          tile: {
            url: 'link.url',
            id: 'link.id',
          },
        },
      })
    ).toEqual({
      tiles: {
        test1: {
          id: 'test1',
          url: 'link1',
        },
        test2: {
          id: 'test2',
          url: 'link2',
        },
        test3: {
          id: 'test3',
          url: 'link3',
        },
        'link.id': {
          id: 'link.id',
          url: 'link.url',
        },
      },
      columns: {
        'column-0': {
          id: 'column-0',
          tileIds: ['test2'],
        },
        'column-1': {
          id: 'column-1',
          tileIds: ['link.id'],
        },
        'column-2': {
          id: 'column-2',
          tileIds: ['test1', 'test3'],
        },
      },
      columnOrder: ['column-0', 'column-1', 'column-2'],
    })
  }),
    it('should handle a second ADD_TILE', () => {
      expect(
        reducer(
          {
            tiles: {
              test1: {
                id: 'test1',
                url: 'link1',
              },
              test2: {
                id: 'test2',
                url: 'link2',
              },
              test3: {
                id: 'test3',
                url: 'link3',
              },
              'link.id': {
                id: 'link.id',
                url: 'link.url',
              },
            },
            columns: {
              'column-0': {
                id: 'column-0',
                tileIds: ['test2'],
              },
              'column-1': {
                id: 'column-1',
                tileIds: ['link.id'],
              },
              'column-2': {
                id: 'column-2',
                tileIds: ['test1', 'test3'],
              },
            },
            columnOrder: ['column-0', 'column-1', 'column-2'],
          },
          {
            type: types.ADD_TILE,
            payload: {
              tile: {
                url: 'link.second.url',
                id: 'link.second.id',
              },
            },
          }
        )
      ).toEqual({
        tiles: {
          test1: {
            id: 'test1',
            url: 'link1',
          },
          test2: {
            id: 'test2',
            url: 'link2',
          },
          test3: {
            id: 'test3',
            url: 'link3',
          },
          'link.id': {
            id: 'link.id',
            url: 'link.url',
          },
          'link.second.id': {
            id: 'link.second.id',
            url: 'link.second.url',
          },
        },
        columns: {
          'column-0': {
            id: 'column-0',
            tileIds: ['test2', 'link.second.id'],
          },
          'column-1': {
            id: 'column-1',
            tileIds: ['link.id'],
          },
          'column-2': {
            id: 'column-2',
            tileIds: ['test1', 'test3'],
          },
        },
        columnOrder: ['column-0', 'column-1', 'column-2'],
      })
    })
})
