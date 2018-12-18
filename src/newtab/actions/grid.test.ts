import * as actions from 'actions/grid'
import * as types from 'constants/types'
import { DraggableLocation } from 'react-beautiful-dnd'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'

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

  it('should dispatch editTile correctly', () => {
    store.dispatch({ type: types.EDIT_TILE })

    const storeActions = store.getActions()
    const expectedPayload = { type: types.EDIT_TILE }
    expect(storeActions).toEqual([expectedPayload])
  })

  it('should dispatch removeTile correctly', () => {
    store.dispatch({ type: types.REMOVE_TILE })

    const storeActions = store.getActions()
    const expectedPayload = { type: types.REMOVE_TILE }
    expect(storeActions).toEqual([expectedPayload])
  })

  it('should dispatch reorderColumn correctly', () => {
    store.dispatch({ type: types.REORDER_COLUMN })

    const storeActions = store.getActions()
    const expectedPayload = { type: types.REORDER_COLUMN }
    expect(storeActions).toEqual([expectedPayload])
  })

  it('should dispatch reorderTile correctly', () => {
    store.dispatch({ type: types.REORDER_TILE })

    const storeActions = store.getActions()
    const expectedPayload = { type: types.REORDER_TILE }
    expect(storeActions).toEqual([expectedPayload])
  })

  it('should dispatch moveTile correctly', () => {
    store.dispatch({ type: types.MOVE_TILE })

    const storeActions = store.getActions()
    const expectedPayload = { type: types.MOVE_TILE }
    expect(storeActions).toEqual([expectedPayload])
  })
})

describe('actions', () => {
  it('should create an action to add a tile', () => {
    const tile = {
      id: 'test.tile.id',
      name: 'test.tile.name',
      url: 'test.tile.url',
      displayMode: 'colour' as 'colour', // Suppress compiler warning
      backgroundColour: '#fff',
      fontColour: '#000',
      favicon: false,
      image: 'test.image.key',
    }

    const expectedAction = {
      type: types.ADD_TILE,
      payload: {
        tile,
      },
    }
    expect(actions.addTile(tile)).toEqual(expectedAction)
  })

  it('should create an action to edit a tile', () => {
    const tile = {
      id: 'test.tile.id',
      name: 'test.tile.name',
      url: 'test.tile.url',
      displayMode: 'colour' as 'colour', // Suppress compiler warning
      backgroundColour: '#fff',
      fontColour: '#000',
      favicon: false,
      image: 'test.image.key',
    }

    const expectedAction = {
      type: types.EDIT_TILE,
      payload: {
        tile,
      },
    }
    expect(actions.editTile(tile)).toEqual(expectedAction)
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

  it('should create an action to reorder a tile within a column', () => {
    const column = { id: 'column.id.1', tileIds: ['tile.id.1', 'tile.id.2'] }
    const startIndex = 0
    const endIndex = 1

    const expectedAction = {
      type: types.REORDER_TILE,
      payload: {
        column,
        startIndex,
        endIndex,
      },
    }
    expect(actions.reorderTile(column, startIndex, endIndex)).toEqual(
      expectedAction
    )
  })

  it('should create an action to move a tile between columns', () => {
    const droppableSource: DraggableLocation = {
      droppableId: 'column.id.1',
      index: 0,
    }
    const droppableDestination: DraggableLocation = {
      droppableId: 'column.id.2',
      index: 1,
    }

    const expectedAction = {
      type: types.MOVE_TILE,
      payload: {
        droppableSource,
        droppableDestination,
      },
    }
    expect(actions.moveTile(droppableSource, droppableDestination)).toEqual(
      expectedAction
    )
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

  it('should create an action to reorder a column', () => {
    const columnOrder = ['column.id.1', 'column.id.2']
    const startIndex = 0
    const endIndex = 1

    const expectedAction = {
      type: types.REORDER_COLUMN,
      payload: {
        columnOrder,
        startIndex,
        endIndex,
      },
    }
    expect(actions.reorderColumn(columnOrder, startIndex, endIndex)).toEqual(
      expectedAction
    )
  })
})
