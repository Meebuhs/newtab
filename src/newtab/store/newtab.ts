import { IState, reducer } from 'reducers/newtab'
import { createStore } from 'redux'

const store = createStore<IState, any, any, any>(reducer)

export default store
