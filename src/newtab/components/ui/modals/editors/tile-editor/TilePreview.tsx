import { EDITOR_PREVIEW_LABEL } from 'constants/strings'
import * as React from 'react'
import { RGBColor } from 'react-color'
import { getGradientString, RGBColorToString } from 'utils/colour'
import { getFaviconURL } from 'utils/url'
import './TilePreview.scss'

interface IProps {
  url: string
  displayMode: 'colour' | 'gradient' | 'image'
  backgroundColour: RGBColor
  fontColour: RGBColor
  fontSize: string
  gradient: {
    type: 'linear' | 'radial'
    startColour: RGBColor
    endColour: RGBColor
    angle: string
  }
  favicon: boolean
  image: string
}

export class TilePreview extends React.Component<IProps, {}> {
  render() {
    const {
      url,
      displayMode,
      backgroundColour,
      fontColour,
      fontSize,
      gradient,
      favicon,
      image,
    } = this.props

    if (displayMode === 'colour') {
      return (
        <div
          className={'config-preview'}
          style={{
            backgroundColor: RGBColorToString(backgroundColour),
            color: RGBColorToString(fontColour),
            fontSize: `${fontSize}px`,
          }}
        >
          <div className="preview-text">
            {favicon ? (
              <img className={'favicon'} src={getFaviconURL(url)} />
            ) : null}
            {EDITOR_PREVIEW_LABEL}
          </div>
        </div>
      )
    } else if (displayMode === 'gradient') {
      return (
        <div
          className={'config-preview'}
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
          <div className="preview-text">
            {favicon ? (
              <img className={'favicon'} src={getFaviconURL(url)} />
            ) : null}
            {EDITOR_PREVIEW_LABEL}
          </div>
        </div>
      )
    } else {
      return (
        <div
          className={'config-preview'}
          style={{
            color: RGBColorToString(fontColour),
            fontSize: `${fontSize}px`,
          }}
        >
          {this.props.image === '' ? null : (
            <img className={'preview-image'} src={image} />
          )}
          <div className="image-preview-text">
            {favicon ? (
              <img className={'favicon'} src={getFaviconURL(url)} />
            ) : null}
            {EDITOR_PREVIEW_LABEL}
          </div>
        </div>
      )
    }
  }
}
