import * as types from '../constants/types'
import { reducer } from '../reducers/ui'
import { initialState } from './ui'

describe('UI reducer', () => {
  it('should handle TOGGLE_SIDEBAR correctly', () => {
    const sidebarVisibleState = reducer(initialState, {
      type: types.TOGGLE_SIDEBAR,
      payload: {},
    })

    expect(sidebarVisibleState).toEqual({
      sidebarVisible: true,
    })

    expect(
      reducer(sidebarVisibleState, {
        type: types.TOGGLE_SIDEBAR,
        payload: {},
      })
    ).toEqual(initialState)
  })
})
