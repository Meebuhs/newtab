import { ITile } from 'models/newtab'
import * as React from 'react'
import { RGBColorToString } from 'utils/colour'
import './Tile.scss'

interface IProps {
  tile: ITile
}

export class Tile extends React.Component<IProps, {}> {
  render() {
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
    return (
      <a href={url} className={'tile-link'}>
        {displayMode === 'colour' ? (
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
                src={`http://icons.duckduckgo.com/ip2/${url}.ico`}
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
        )}
      </a>
    )
  }
}
