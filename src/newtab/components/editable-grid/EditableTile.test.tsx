import { EditableTile } from 'components/editable-grid/EditableTile'
import * as enzyme from 'enzyme'
import { TileCreator } from 'modals/tile-creator/TileCreator'
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const colourTile = {
  id: 'tile.id',
  url: 'tile.url',
  name: 'test.tile',
  displayMode: 'colour' as 'colour', // Suppress compiler warning
  backgroundColour: { r: 255, g: 255, b: 255, a: 1 },
  fontColour: { r: 0, g: 0, b: 0, a: 0 },
  favicon: false,
  image: 'image.url',
}

const emptyFunction = () => {
  return
}

describe('Editable tile component', () => {
  it('should be draggable', () => {
    const tile = enzyme.shallow(
      <EditableTile
        tile={colourTile}
        index={0}
        handleEditTile={emptyFunction}
        handleRemoveTile={emptyFunction}
      />
    )

    expect(tile.find(Draggable)).toHaveLength(1)
  })

  it('should include the creator modal', () => {
    const tile = enzyme.shallow(
      <EditableTile
        tile={colourTile}
        index={0}
        handleEditTile={emptyFunction}
        handleRemoveTile={emptyFunction}
      />
    )

    expect(tile.find(TileCreator)).toHaveLength(1)
  })
})
