import {
  editTile,
  moveTile,
  removeColumn,
  removeTile,
  reorderColumn,
  reorderTile,
} from 'actions/grid'
import { EditableGrid } from 'components/editable-grid/EditableGrid'
import { IColumn, ITile } from 'models/newtab'
import { DraggableLocation } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { IState } from 'reducers/newtab'
import { getColumnOrder, getColumns, getTiles } from 'selectors/grid'

const mapStateToProps = (state: IState) => ({
  tiles: getTiles(state),
  columns: getColumns(state),
  columnOrder: getColumnOrder(state),
})

const mapDispatchToProps = (dispatch: any) => ({
  handleRemoveColumn: (id: string) => dispatch(removeColumn(id)),
  handleReorderColumn: (
    columnOrder: string[],
    startIndex: number,
    endIndex: number
  ) => dispatch(reorderColumn(columnOrder, startIndex, endIndex)),
  handleEditTile: (tile: ITile) => dispatch(editTile(tile)),
  handleMoveTile: (
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => dispatch(moveTile(droppableSource, droppableDestination)),
  handleRemoveTile: (id: string) => dispatch(removeTile(id)),
  handleReorderTile: (column: IColumn, startIndex: number, endIndex: number) =>
    dispatch(reorderTile(column, startIndex, endIndex)),
})

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(EditableGrid)
