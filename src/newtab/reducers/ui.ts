import { Action } from 'actions/ui'
import { TOGGLE_SIDEBAR } from 'constants/types'

// Define the types of the grid state structure
export interface IUIState {
  sidebarVisible: boolean
}

// Define the initial state of the grid
export const initialState: IUIState = {
  sidebarVisible: false,
}

/**
 * Reducer function for the ui state
 * @param {IUIState} state The current state of the ui, initialState if none provided
 * @param {Action} action The action to handle. The possible actions are declared in src/actions/ui.ts
 */
export function reducer(state: IUIState = initialState, action: Action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR: {
      const value = state.sidebarVisible

      return {
        ...state,
        sidebarVisible: !value,
      }
    }
    default:
      return state
  }
}
