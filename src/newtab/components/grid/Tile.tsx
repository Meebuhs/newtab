import { ITile } from 'models/newtab'
import * as React from 'react'
import './Tile.scss'

interface IProps {
  tile: ITile
}

export class Tile extends React.Component<IProps, {}> {
  /**
   * Creates the tile's style based on its colour and font properties. This is only done with colour tiles,
   * image tiles are created in the render function.
   */
  createStyle = () => {
    const { backgroundColour, fontColour, favicon } = this.props.tile
    return {
      backgroundColor: backgroundColour,
      color: fontColour,
      marginBottom: '20px',
    }
  }

  render() {
    const { id, name, url, displayMode, image } = this.props.tile
    return (
      <a href={url} className={'tile-link'}>
        {displayMode === 'colour' ? (
          <div className={'tile'} key={id} style={this.createStyle()}>
            <div className={'tile-overlay'} />
            {name}
          </div>
        ) : (
          <div className={'tile'} key={id}>
            <div className={'tile-overlay'} />
            <img className={'tile-image'} src={image} />
            <div className="tile-image-text">{name}</div>
          </div>
        )}
      </a>
    )
  }
}
