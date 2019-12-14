import { ColourButton } from 'components/ui/elements/ColourButton'
import {
  EDITOR_BACKGROUND_COLOUR_LABEL,
  EDITOR_FAVICON_LABEL,
  EDITOR_FONT_COLOUR_LABEL,
  EDITOR_PREVIEW_LABEL,
} from 'constants/strings'
import { ITile } from 'models/newtab'
import * as React from 'react'
import { RGBColor } from 'react-color'
import { RGBColorToString } from 'utils/colour'
import './ColourConfig.scss'

interface IProps {
  updateStateValue: (attribute: keyof ITile, value: string) => void
  updateColourValue: (attribute: string, value: RGBColor) => void
  updateFaviconValue: (value: boolean) => void
  backgroundColour: RGBColor
  backgroundOnly: boolean
  fontColour: RGBColor
  favicon: boolean
}

export class ColourConfig extends React.Component<IProps, {}> {
  render() {
    const { backgroundColour, backgroundOnly, fontColour } = this.props

    return (
      <div className={'colour-config-container'}>
        <div className={'colour-config-top'}>
          <div className={'colour-config-select-container'}>
            <div className={'colour-config-select'}>
              <div className={'colour-buttons-container'}>
                <div className={'colour-button-container'}>
                  <label
                    className={'form-label'}
                    style={{ lineHeight: '24px' }}
                  >
                    {EDITOR_BACKGROUND_COLOUR_LABEL}
                  </label>
                  <ColourButton
                    colour={this.props.backgroundColour}
                    attribute={'backgroundColour'}
                    updateStateValue={this.props.updateStateValue}
                    updateColourValue={this.props.updateColourValue}
                  />
                </div>
                {backgroundOnly ? null : (
                  <div className={'colour-button-container'}>
                    <label className={'form-label'}>
                      {EDITOR_FONT_COLOUR_LABEL}
                    </label>
                    <ColourButton
                      colour={this.props.fontColour}
                      attribute={'fontColour'}
                      updateStateValue={this.props.updateStateValue}
                      updateColourValue={this.props.updateColourValue}
                    />
                  </div>
                )}
              </div>
            </div>
            {backgroundOnly ? null : (
              <div className={'colour-favicon-container'}>
                <div className={'colour-favicon-select'}>
                  <span>
                    <label className={'form-label'}>
                      {EDITOR_FAVICON_LABEL}
                    </label>
                    <input
                      name={'favicon'}
                      type={'checkbox'}
                      checked={this.props.favicon}
                      onChange={event =>
                        this.props.updateFaviconValue(event.target.checked)
                      }
                    />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={'colour-config-bottom'}>
          <div
            className={'colour-config-preview'}
            style={{
              backgroundColor: RGBColorToString(backgroundColour),
              color: RGBColorToString(fontColour),
            }}
          >
            <span>{EDITOR_PREVIEW_LABEL}</span>
          </div>
        </div>
      </div>
    )
  }
}
