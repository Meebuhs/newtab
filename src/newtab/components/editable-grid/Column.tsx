import * as React from 'react'
import './Column.scss'

import { IColumn, ITile } from '../../models/newtab'
import { Tile } from './Tile'

interface IProps {
  column: IColumn
  tiles: { [id: string]: ITile }
  handleRemoveColumn: (id: string) => void
  handleRemoveTile: (id: string) => void
}

export class Column extends React.Component<IProps, {}> {
  /**
   * Removes the column with the specified id from the grid
   */
  removeColumn = () => {
    this.props.handleRemoveColumn(this.props.column.id)
  }

  render() {
    const { tiles, column, handleRemoveColumn, handleRemoveTile } = this.props
    return (
      <div className={'column'} id={column.id}>
        <div className={'handle'}>
          <button className={'remove-column'} onClick={this.removeColumn}>
            X
          </button>
        </div>
        <div className={'tiles'}>
          {column.tileIds.map(tile => (
            <Tile
              key={tiles[tile].id}
              tile={tiles[tile]}
              handleRemoveTile={handleRemoveTile}
            />
          ))}
        </div>
      </div>
    )
  }
}
