import { EditableColumn } from 'components/editable-grid/EditableColumn'
import * as enzyme from 'enzyme'
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { emptyFunction, testTile } from 'testObjects'

describe('Editable column component', () => {
  it('should be draggable', () => {
    const testTiles = ['test.tile.id.1', 'test.tile.id.2'].map(id => ({
      ...testTile,
      id,
    }))

    const tiles = {
      [testTiles[0].id]: testTiles[0],
      [testTiles[1].id]: testTiles[1],
    }
    const column = {
      id: 'column-0',
      tileIds: [testTiles[0].id, testTiles[1].id],
    }
    const renderedColumn = enzyme.shallow(
      <EditableColumn
        key={0}
        column={column}
        index={0}
        tiles={tiles}
        handleRemoveColumn={emptyFunction}
        handleEditTile={emptyFunction}
        handleRemoveTile={emptyFunction}
      />
    )
    expect(renderedColumn.find(Draggable)).toHaveLength(1)
  })
})
