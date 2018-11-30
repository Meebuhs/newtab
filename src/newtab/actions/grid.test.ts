import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import * as types from '../constants/types'
import * as actions from './grid'

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

  it('should dispatch addColumn correctly', () => {
    store.dispatch({ type: types.ADD_COLUMN })

    const storeActions = store.getActions()
    const expectedPayload = { type: types.ADD_COLUMN }
    expect(storeActions).toEqual([expectedPayload])
  })

  it('should dispatch removeColumn correctly', () => {
    store.dispatch({ type: types.REMOVE_COLUMN })

    const storeActions = store.getActions()
    const expectedPayload = { type: types.REMOVE_COLUMN }
    expect(storeActions).toEqual([expectedPayload])
  })

  it('should dispatch addTile correctly', () => {
    store.dispatch({ type: types.ADD_TILE })

    const storeActions = store.getActions()
    const expectedPayload = { type: types.ADD_TILE }
    expect(storeActions).toEqual([expectedPayload])
  })

  it('should dispatch removeTile correctly', () => {
    store.dispatch({ type: types.REMOVE_TILE })

    const storeActions = store.getActions()
    const expectedPayload = { type: types.REMOVE_TILE }
    expect(storeActions).toEqual([expectedPayload])
  })
})

describe('actions', () => {
  it('should create an action to add a tile', () => {
    const id = 'tile.id'
    const url = 'tile.url'
    const expectedAction = {
      type: types.ADD_TILE,
      payload: {
        tile: {
          id,
          url,
        },
      },
    }
    expect(actions.addTile(id, url)).toEqual(expectedAction)
  })

  it('should create an action to remove a tile', () => {
    const id = 'tile.id'
    const expectedAction = {
      type: types.REMOVE_TILE,
      payload: {
        id,
      },
    }
    expect(actions.removeTile(id)).toEqual(expectedAction)
  })

  it('should create an action to add a column', () => {
    const id = 'column.id'
    const expectedAction = {
      type: types.ADD_COLUMN,
      payload: {
        column: {
          id,
          tileIds: [],
        },
      },
    }
    expect(actions.addColumn(id)).toEqual(expectedAction)
  })

  it('should create an action to remove a column', () => {
    const id = 'column.id'
    const expectedAction = {
      type: types.REMOVE_COLUMN,
      payload: {
        id,
      },
    }
    expect(actions.removeColumn(id)).toEqual(expectedAction)
  })
})
