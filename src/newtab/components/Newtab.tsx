import EditableGrid from 'containers/EditableGrid'
import Grid from 'containers/Grid'
import Sidebar from 'containers/Sidebar'
import * as React from 'react'
import './Newtab.scss'

interface IProps {
  sidebarVisible: boolean
}

export class Newtab extends React.Component<IProps, {}> {
  render() {
    return (
      <div className={'newtab'}>
        {this.props.sidebarVisible ? <EditableGrid /> : <Grid />}
        <Sidebar />
      </div>
    )
  }
}
