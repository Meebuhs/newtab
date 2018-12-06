import * as enzyme from 'enzyme'
import * as React from 'react'
import { Instructions } from '../../components/grid/Instructions'
import { INSTRUCTION_HEADER, INSTRUCTION_TEXT } from '../../constants/strings'

describe('Instructions component', () => {
  it('should render the instructions', () => {
    const instructions = enzyme.shallow(<Instructions />)
    expect(instructions.find('.instructions-header').text()).toEqual(
      INSTRUCTION_HEADER
    )
    expect(instructions.find('.instructions-text').text()).toEqual(
      INSTRUCTION_TEXT
    )
  })
})
