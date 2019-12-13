import { ToggleButton } from 'components/ui/ToggleButton'
import * as enzyme from 'enzyme'
import * as React from 'react'
import { emptyFunction } from 'testObjects'

const testProps = {
  labels: ['one', 'two', 'three', 'four', 'five'],
  keys: ['a', 'b', 'c', 'd', 'e'],
  handleSelectionCallback: emptyFunction,
}

describe('ToggleButton component', () => {
  it('should render correctly when first key selected, two keys', () => {
    const props = {
      ...testProps,
      labels: testProps.labels.slice(0, 2),
      keys: testProps.keys.slice(0, 2),
      selectedKey: testProps.keys[0],
    }
    const toggleButton = enzyme.shallow(<ToggleButton {...props} />)
    const selectedIndex = props.keys.indexOf(props.selectedKey)

    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(selectedIndex)
        .hasClass('toggle-section-selected')
    ).toEqual(true)
    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(selectedIndex)
        .text()
    ).toEqual(props.labels[selectedIndex])

    props.keys.forEach((key, index) => {
      if (index !== selectedIndex) {
        expect(
          toggleButton
            .find('.toggle-wrapper')
            .childAt(index)
            .hasClass('toggle-section-unselected')
        ).toEqual(true)
        expect(
          toggleButton
            .find('.toggle-wrapper')
            .childAt(index)
            .text()
        ).toEqual(props.labels[index])
      }
    })
  })

  it('should render correctly when undefined key provided, three keys', () => {
    const props = {
      ...testProps,
      labels: testProps.labels.slice(0, 3),
      keys: testProps.keys.slice(0, 3),
      selectedKey: undefined,
    }
    const toggleButton = enzyme.shallow(<ToggleButton {...props} />)
    const selectedIndex = 0 // togglebutton should select first label in this situation

    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(selectedIndex)
        .hasClass('toggle-section-selected')
    ).toEqual(true)
    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(selectedIndex)
        .text()
    ).toEqual(props.labels[0])

    props.keys.forEach((key, index) => {
      if (index !== selectedIndex) {
        expect(
          toggleButton
            .find('.toggle-wrapper')
            .childAt(index)
            .hasClass('toggle-section-unselected')
        ).toEqual(true)
        expect(
          toggleButton
            .find('.toggle-wrapper')
            .childAt(index)
            .text()
        ).toEqual(props.labels[index])
      }
    })
  })

  it('should render correctly when non-existent key selected, four keys', () => {
    const props = {
      ...testProps,
      labels: testProps.labels.slice(0, 4),
      keys: testProps.keys.slice(0, 4),
      selectedKey: 'banana',
    }
    const toggleButton = enzyme.shallow(<ToggleButton {...props} />)
    const selectedIndex = 0 // togglebutton should select first label in this situation

    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(selectedIndex)
        .hasClass('toggle-section-selected')
    ).toEqual(true)
    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(selectedIndex)
        .text()
    ).toEqual(props.labels[0])

    props.keys.forEach((key, index) => {
      if (index !== selectedIndex) {
        expect(
          toggleButton
            .find('.toggle-wrapper')
            .childAt(index)
            .hasClass('toggle-section-unselected')
        ).toEqual(true)
        expect(
          toggleButton
            .find('.toggle-wrapper')
            .childAt(index)
            .text()
        ).toEqual(props.labels[index])
      }
    })
  })

  it('should render correctly when third key selected, five keys', () => {
    const props = {
      ...testProps,
      labels: testProps.labels,
      keys: testProps.keys,
      selectedKey: testProps.keys[2],
    }
    const toggleButton = enzyme.shallow(<ToggleButton {...props} />)
    const selectedIndex = props.keys.indexOf(props.selectedKey)

    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(selectedIndex)
        .hasClass('toggle-section-selected')
    ).toEqual(true)
    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(selectedIndex)
        .text()
    ).toEqual(props.labels[selectedIndex])

    props.keys.forEach((key, index) => {
      if (index !== selectedIndex) {
        expect(
          toggleButton
            .find('.toggle-wrapper')
            .childAt(index)
            .hasClass('toggle-section-unselected')
        ).toEqual(true)
        expect(
          toggleButton
            .find('.toggle-wrapper')
            .childAt(index)
            .text()
        ).toEqual(props.labels[index])
      }
    })
  })
})
