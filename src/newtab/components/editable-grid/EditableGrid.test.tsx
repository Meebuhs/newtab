import { EditableColumn } from 'components/editable-grid/EditableColumn'
import { EditableGrid } from 'components/editable-grid/EditableGrid'
import * as types from 'constants/types'
import * as enzyme from 'enzyme'
import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { initialState, reducer } from 'reducers/grid'

const emptyFunction = () => {
  return
}

describe('Editable grid component', () => {
  it('should contain the drag drop context', () => {
    const { tiles, columns, columnOrder } = initialState
    const grid = enzyme.shallow(
      <EditableGrid
        tiles={tiles}
        columns={columns}
        columnOrder={columnOrder}
        handleRemoveColumn={emptyFunction}
        handleReorderColumn={emptyFunction}
        handleEditTile={emptyFunction}
        handleMoveTile={emptyFunction}
        handleRemoveTile={emptyFunction}
        handleReorderTile={emptyFunction}
      />
    )
    expect(grid.find(DragDropContext)).toHaveLength(1)
  })
})
