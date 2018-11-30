import * as enzyme from 'enzyme'
import * as React from 'react'
import * as types from '../../constants/types'

import { Column } from '../../components/grid/Column'
import { Grid } from '../../components/grid/Grid'
import { initialState, reducer } from '../../reducers/grid'

describe('Grid component', () => {
  it('should render 3 columns upon initialisation', () => {
    const { tiles, columns, columnOrder } = initialState
    const grid = enzyme.shallow(
      <Grid tiles={tiles} columns={columns} columnOrder={columnOrder} />
    )
    expect(grid.find(Column)).toHaveLength(3)
  }),
    it('should render an added column', () => {
      const addedColumnState = reducer(initialState, {
        type: types.ADD_COLUMN,
        payload: {
          column: {
            id: 'new.column',
            tileIds: [],
          },
        },
      })
      const { tiles, columns, columnOrder } = addedColumnState
      const grid = enzyme.shallow(
        <Grid tiles={tiles} columns={columns} columnOrder={columnOrder} />
      )
      expect(grid.find(Column)).toHaveLength(4)
    })
})
