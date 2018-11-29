import * as enzyme from 'enzyme'
import * as React from 'react'
import { Grid } from '../../components/Display/Grid'
import { initialState } from '../../reducers/grid'

describe('Grid component', () => {
  it('should render columns', () => {
    const { tiles, columns, columnOrder } = initialState
    const grid = enzyme.shallow(
      <Grid tiles={tiles} columns={columns} columnOrder={columnOrder} />
    )
    expect(grid.find('#column-1').text()).toEqual('column-1')
    expect(grid.find('#column-0').text()).toEqual('column-0link2')
  })
})
