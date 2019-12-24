import { addColumn, addTile, editBackground, importGrid } from 'actions/grid'
import { toggleSidebar } from 'actions/ui'
import { Sidebar } from 'components/ui/Sidebar'
import { IBackground, ITile } from 'models/newtab'
import { connect } from 'react-redux'
import { IGridState } from 'reducers/grid'
import { IState } from 'reducers/newtab'
import { getBackground, getGrid } from 'selectors/grid'
import { getSidebarVisibility } from 'selectors/ui'

const mapStateToProps = (state: IState) => ({
  sidebarVisible: getSidebarVisibility(state),
  grid: getGrid(state),
  background: getBackground(state),
})

const mapDispatchToProps = (dispatch: any) => ({
  handleAddTile: (tile: ITile) => dispatch(addTile(tile)),
  handleAddColumn: (id: string) => dispatch(addColumn(id)),
  handleToggleSidebar: () => dispatch(toggleSidebar()),
  handleEditBackground: (background: IBackground) =>
    dispatch(editBackground(background)),
  handleImportGrid: (grid: IGridState) => dispatch(importGrid(grid)),
})

export default connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
