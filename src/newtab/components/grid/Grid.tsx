import * as React from 'react'
import './Grid.scss'

import { IColumn, ITile } from '../../models/newtab'
import { Column } from './Column'
import { Instructions } from './Instructions'

interface IProps {
  tiles: { [id: string]: ITile }
  columns: { [id: string]: IColumn }
  columnOrder: string[]
}

export class Grid extends React.Component<IProps, {}> {
  render() {
    const { tiles, columns, columnOrder } = this.props
    if (Object.keys(tiles).length === 0) {
      return <Instructions />
    } else {
      return (
        <div className={'container'}>
          <div className={'grid'}>
            {columnOrder.map(column => (
              <Column
                key={columns[column].id}
                column={columns[column]}
                tiles={tiles}
              />
            ))}
          </div>
        </div>
      )
    }
  }
}
