import { TOGGLE_SIDEBAR } from '../constants/types'

// Define the Action interfaces representing the return types of the action creators
export interface IToggleSidebarAction {
  type: 'TOGGLE_SIDEBAR'
  payload: {}
}

// Define the action creators

/**
 * Toggle the visibility of the sidebar.
 */
export function toggleSidebar(): IToggleSidebarAction {
  return {
    type: TOGGLE_SIDEBAR,
    payload: {},
  }
}

// Define action type for use in reducer
export type Action = IToggleSidebarAction
