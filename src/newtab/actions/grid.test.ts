import configureStore from 'redux-mock-store'
import * as types from '../constants/types'
import * as actions from './grid'

const mockStore = configureStore()

describe('store', () => {
  it('should dispatch addTile correctly', () => {
    const initialState = {}
    const store = mockStore(initialState)

    store.dispatch({ type: types.ADD_TILE })

    const storeActions = store.getActions()
    const expectedPayload = { addTile: actions.addTile }
    expect(actions).toEqual(expectedPayload)
  })
})

describe('actions', () => {
  it('should create an action to add a tile', () => {
    const url = 'link.url'
    const id = 'tile.id'
    const expectedAction = {
      type: types.ADD_TILE,
      payload: {
        tile: {
          url,
          id,
        },
      },
    }
    expect(actions.addTile(url, id)).toEqual(expectedAction)
  })
})
