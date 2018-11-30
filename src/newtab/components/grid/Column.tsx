import * as React from 'react'
import './Column.scss'

import { IColumn, ITile } from '../../models/newtab'
import { Tile } from './Tile'

interface IProps {
  column: IColumn
  tiles: { [id: string]: ITile }
}

export class Column extends React.Component<IProps, {}> {
  render() {
    const { tiles, column } = this.props
    return (
      <div className={'column'} id={column.id}>
        {column.tileIds.map(tile => (
          <Tile key={tiles[tile].id} tile={tiles[tile]} />
        ))}
      </div>
    )
  }
}
