import { connect } from 'react-redux'
import { Newtab } from '../components/Newtab'
import { IState } from '../reducers/newtab'
import { getSidebarVisibility } from '../selectors/ui'

const mapStateToProps = (state: IState) => ({
  sidebarVisible: getSidebarVisibility(state),
})

export default connect<any, any, any>(
  mapStateToProps,
  {}
)(Newtab)