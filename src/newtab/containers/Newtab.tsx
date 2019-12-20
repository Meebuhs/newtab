import { Newtab } from 'components/Newtab'
import { connect } from 'react-redux'
import { IState } from 'reducers/newtab'
import { getBackground } from 'selectors/grid'
import { getSidebarVisibility } from 'selectors/ui'

const mapStateToProps = (state: IState) => ({
  sidebarVisible: getSidebarVisibility(state),
  background: getBackground(state),
})

export default connect<any, any, any>(mapStateToProps, {})(Newtab)
