import { combineReducers } from 'redux'
import * as fromGrid from './grid'

// Define the root state of the app containing all substates
export interface IState {
  grid: fromGrid.IGridState
}

// Define the root initialState of the app
export const initialState: IState = {
  grid: fromGrid.initialState,
}

// Define the root reducer by combining the reducers for each substate
export const reducer = combineReducers({
  grid: fromGrid.reducer,
})
