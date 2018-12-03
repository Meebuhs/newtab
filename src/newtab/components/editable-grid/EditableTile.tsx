import * as React from 'react'
import './EditableTile.scss'

import { ITile } from '../../models/newtab'

interface IProps {
  tile: ITile
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
      <div className={'tile'} key={id}>
        {url}
        <button className={'remove-tile'} onClick={this.removeTile}>
          X
        </button>
      </div>
    )
  }
}
