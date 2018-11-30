import * as enzyme from 'enzyme'
import * as React from 'react'
import { Column } from '../../components/grid/Column'
import { Grid } from '../../components/grid/Grid'
import { initialState } from '../../reducers/grid'

describe('Grid component', () => {
  it('should render 3 columns', () => {
    const { tiles, columns, columnOrder } = initialState
    const grid = enzyme.shallow(
      <Grid tiles={tiles} columns={columns} columnOrder={columnOrder} />
    )
    expect(grid.find(Column)).toHaveLength(3)
  })
})
