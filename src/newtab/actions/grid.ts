import { ADD_TILE } from '../constants/types'
import { ITile } from '../models/newtab'

// Define the Action interfaces representing the return types of the action creators
export interface IAddTileAction {
  type: 'ADD_TILE'
  payload: { tile: ITile }
}

// Define the action creators

/**
 * Add a tile to the grid
 * @param url The url link the tile should point to
 * @param id The id of the tile, constructed from a hash of the url and the current time
 */
export function addTile(url: string, id: string): IAddTileAction {
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
export type Action = IAddTileAction
