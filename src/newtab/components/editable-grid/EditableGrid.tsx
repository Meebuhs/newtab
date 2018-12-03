import * as React from 'react'
import './EditableGrid.scss'

import { IColumn, ITile } from '../../models/newtab'
import { EditableColumn } from './EditableColumn'

interface IProps {
  tiles: { [id: string]: ITile }
  columns: { [id: string]: IColumn }
  columnOrder: string[]
  handleRemoveColumn: (id: string) => void
  handleRemoveTile: (id: string) => void
}
export class EditableGrid extends React.Component<IProps, {}> {
  render() {
    const {
      tiles,
      columns,
      columnOrder,
      handleRemoveColumn,
      handleRemoveTile,
    } = this.props

    return (
      <div className={'editable-container'}>
        <div className={'editable-grid'}>
          {columnOrder.map(column => (
            <EditableColumn
              key={columns[column].id}
              column={columns[column]}
              tiles={tiles}
              handleRemoveColumn={handleRemoveColumn}
              handleRemoveTile={handleRemoveTile}
            />
          ))}
        </div>
      </div>
    )
  }
}
