import * as types from 'constants/types'
import { initialState, reducer } from 'reducers/ui'

describe('UI reducers', () => {
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
