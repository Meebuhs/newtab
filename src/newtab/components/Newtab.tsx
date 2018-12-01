import * as React from 'react'
import Grid from '../containers/EditableGrid'
import Sidebar from '../containers/Sidebar'
import './Newtab.scss'

export class Newtab extends React.Component {
  render() {
    return (
      <div className={'newtab'}>
        <Grid />
        <Sidebar />
      </div>
    )
  }
}
