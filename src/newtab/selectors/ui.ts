import { createSelector } from 'reselect'
import { IState } from '../reducers/newtab'

/**
 * Returns the ui state from the root state
 * @param {IState} state The root state of the app
 */
const getUIState = (state: IState) => state.ui

/**
 * Returns the sidebar visibility status from the ui state
 */
export const getSidebarVisibility = createSelector(
  [getUIState],
  s => s.sidebarVisible
)
