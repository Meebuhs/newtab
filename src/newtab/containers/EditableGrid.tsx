import { connect } from 'react-redux'
import { removeColumn, removeTile } from '../actions/grid'
import { EditableGrid } from '../components/editable-grid/EditableGrid'
import { IState } from '../reducers/newtab'
import { getColumnOrder, getColumns, getTiles } from '../selectors/grid'

const mapStateToProps = (state: IState) => ({
  tiles: getTiles(state),
  columns: getColumns(state),
  columnOrder: getColumnOrder(state),
})

const mapDispatchToProps = (dispatch: any) => ({
  handleRemoveColumn: (id: string) => dispatch(removeColumn(id)),
  handleRemoveTile: (id: string) => dispatch(removeTile(id)),
})

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(EditableGrid)
