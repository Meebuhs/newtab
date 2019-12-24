import { Checkbox } from 'components/ui/elements/Checkbox'
import { ColourButton } from 'components/ui/elements/ColourButton'
import { Dropdown } from 'components/ui/elements/Dropdown'
import {
  EDITOR_FAVICON_LABEL,
  EDITOR_FONT_COLOUR_LABEL,
  EDITOR_FONT_SIZE_LABEL,
} from 'constants/strings'
import { FONT_SIZES } from 'constants/types'
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

  updateFaviconValue = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    if (event.target) {
      this.props.updateFaviconValue(!this.props.favicon)
    }
  }

  render() {
    return (
      <div className={'text-config-container'}>
        <div className={'font-colour-container'}>
          <div className={'colour-button-container'}>
            <label className={'text-config-form-label'}>
              {EDITOR_FONT_COLOUR_LABEL}
            </label>
            <ColourButton
              colour={this.props.fontColour}
              alpha={true}
              attribute={'fontColour'}
              updateColourValue={this.props.updateColourValue}
            />
          </div>
        </div>
        <div className={'font-size-container'}>
          <label className={'text-config-form-label'}>
            {EDITOR_FONT_SIZE_LABEL}
          </label>
          <div className={'font-size-dropdown-container'}>
            <Dropdown
              items={FONT_SIZES}
              selected={this.props.fontSize.toString()}
              handleSelectionCallback={this.updateFontSize}
            />
          </div>
        </div>
        <div className={'favicon-config-container'}>
          <label className={'text-config-form-label'}>
            {EDITOR_FAVICON_LABEL}
          </label>
          <Checkbox
            checked={this.props.favicon}
            handleToggle={this.updateFaviconValue}
          />
        </div>
      </div>
    )
  }
}
