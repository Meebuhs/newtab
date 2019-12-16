import { ColourButton } from 'components/ui/elements/ColourButton'
import {
  EDITOR_BACKGROUND_COLOUR_LABEL,
  EDITOR_PREVIEW_LABEL,
} from 'constants/strings'
import * as React from 'react'
import { RGBColor } from 'react-color'
import { RGBColorToString } from 'utils/colour'
import { getFaviconURL } from 'utils/url'
import './ColourConfig.scss'

interface IProps {
  updateColourValue: (attribute: string, value: RGBColor) => void
  url: string
  backgroundColour: RGBColor
  fontColour: RGBColor
  fontSize: string
  favicon: boolean
}

export class ColourConfig extends React.Component<IProps, {}> {
  render() {
    const { url, backgroundColour, fontColour, fontSize, favicon } = this.props

    return (
      <div className={'colour-config-container'}>
        <div className={'colour-config-top'}>
          <div className={'colour-select-container'}>
            <div className={'colour-button-container'}>
              <label
                className={'colour-config-form-label'}
                style={{ lineHeight: '24px' }}
              >
                {EDITOR_BACKGROUND_COLOUR_LABEL}
              </label>
              <ColourButton
                colour={this.props.backgroundColour}
                attribute={'backgroundColour'}
                updateColourValue={this.props.updateColourValue}
              />
            </div>
          </div>
        </div>
        <div className={'colour-config-bottom'}>
          <div
            className={'colour-config-preview'}
            style={{
              backgroundColor: RGBColorToString(backgroundColour),
              color: RGBColorToString(fontColour),
              fontSize: `${fontSize}px`,
            }}
          >
            <div className="colour-config-text">
              {favicon ? (
                <img className={'favicon'} src={getFaviconURL(url)} />
              ) : null}
              {EDITOR_PREVIEW_LABEL}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
