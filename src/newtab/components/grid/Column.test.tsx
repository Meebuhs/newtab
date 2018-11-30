import * as enzyme from 'enzyme'
import * as React from 'react'
import { Column } from '../../components/grid/Column'
import { Tile } from '../../components/grid/Tile'

describe('Column component', () => {
  it('should render 2 tiles', () => {
    const tiles = {
      'test.1': {
        id: 'test.1',
        url: 'url.1',
      },
      'test.2': {
        id: 'test.2',
        url: 'url.2',
      },
    }
    const column = {
      id: 'column-0',
      tileIds: ['test.1', 'test.2'],
    }
    const grid = enzyme.shallow(<Column tiles={tiles} column={column} />)
    expect(grid.find(Tile)).toHaveLength(2)
  })
})
