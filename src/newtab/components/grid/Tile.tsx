import { ITile } from 'models/newtab'
import * as React from 'react'
import { RGBColorToString } from 'utils/colour'
import './Tile.scss'

interface IProps {
  tile: ITile
  disableLink?: boolean // link can be removed when editing the grid
}

export class Tile extends React.Component<IProps, {}> {
  /**
   * Returns the properly formatted url for retrieving the favicon. This is attempted by trimming the start and end
   * to gain a url of the form '(www.)website.com'.
   */
  getFaviconURL = () => {
    let faviconURL = this.props.tile.url
      .replace('https://', '')
      .replace('http://', '')
    faviconURL = faviconURL.substring(0, faviconURL.indexOf('/'))
    return `http://icons.duckduckgo.com/ip2/${faviconURL}.ico`
  }

  /**
   * Returns the render content for the tile depending on whether it has a colour or an image background.
   */
  getTileContent = () => {
    const {
      id,
      name,
      displayMode,
      backgroundColour,
      fontColour,
      favicon,
      image,
    } = this.props.tile

    return displayMode === 'colour' ? (
      <div
        className={'tile'}
        key={id}
        style={{
          backgroundColor: RGBColorToString(backgroundColour),
          color: RGBColorToString(fontColour),
        }}
      >
        <div className={'tile-overlay'} />
        {favicon ? (
          <img className={'favicon'} src={this.getFaviconURL()} />
        ) : null}
        {name}
      </div>
    ) : (
      <div className={'tile'} key={id}>
        <div className={'tile-overlay'} />
        <img className={'tile-image'} src={image} />
        <div className="tile-image-text">{name}</div>
      </div>
    )
  }

  render() {
    const { url } = this.props.tile
    const tileContent = this.getTileContent()

    return this.props.disableLink ? (
      tileContent
    ) : (
      <a href={url} className={'tile-link'}>
        {tileContent}
      </a>
    )
  }
}
