import { IState } from 'reducers/newtab'
import { createSelector } from 'reselect'

/**
 * Returns the grid state from the root state
 * @param {IState} state The root state of the app
 */
export const getGrid = (state: IState) => state.grid

/**
 * Returns the tiles object from the grid state
 */
export const getTiles = createSelector([getGrid], s => s.tiles)

/**
 * Returns the columns object from the grid state
 */
export const getColumns = createSelector([getGrid], s => s.columns)

/**
 * Returns the columnOrder array from the grid state
 */
export const getColumnOrder = createSelector([getGrid], s => s.columnOrder)

/**
 * Returns the background object from the grid state
 */
export const getBackground = createSelector([getGrid], s => s.background)
