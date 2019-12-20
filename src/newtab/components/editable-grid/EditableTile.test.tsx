import { EditableTile } from 'components/editable-grid/EditableTile'
import * as enzyme from 'enzyme'
import { TileEditor } from 'modals/editors/tile-editor/TileEditor'
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

  it('should include the editor modal', () => {
    const tile = enzyme.shallow(
      <EditableTile
        tile={testTile}
        index={0}
        handleEditTile={emptyFunction}
        handleRemoveTile={emptyFunction}
      />
    )

    expect(tile.find(TileEditor)).toHaveLength(1)
  })
})
