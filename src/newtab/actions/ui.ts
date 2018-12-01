import { TOGGLE_SIDEBAR } from '../constants/types'

// Define the Action interfaces representing the return types of the action creators
export interface IToggleSidebarAction {
  type: 'TOGGLE_SIDEBAR'
  payload: {}
}

// Define the action creators

/**
 * Add a column to the grid
 * @param id The id of the column
 */
export function toggleSidebar(): IToggleSidebarAction {
  return {
    type: TOGGLE_SIDEBAR,
    payload: {},
  }
}

// Define action type for use in reducer
export type Action = IToggleSidebarAction
