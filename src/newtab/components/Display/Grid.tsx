import * as React from 'react'
import './Grid.scss'

import { IColumn, ITile } from '../../models/newtab'

interface IProps {
  tiles: { [id: string]: ITile }
  columns: { [id: string]: IColumn }
  columnOrder: string[]
}
export class Grid extends React.Component<IProps, {}> {
  render() {
    const { tiles, columns, columnOrder } = this.props
    return columnOrder.map(column => (
      <div className={'column'} id={column}>
        {column}
        {columns[column].tileIds.map(tile => (
          <div className={'tile'} key={tiles[tile].id}>
            {tiles[tile].url}
          </div>
        ))}
      </div>
    ))
  }
}
