import { Sidebar } from 'components/ui/Sidebar'
import * as enzyme from 'enzyme'
import * as React from 'react'

const emptyFunction = () => {
  return
}

describe('Sidebar component', () => {
  it('should not render the sidebar when it is not visible', () => {
    const sidebar = enzyme.shallow(
      <Sidebar
        sidebarVisible={false}
        handleAddColumn={emptyFunction}
        handleAddTile={emptyFunction}
        handleToggleSidebar={emptyFunction}
      />
    )
    expect(sidebar.find('.sidebar').prop('style')).toHaveProperty(
      'marginLeft',
      '-18%'
    )
    expect(sidebar.find('.toggle-sidebar').prop('style')).toHaveProperty(
      'marginLeft',
      0
    )
  })

  it('should render the sidebar when it is visible', () => {
    const sidebar = enzyme.shallow(
      <Sidebar
        sidebarVisible={true}
        handleAddColumn={emptyFunction}
        handleAddTile={emptyFunction}
        handleToggleSidebar={emptyFunction}
      />
    )
    expect(sidebar.find('.sidebar').prop('style')).toHaveProperty(
      'marginLeft',
      0
    )
    expect(sidebar.find('.toggle-sidebar').prop('style')).toHaveProperty(
      'marginLeft',
      '18%'
    )
  })

  it('should render both sidebar functions', () => {
    const sidebar = enzyme.shallow(
      <Sidebar
        sidebarVisible={true}
        handleAddColumn={emptyFunction}
        handleAddTile={emptyFunction}
        handleToggleSidebar={emptyFunction}
      />
    )
    expect(sidebar.find('.sidebar-function')).toHaveLength(2)
  })
})
