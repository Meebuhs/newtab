import { createSelector } from 'reselect'
import { IState } from '../reducers/newtab'

/**
 * Returns the grid state from the root state
 * @param {IState} state The root state of the app
 */
const getGridState = (state: IState) => state.grid

/**
 * Returns the tiles object from the grid state
 */
export const getTiles = createSelector(
  [getGridState],
  s => s.tiles
)

/**
 * Returns the columns object from the grid state
 */
export const getColumns = createSelector(
  [getGridState],
  s => s.columns
)

/**
 * Returns the columnOrder array from the grid state
 */
export const getColumnOrder = createSelector(
  [getGridState],
  s => s.columnOrder
)
