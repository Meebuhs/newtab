import * as React from 'react'
import {
  TILECREATOR_COLOUR_LABEL,
  TILECREATOR_COLOUR_PREVIEW,
  TILECREATOR_FONT_LABEL,
} from '../../../../constants/strings'
import { ITile } from '../../../../models/newtab'
import { ColourButton } from '../../ColourButton'
import './TileColourConfig.scss'

interface IProps {
  updateStateValue: (attribute: keyof ITile, value: string) => void
  updateFaviconValue: (value: boolean) => void
  backgroundColour: string
  fontColour: string
  favicon: boolean
}

export class TileColourBackgroundConfig extends React.Component<IProps, {}> {
  render() {
    return (
      <div className={'tile-colour-container'}>
        <div className={'tile-colour-top'}>
          <div className={'tile-colour-config-container'}>
            <div className={'tile-colour-select'}>
              <div className={'tile-colour-buttons'}>
                <div className={'tile-colour-button'}>
                  <label
                    className={'form-label'}
                    style={{ lineHeight: '24px' }}
                  >
                    {TILECREATOR_COLOUR_LABEL}
                  </label>
                  <ColourButton
                    colour={this.props.backgroundColour}
                    attribute={'backgroundColour'}
                    updateStateValue={this.props.updateStateValue}
                  />
                </div>
                <div className={'tile-colour-button'}>
                  <label className={'form-label'}>
                    {TILECREATOR_FONT_LABEL}
                  </label>
                  <ColourButton
                    colour={this.props.fontColour}
                    attribute={'fontColour'}
                    updateStateValue={this.props.updateStateValue}
                  />
                </div>
              </div>
            </div>
            <div className={'tile-favicon-container'}>
              <div className={'tile-favicon-select'}>
                <span>
                  <label className={'form-label'}>{'Display favicon:'}</label>
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
          </div>
        </div>
        <div className={'tile-colour-bottom'}>
          <div
            className={'tile-colour-preview'}
            style={{
              backgroundColor: this.props.backgroundColour,
              color: this.props.fontColour,
            }}
          >
            <span>{TILECREATOR_COLOUR_PREVIEW}</span>
          </div>
        </div>
      </div>
    )
  }
}
