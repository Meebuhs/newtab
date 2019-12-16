import { ColourButton } from 'components/ui/elements/ColourButton'
import { Dropdown } from 'components/ui/elements/Dropdown'
import {
  EDITOR_FAVICON_LABEL,
  EDITOR_FONT_COLOUR_LABEL,
  EDITOR_FONT_SIZE_LABEL,
} from 'constants/strings'
import { ITile } from 'models/newtab'
import * as React from 'react'
import { RGBColor } from 'react-color'
import './TextConfig.scss'

interface IProps {
  updateStateValue: (attribute: keyof ITile, value: string) => void
  updateColourValue: (attribute: string, value: RGBColor) => void
  updateFaviconValue: (value: boolean) => void
  handleKeyPress: (event: any) => void
  fontColour: RGBColor
  fontSize: string
  favicon: boolean
}

export class TextConfig extends React.Component<IProps, {}> {
  updateFontSize = (size: string) => {
    this.props.updateStateValue('fontSize', size)
  }

  render() {
    return (
      <div className={'text-config-container'}>
        <div className={'font-config-container'}>
          <div className={'font-config-elements'}>
            <div className={'colour-button-container'}>
              <label className={'text-config-form-label'}>
                {EDITOR_FONT_COLOUR_LABEL}
              </label>
              <ColourButton
                colour={this.props.fontColour}
                attribute={'fontColour'}
                updateColourValue={this.props.updateColourValue}
              />
            </div>
            <div className={'font-size-container'}>
              <label className={'text-config-form-label'}>
                {EDITOR_FONT_SIZE_LABEL}
              </label>
              <div className={'font-size-dropdown-container'}>
                <Dropdown
                  items={['8', '10', '12', '14', '16', '18', '20']}
                  selected={this.props.fontSize.toString()}
                  handleSelectionCallback={this.updateFontSize}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={'favicon-config-container'}>
          <div className={'favicon-config-select'}>
            <span>
              <label className={'text-config-form-label'}>
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
      </div>
    )
  }
}
