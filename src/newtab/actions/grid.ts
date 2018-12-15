import { any } from 'prop-types'
import { DraggableLocation } from 'react-beautiful-dnd'
import {
  ADD_COLUMN,
  ADD_TILE,
  EDIT_TILE,
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

export interface IEditTileAction {
  type: 'EDIT_TILE'
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
 * Add a column to the grid.
 * @param {string} id The id of the column
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
 * Remove a column from the grid.
 * @param {string} id The id of the column to remove
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
 * Reorder the column order of the grid.
 * @param {string[]} columnOrder The current columnOrder array
 * @param {number} startIndex The index the column started at before being dragged
 * @param {number} endIndex The index at which the column was dropped
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
 * Add a tile to the grid.
 * @param {ITile} tile the tile to add
 */
export function addTile(tile: ITile): IAddTileAction {
  return {
    type: ADD_TILE,
    payload: {
      tile,
    },
  }
}

/**
 * Edits an existing tile.
 * @param {ITile} tile the new tile to set
 */
export function editTile(tile: ITile): IEditTileAction {
  return {
    type: EDIT_TILE,
    payload: {
      tile,
    },
  }
}

/**
 * Remove a tile from the grid.
 * @param {string} id The id of the tile to remove
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
 * Reorder the tiles within a column.
 * @param {string[]} columnOrder The column to be rearranged
 * @param {number} startIndex The index the tile started at before being dragged
 * @param {number} endIndex The index at which the tile was dropped
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
 * Move the tile between columns.
 * @param {DraggableLocation} droppableSource The source result from onDragEnd
 * @param {DraggableLocation} droppableDestination The destination result from onDragEnd
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
  | IEditTileAction
  | IMoveTileAction
  | IRemoveTileAction
  | IReorderTileAction
