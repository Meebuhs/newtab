import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import * as types from '../constants/types'
import * as actions from './ui'

const mockStore = configureStore()
let store: MockStoreEnhanced<any, any>

describe('store', () => {
  beforeEach(() => {
    const initialState = {}
    store = mockStore(initialState)
  })

  afterEach(() => {
    store.clearActions()
  })

  it('should dispatch toggleSidebar correctly', () => {
    store.dispatch({ type: types.TOGGLE_SIDEBAR })

    const storeActions = store.getActions()
    const expectedPayload = { type: types.TOGGLE_SIDEBAR }
    expect(storeActions).toEqual([expectedPayload])
  })
})

describe('actions', () => {
  it('should create an action to toggle the visibility of the sidebar', () => {
    const expectedAction = {
      type: types.TOGGLE_SIDEBAR,
      payload: {},
    }
    expect(actions.toggleSidebar()).toEqual(expectedAction)
  })
})
