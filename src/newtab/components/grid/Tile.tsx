import { ITile } from 'models/newtab'
import * as React from 'react'
import { RGBColorToString } from 'utils/colour'
import './Tile.scss'

interface IProps {
  tile: ITile
  disableLink?: boolean // link can be removed when editing the grid
}

export class Tile extends React.Component<IProps, {}> {
  getTileContent = () => {
    const {
      id,
      name,
      url,
      displayMode,
      backgroundColour,
      fontColour,
      favicon,
      image,
    } = this.props.tile
    const faviconURL = url.replace('https://', '').replace('http://', '')

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
          <img
            className={'favicon'}
            src={`http://icons.duckduckgo.com/ip2/${faviconURL}.ico`}
          />
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
