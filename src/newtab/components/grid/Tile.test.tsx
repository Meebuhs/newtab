import * as enzyme from 'enzyme'
import * as React from 'react'
import { Tile } from '../../components/grid/Tile'

describe('Tile component', () => {
  it('should render tile', () => {
    const tile = enzyme.shallow(
      <Tile tile={{ url: 'test.url', id: 'test.id' }} />
    )
    expect(tile.find('.tile').text()).toEqual('test.url')
  })
})
