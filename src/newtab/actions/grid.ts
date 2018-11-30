import {
  ADD_COLUMN,
  ADD_TILE,
  REMOVE_COLUMN,
  REMOVE_TILE,
} from '../constants/types'
import { IColumn, ITile } from '../models/newtab'

// Define the Action interfaces representing the return types of the action creators
export interface IAddColumnAction {
  type: 'ADD_COLUMN'
  payload: { column: IColumn }
}

export interface IRemoveColumnAction {
  type: 'REMOVE_COLUMN'
  payload: { id: string }
}

export interface IAddTileAction {
  type: 'ADD_TILE'
  payload: { tile: ITile }
}

export interface IRemoveTileAction {
  type: 'REMOVE_TILE'
  payload: { id: string }
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
 * Remove a column from the grid
 * @param id The id of the column to remove
 */
export function removeColumn(id: string): IRemoveColumnAction {
  return {
    type: REMOVE_COLUMN,
    payload: {
      id,
    },
  }
}

/**
 * Add a tile to the grid
 * @param url The url the tile should point to
 * @param id The id of the tile to add
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

/**
 * Remove a tile from the grid
 * @param id The id of the tile to remove
 */
export function removeTile(id: string): IRemoveTileAction {
  return {
    type: REMOVE_TILE,
    payload: {
      id,
    },
  }
}

// Define action type for use in reducer
export type Action =
  | IAddColumnAction
  | IRemoveColumnAction
  | IAddTileAction
  | IRemoveTileAction
