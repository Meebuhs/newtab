import * as fromGrid from 'reducers/grid'
import * as fromUI from 'reducers/ui'
import { combineReducers } from 'redux'

// Define the root state of the app containing all substates
export interface IState {
  grid: fromGrid.IGridState
  ui: fromUI.IUIState
}

// Define the root initialState of the app
export const initialState: IState = {
  grid: fromGrid.initialState,
  ui: fromUI.initialState,
}

// Define the root reducer by combining the reducers for each substate
export const reducer = combineReducers({
  grid: fromGrid.reducer,
  ui: fromUI.reducer,
})
