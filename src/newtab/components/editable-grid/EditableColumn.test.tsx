import { EditableColumn } from 'components/editable-grid/EditableColumn'
import * as enzyme from 'enzyme'
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const emptyFunction = () => {
  return
}

describe('Editable column component', () => {
  it('should be draggable', () => {
    const testTiles = ['test.tile.id.1', 'test.tile.id.2'].map(id => ({
      id,
      name: 'test.tile.name',
      url: 'test.tile.url',
      displayMode: 'colour' as 'colour', // Suppress compiler warning
      backgroundColour: { r: 255, g: 255, b: 255, a: 1 },
      fontColour: { r: 0, g: 0, b: 0, a: 1 },
      favicon: false,
      image: 'test.image.data',
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
