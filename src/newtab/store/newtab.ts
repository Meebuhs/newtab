import { createStore } from 'redux'
import { IState, reducer } from '../reducers/newtab'

const store = createStore<IState, any, any, any>(reducer)

export default store
