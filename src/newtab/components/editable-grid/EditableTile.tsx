import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import './EditableTile.scss'

import { ITile } from '../../models/newtab'

interface IProps {
  tile: ITile
  index: number
  handleRemoveTile: (id: string) => void
}

export class EditableTile extends React.Component<IProps, {}> {
  /**
   * Removes the tile with the specified id from the grid
   */
  removeTile = () => {
    this.props.handleRemoveTile(this.props.tile.id)
  }

  render() {
    const { id, url } = this.props.tile
    return (
      <Draggable draggableId={id} index={this.props.index} type={'tile'}>
        {provided => (
          <div
            className={'tile'}
            key={id}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {url}
            <button className={'remove-tile'} onClick={this.removeTile}>
              X
            </button>
          </div>
        )}
      </Draggable>
    )
  }
}
