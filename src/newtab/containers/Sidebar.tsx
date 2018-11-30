import { connect } from 'react-redux'
import { addColumn, addTile } from '../actions/grid'
import { Sidebar } from '../components/ui/Sidebar'

const mapDispatchToProps = (dispatch: any) => ({
  handleAddTile: (url: string, id: string) => dispatch(addTile(url, id)),
  handleAddColumn: (id: string) => dispatch(addColumn(id)),
})

export default connect<any, any, any>(
  null,
  mapDispatchToProps
)(Sidebar)
