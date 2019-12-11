import { EditableTile } from 'components/editable-grid/EditableTile'
import { IColumn, ITile } from 'models/newtab'
import * as React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import close from 'resources/close.png'
import './EditableColumn.scss'

interface IProps {
  column: IColumn
  index: number
  tiles: { [id: string]: ITile }
  handleRemoveColumn: (id: string) => void
  handleRemoveTile: (id: string) => void
  handleEditTile: (tile: ITile) => void
}

export class EditableColumn extends React.Component<IProps, {}> {
  /**
   * Removes this column from the grid.
   */
  removeColumn = () => {
    this.props.handleRemoveColumn(this.props.column.id)
  }

  render() {
    const {
      tiles,
      index,
      column,
      handleRemoveTile,
      handleEditTile,
    } = this.props

    return (
      <Draggable draggableId={column.id} index={index} type={'column'}>
        {(dragProvided, dragSnapshot) => (
          <Droppable droppableId={column.id} type={'tile'}>
            {dropProvided => (
              <div
                className={'column'}
                id={column.id}
                {...dragProvided.draggableProps}
                ref={dragProvided.innerRef}
              >
                <div
                  className={
                    dragSnapshot.isDragging ? 'handle-dragging' : 'handle'
                  }
                  {...dragProvided.dragHandleProps}
                >
                  <button
                    className={'remove-column'}
                    onClick={this.removeColumn}
                  >
                    <img className={'button-icon'} src={close} />
                  </button>
                </div>
                <div
                  className={'tiles'}
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}
                >
                  {column.tileIds.map((tile, tileIndex) => (
                    <EditableTile
                      key={tiles[tile].id}
                      index={tileIndex}
                      tile={tiles[tile]}
                      handleRemoveTile={handleRemoveTile}
                      handleEditTile={handleEditTile}
                    />
                  ))}
                  {dropProvided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        )}
      </Draggable>
    )
  }
}
