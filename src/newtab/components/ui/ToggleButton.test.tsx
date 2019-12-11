import { ToggleButton } from 'components/ui/ToggleButton'
import * as enzyme from 'enzyme'
import * as React from 'react'

const emptyFunction = () => {
  return
}

const testProps = {
  leftLabel: 'left',
  rightLabel: 'right',
  handleToggleCallback: emptyFunction,
}

describe('ToggleButton component', () => {
  it('should render correctly when left side selected', () => {
    const toggleButton = enzyme.shallow(
      <ToggleButton {...testProps} toggled={false} />
    )
    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(0)
        .hasClass('toggle-section-selected')
    ).toEqual(true)
    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(0)
        .text()
    ).toEqual(testProps.leftLabel)
    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(1)
        .hasClass('toggle-section-unselected')
    ).toEqual(true)
    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(1)
        .text()
    ).toEqual(testProps.rightLabel)
  })

  it('should render correctly when right side selected', () => {
    const toggleButton = enzyme.shallow(
      <ToggleButton {...testProps} toggled={true} />
    )
    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(0)
        .hasClass('toggle-section-unselected')
    ).toEqual(true)
    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(0)
        .text()
    ).toEqual(testProps.leftLabel)
    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(1)
        .hasClass('toggle-section-selected')
    ).toEqual(true)
    expect(
      toggleButton
        .find('.toggle-wrapper')
        .childAt(1)
        .text()
    ).toEqual(testProps.rightLabel)
  })
})
