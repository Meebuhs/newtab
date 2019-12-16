import { Dropdown } from 'components/ui/elements/Dropdown'
import * as enzyme from 'enzyme'
import * as React from 'react'
import { emptyFunction } from 'testObjects'

const testProps = {
  items: ['one', 'two', 'three', 'four', 'five'],
  selected: 'two',
  handleSelectionCallback: emptyFunction,
}

describe('Dropdown component', () => {
  it('should render selected item correctly', () => {
    const dropdown = enzyme.shallow(<Dropdown {...testProps} />)
    const selectedIndex = testProps.items.indexOf(testProps.selected)

    expect(dropdown.find('.dropdown-title').text()).toEqual(
      testProps.items[selectedIndex]
    )
  })

  it('should hide list by default', () => {
    const dropdown = enzyme.shallow(<Dropdown {...testProps} />)

    expect(expect(dropdown.find('.dropdown-list').length).toEqual(0))
  })

  it('should render list correctly when open', () => {
    const dropdown = enzyme.shallow(<Dropdown {...testProps} />)
    dropdown.setState({ listOpen: true })
    const selectedIndex = testProps.items.indexOf(testProps.selected)

    expect(
      dropdown
        .find('.dropdown-list')
        .childAt(selectedIndex)
        .hasClass('dropdown-item-selected')
    ).toEqual(true)

    testProps.items.forEach((item, index) => {
      if (index !== selectedIndex) {
        expect(
          dropdown
            .find('.dropdown-list')
            .childAt(index)
            .hasClass('dropdown-item-unselected')
        ).toEqual(true)
        expect(
          dropdown
            .find('.dropdown-list')
            .childAt(index)
            .text()
        ).toEqual(testProps.items[index])
      }
    })
  })
})
