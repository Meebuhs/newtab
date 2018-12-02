import * as React from 'react'
import '../grid/Grid.scss'

import { IColumn, ITile } from '../../models/newtab'
import { Column } from './Column'

interface IProps {
  tiles: { [id: string]: ITile }
  columns: { [id: string]: IColumn }
  columnOrder: string[]
  handleRemoveColumn: (id: string) => void
  handleRemoveTile: (id: string) => void
}
export class Grid extends React.Component<IProps, {}> {
  render() {
    const {
      tiles,
      columns,
      columnOrder,
      handleRemoveColumn,
      handleRemoveTile,
    } = this.props

    return (
      <div className={'grid'}>
        {columnOrder.map(column => (
          <Column
            key={columns[column].id}
            column={columns[column]}
            tiles={tiles}
            handleRemoveColumn={handleRemoveColumn}
            handleRemoveTile={handleRemoveTile}
          />
        ))}
      </div>
    )
  }
}
