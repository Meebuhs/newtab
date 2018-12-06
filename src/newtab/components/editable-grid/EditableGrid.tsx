import * as React from 'react'
import {
  DragDropContext,
  DraggableLocation,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import './EditableGrid.scss'

import { IColumn, ITile } from '../../models/newtab'
import { EditableColumn } from './EditableColumn'

interface IProps {
  tiles: { [id: string]: ITile }
  columns: { [id: string]: IColumn }
  columnOrder: string[]
  handleRemoveColumn: (id: string) => void
  handleReorderColumn: (
    columnOrder: string[],
    startIndex: number,
    endIndex: number
  ) => void
  handleMoveTile: (
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => void
  handleRemoveTile: (id: string) => void
  handleReorderTile: (
    column: IColumn,
    startIndex: number,
    endIndex: number
  ) => void
}
export class EditableGrid extends React.Component<IProps, {}> {
  /**
   * Handles the drag end event and calls the appropriate method for mutating the state.
   * @param {DropResult} result the result of the onDragEnd event
   */
  onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result

    if (!destination) {
      // Dragged off of droppable area
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // Position hasn't changed
      return
    }

    if (type === 'column') {
      this.columnDragEnd(result)
    } else {
      this.tileDragEnd(result)
    }
  }

  /**
   * Handles the reorder call for dragging a column.
   * @param {DropResult} result the result of the onDragEnd event
   */
  columnDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (destination) {
      const newColumnOrder = Array.from(this.props.columnOrder)
      this.props.handleReorderColumn(
        newColumnOrder,
        source.index,
        destination.index
      )
    }
  }

  /**
   * Handles the reorder call for dragging a tile. Tiles can either be rearranged within a column or moved
   * from one column to another.
   * @param {DropResult} result the result of the onDragEnd event
   */
  tileDragEnd = (result: DropResult) => {
    const { destination, source } = result
    if (!destination) {
      return
    }
    if (source.droppableId === destination.droppableId) {
      if (source.index !== destination.index) {
        // The tile has changed position within one column
        this.props.handleReorderTile(
          this.props.columns[source.droppableId],
          source.index,
          destination.index
        )
      }
    } else {
      // The tile has been moved from one column to another
      this.props.handleMoveTile(source, destination)
    }
  }

  render() {
    const {
      tiles,
      columns,
      columnOrder,
      handleRemoveColumn,
      handleRemoveTile,
    } = this.props

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId={'grid'} direction={'horizontal'} type="column">
          {provided => (
            <div className={'editable-container'}>
              <div
                className={'editable-grid'}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {columnOrder.map((column, index) => (
                  <EditableColumn
                    key={columns[column].id}
                    column={columns[column]}
                    index={index}
                    tiles={tiles}
                    handleRemoveColumn={handleRemoveColumn}
                    handleRemoveTile={handleRemoveTile}
                  />
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
