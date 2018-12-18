import { Grid } from 'components/grid/Grid'
import { connect } from 'react-redux'
import { IState } from 'reducers/newtab'
import { getColumnOrder, getColumns, getTiles } from 'selectors/grid'

const mapStateToProps = (state: IState) => ({
  tiles: getTiles(state),
  columns: getColumns(state),
  columnOrder: getColumnOrder(state),
})

export default connect<any, any, any>(
  mapStateToProps,
  {}
)(Grid)
