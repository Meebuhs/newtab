import { connect } from 'react-redux'
import { Grid } from '../components/Display/Grid'
import { IState } from '../reducers/newtab'
import { getColumnOrder, getColumns, getTiles } from '../selectors/grid'

/**
 * The grid container maps the current grid state to the props of the grid component
 */

const mapStateToProps = (state: IState) => ({
  tiles: getTiles(state),
  columns: getColumns(state),
  columnOrder: getColumnOrder(state),
})

const mapDispatchToProps = {}

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(Grid)
