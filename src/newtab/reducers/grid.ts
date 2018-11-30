import { Action } from '../actions/grid'
import { Grid } from '../components/grid/Grid'
import { ADD_TILE } from '../constants/types'
import { IColumn, ITile } from '../models/newtab'

// Define the types of the grid state structure
export interface IGridState {
  tiles: { [id: string]: ITile }
  columns: { [id: string]: IColumn }
  columnOrder: string[]
}

// Define the initial state of the grid, populated with some test data
export const initialState: IGridState = {
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
  },
  columns: {
    'column-0': {
      id: 'column-0',
      tileIds: ['test2'],
    },
    'column-1': {
      id: 'column-1',
      tileIds: [],
    },
    'column-2': {
      id: 'column-2',
      tileIds: ['test1', 'test3'],
    },
  },
  columnOrder: ['column-0', 'column-1', 'column-2'],
}

/**
 * Reducer function for the grid state
 * @param state The current state of the grid, initialState if none provided
 * @param action The action to handle. The possible actions are declared in src/actions/grid.ts
 */
export function reducer(state: IGridState = initialState, action: Action) {
  switch (action.type) {
    case ADD_TILE:
      /**
       * Add a tile to the grid. The tile will have the link and id provided in the payload and it will be added to the
       * column with the least tiles.
       */
      const tile = action.payload.tile
      const columns = Array.from(state.columnOrder)
      const shortestColumn = columns.reduce(
        (min, column) =>
          state.columns[column].tileIds.length <
          state.columns[min].tileIds.length
            ? column
            : min,
        'column-0' // Start index
      )
      const newColumn = Object.assign({}, state.columns[shortestColumn])
      newColumn.tileIds.push(tile.id)

      return {
        ...state,
        tiles: {
          ...state.tiles,
          [tile.id]: tile,
        },
        columns: {
          ...state.columns,
          [shortestColumn]: newColumn,
        },
      }
    default:
      return state
  }
}
