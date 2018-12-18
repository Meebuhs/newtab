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
    const content = this.props.sidebarVisible ? <EditableGrid /> : <Grid />

    return (
      <div className={'newtab'}>
        {content}
        <Sidebar />
      </div>
    )
  }
}
