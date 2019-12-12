import { EditableTile } from 'components/editable-grid/EditableTile'
import * as enzyme from 'enzyme'
import { TileCreator } from 'modals/tile-creator/TileCreator'
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { emptyFunction, testTile } from 'testObjects'

describe('Editable tile component', () => {
  it('should be draggable', () => {
    const tile = enzyme.shallow(
      <EditableTile
        tile={testTile}
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
        tile={testTile}
        index={0}
        handleEditTile={emptyFunction}
        handleRemoveTile={emptyFunction}
      />
    )

    expect(tile.find(TileCreator)).toHaveLength(1)
  })
})
