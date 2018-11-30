import { ADD_COLUMN, ADD_TILE } from '../constants/types'
import { IColumn, ITile } from '../models/newtab'

// Define the Action interfaces representing the return types of the action creators
export interface IAddColumnAction {
  type: 'ADD_COLUMN'
  payload: { column: IColumn }
}

export interface IAddTileAction {
  type: 'ADD_TILE'
  payload: { tile: ITile }
}

// Define the action creators

/**
 * Add a column to the grid
 * @param id The id of the column
 */
export function addColumn(id: string): IAddColumnAction {
  return {
    type: ADD_COLUMN,
    payload: {
      column: {
        id,
        tileIds: [],
      },
    },
  }
}

/**
 * Add a tile to the grid
 * @param url The url the tile should point to
 * @param id The id of the tile
 */
export function addTile(id: string, url: string): IAddTileAction {
  return {
    type: ADD_TILE,
    payload: {
      tile: {
        id,
        url,
      },
    },
  }
}

// Define action type for use in reducer
export type Action = IAddColumnAction | IAddTileAction
