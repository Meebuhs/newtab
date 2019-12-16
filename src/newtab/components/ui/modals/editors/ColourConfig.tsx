import { ColourButton } from 'components/ui/elements/ColourButton'
import { EDITOR_BACKGROUND_COLOUR_LABEL } from 'constants/strings'
import * as React from 'react'
import { RGBColor } from 'react-color'
import './ColourConfig.scss'

interface IProps {
  updateColourValue: (attribute: string, value: RGBColor) => void
  backgroundColour: RGBColor
}

export class ColourConfig extends React.Component<IProps, {}> {
  render() {
    return (
      <div className={'colour-config-container'}>
        <div className={'colour-select-container'}>
          <div className={'colour-select'}>
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
    )
  }
}
