import { Newtab } from 'components/Newtab'
import * as enzyme from 'enzyme'
import * as React from 'react'

describe('Newtab component', () => {
  it('should render the editable grid when the sidebar is visible', () => {
    const newtab = enzyme.shallow(<Newtab sidebarVisible={true} />)
    expect(newtab.find('Connect(EditableGrid)')).toHaveLength(1)
    expect(newtab.find('Connect(Grid)')).toHaveLength(0)
  })

  it('should render the grid when the sidebar is not visible', () => {
    const newtab = enzyme.shallow(<Newtab sidebarVisible={false} />)
    expect(newtab.find('Connect(EditableGrid)')).toHaveLength(0)
    expect(newtab.find('Connect(Grid)')).toHaveLength(1)
  })
})
