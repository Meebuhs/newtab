import { ITile } from 'models/newtab'
import * as React from 'react'
import './Tile.scss'

interface IProps {
  tile: ITile
}

export class Tile extends React.Component<IProps, {}> {
  /**
   * Creates the tile's style based on the displaymode and its properties.
   */
  createStyle = () => {
    const { displayMode } = this.props.tile
    switch (displayMode) {
      case 'image': {
        const { image } = this.props.tile
        return {
          backgroundImage: image,
          marginBottom: '20px',
        }
      }
      case 'colour': {
        const { backgroundColour, fontColour, favicon } = this.props.tile
        return {
          backgroundColor: backgroundColour,
          color: fontColour,
          marginBottom: '20px',
        }
      }
    }
  }

  render() {
    const { id, name, url } = this.props.tile
    return (
      <a href={url} className={'tile-link'}>
        <div className={'tile'} key={id} style={this.createStyle()}>
          <span>{name}</span>
        </div>
      </a>
    )
  }
}
