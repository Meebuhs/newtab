import EditableGrid from 'containers/EditableGrid'
import Grid from 'containers/Grid'
import Sidebar from 'containers/Sidebar'
import { IBackground } from 'models/newtab'
import * as React from 'react'
import { getGradientString, RGBColorToString } from 'utils/colour'
import './Newtab.scss'

interface IProps {
  sidebarVisible: boolean
  background: IBackground
}

export class Newtab extends React.Component<IProps, {}> {
  getBackgroundStyle = () => {
    const { displayMode, backgroundColour, gradient } = this.props.background

    if (displayMode === 'colour') {
      return {
        backgroundColor: RGBColorToString(backgroundColour),
      }
    } else if (displayMode === 'gradient') {
      return {
        background: getGradientString(
          gradient.startColour,
          gradient.endColour,
          gradient.angle,
          gradient.type
        ),
      }
    } else {
      return {}
    }
  }

  render() {
    const { displayMode, image } = this.props.background
    return (
      <div className={'newtab'} style={this.getBackgroundStyle()}>
        {displayMode === 'image' ? (
          <img className={'background-image'} src={image} />
        ) : null}
        {this.props.sidebarVisible ? <EditableGrid /> : <Grid />}
        <Sidebar />
      </div>
    )
  }
}
