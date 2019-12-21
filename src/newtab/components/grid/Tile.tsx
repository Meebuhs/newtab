import { ITile } from 'models/newtab'
import * as React from 'react'
import { getGradientString, RGBColorToString } from 'utils/colour'
import { getFaviconURL } from 'utils/url'
import './Tile.scss'

interface IProps {
  tile: ITile
  disableLink?: boolean // link can be removed when editing the grid
}

export class Tile extends React.Component<IProps, {}> {
  /**
   * Returns the render content for the tile depending on whether it has a colour or an image background.
   */
  getTileContent = () => {
    const {
      id,
      name,
      url,
      displayMode,
      backgroundColour,
      fontColour,
      fontSize,
      gradient,
      favicon,
      image,
    } = this.props.tile

    if (displayMode === 'colour') {
      return (
        <div
          className={'tile'}
          key={id}
          style={{
            backgroundColor: RGBColorToString(backgroundColour),
            color: RGBColorToString(fontColour),
            fontSize: `${fontSize}px`,
          }}
        >
          <div className={'tile-overlay'} />
          {favicon ? (
            <img className={'favicon'} src={getFaviconURL(url)} />
          ) : null}
          {name}
        </div>
      )
    } else if (displayMode === 'gradient') {
      return (
        <div
          className={'tile'}
          key={id}
          style={{
            color: RGBColorToString(fontColour),
            fontSize: `${fontSize}px`,
            background: getGradientString(
              gradient.startColour,
              gradient.endColour,
              gradient.angle,
              gradient.type
            ),
          }}
        >
          <div className={'tile-overlay'} />
          {favicon ? (
            <img className={'favicon'} src={getFaviconURL(url)} />
          ) : null}
          {name}
        </div>
      )
    } else {
      return (
        <div
          className={'tile'}
          key={id}
          style={{
            color: RGBColorToString(fontColour),
            fontSize: `${fontSize}px`,
          }}
        >
          <div className={'tile-overlay'} />
          <img className={'tile-image'} src={image} />
          <div className="tile-image-text">
            {favicon ? (
              <img className={'favicon'} src={getFaviconURL(url)} />
            ) : null}
            {name}
          </div>
        </div>
      )
    }
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
