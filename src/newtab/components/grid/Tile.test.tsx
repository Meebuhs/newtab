import * as enzyme from 'enzyme'
import * as React from 'react'
import { Tile } from '../../components/grid/Tile'

describe('Tile component', () => {
  it('should render tile with solid background colour', () => {
    const tileObject = {
      id: 'tile.id',
      url: 'tile.url',
      name: 'test.tile',
      displayMode: 'colour' as 'colour',
      backgroundColour: '#fff',
      fontColour: '#000',
      favicon: false,
      image: '',
    }
    const tile = enzyme.shallow(<Tile tile={tileObject} />)
    expect(tile.find('.tile').text()).toEqual('test.tile')
    expect(tile.find('.tile').get(0).props.style).toHaveProperty(
      'backgroundColor',
      tileObject.backgroundColour
    )
    expect(tile.find('.tile').get(0).props.style).toHaveProperty(
      'color',
      tileObject.fontColour
    )
  })
})
