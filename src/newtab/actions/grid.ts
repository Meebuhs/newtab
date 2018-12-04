import { any } from 'prop-types'
import { DraggableLocation } from 'react-beautiful-dnd'
import {
  ADD_COLUMN,
  ADD_TILE,
  MOVE_TILE,
  REMOVE_COLUMN,
  REMOVE_TILE,
  REORDER_COLUMN,
  REORDER_TILE,
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

export interface IReorderColumnAction {
  type: 'REORDER_COLUMN'
  payload: {
    columnOrder: string[]
    startIndex: number
    endIndex: number
  }
}

export interface IAddTileAction {
  type: 'ADD_TILE'
  payload: { tile: ITile }
}

export interface IRemoveTileAction {
  type: 'REMOVE_TILE'
  payload: { id: string }
}

export interface IReorderTileAction {
  type: 'REORDER_TILE'
  payload: {
    column: IColumn
    startIndex: number
    endIndex: number
  }
}

export interface IMoveTileAction {
  type: 'MOVE_TILE'
  payload: {
    droppableSource: DraggableLocation
    droppableDestination: DraggableLocation
  }
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
 * Reorder the column order of the grid
 * @param columnOrder The current columnOrder array
 * @param startIndex The index the column started at before being dragged
 * @param endIndex The index at which the column was dropped
 */
export function reorderColumn(
  columnOrder: string[],
  startIndex: number,
  endIndex: number
): IReorderColumnAction {
  return {
    type: REORDER_COLUMN,
    payload: {
      columnOrder,
      startIndex,
      endIndex,
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

/**
 * Reorder the tile order within a column
 * @param columnOrder The column to be rearranged
 * @param startIndex The index the tile started at before being dragged
 * @param endIndex The index at which the tile was dropped
 */
export function reorderTile(
  column: IColumn,
  startIndex: number,
  endIndex: number
): IReorderTileAction {
  return {
    type: REORDER_TILE,
    payload: {
      column,
      startIndex,
      endIndex,
    },
  }
}

/**
 * Move the tile between columns
 * @param droppableSource The source result from onDragEnd
 * @param droppableDestination The destination result from onDragEnd
 */
export function moveTile(
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
): IMoveTileAction {
  return {
    type: MOVE_TILE,
    payload: {
      droppableSource,
      droppableDestination,
    },
  }
}

// Define action type for use in reducer
export type Action =
  | IAddColumnAction
  | IRemoveColumnAction
  | IReorderColumnAction
  | IAddTileAction
  | IMoveTileAction
  | IRemoveTileAction
  | IReorderTileAction
