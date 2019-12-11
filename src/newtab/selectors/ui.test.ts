import { IUIState } from 'reducers/ui'
import { getSidebarVisibility } from 'selectors/ui'

const testState: IUIState = {
  sidebarVisible: true,
}

describe('UI selectors', () => {
  it('getSidebarVisibility should return boolean', () => {
    const selection = getSidebarVisibility.resultFunc(testState)
    expect(typeof selection).toEqual('boolean')
    expect(selection).toEqual(true)
  })
})
