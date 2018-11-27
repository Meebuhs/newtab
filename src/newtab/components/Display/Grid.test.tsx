import * as enzyme from 'enzyme'
import * as React from 'react'
import { Grid } from './Grid'

// Basic jest test
test('two plus two is four', () => {
  expect(2 + 2).toBe(4)
})

it('renders the correct text', () => {
  const grid = enzyme.shallow(<Grid testString="Testing title" />)
  expect(grid.find('.title').text()).toEqual('Testing title')
})
