import * as enzyme from 'enzyme'
import * as React from 'react'
import { Instructions } from '../../components/grid/Instructions'

describe('Instructions component', () => {
  it('should render the instructions', () => {
    const instructions = enzyme.shallow(<Instructions />)
    expect(instructions.find('.instructions-header').text()).toEqual(
      "There's more to this!"
    )
    expect(instructions.find('.instructions-text').text()).toEqual(
      'Click the settings button in the top left to add some tiles.'
    )
  })
})
