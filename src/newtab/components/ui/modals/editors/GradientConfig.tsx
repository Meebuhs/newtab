import { ColourButton } from 'components/ui/elements/ColourButton'
import { Dropdown } from 'components/ui/elements/Dropdown'
import {
  EDITOR_GRADIENT_ANGLE_LABEL,
  EDITOR_GRADIENT_END_COLOUR_LABEL,
  EDITOR_GRADIENT_START_COLOUR_LABEL,
  EDITOR_GRADIENT_TYPE_LABEL,
} from 'constants/strings'
import * as React from 'react'
import { RGBColor } from 'react-color'
import './GradientConfig.scss'

interface IProps {
  updateGradientValue: (gradient: {
    type: 'linear' | 'radial'
    startColour: RGBColor
    endColour: RGBColor
    angle: string
  }) => void
  gradient: {
    type: 'linear' | 'radial'
    startColour: RGBColor
    endColour: RGBColor
    angle: string
  }
}

export class GradientConfig extends React.Component<IProps, {}> {
  /**
   * Updates the value of the given gradient colour attribute.
   * @param {'startColour' | 'endColour`'} attribute the gradient colour attribute to update
   * @param {RGBColor} value the value to set
   */
  updateColourValue = (
    attribute: 'startColour' | 'endColour',
    value: RGBColor
  ) => {
    this.props.updateGradientValue({
      ...this.props.gradient,
      [attribute]: value,
    })
  }

  /**
   * Updates the gradient type.
   * @param {'linear' | 'radial'} type the new type of gradient.
   */
  updateGradientType = (value: 'linear' | 'radial') => {
    this.props.updateGradientValue({
      ...this.props.gradient,
      type: value,
    })
  }

  /**
   * Updates the gradient angle.
   * @param {string} type The angle of the gradient.
   */
  updateGradientAngle = (value: string) => {
    this.props.updateGradientValue({
      ...this.props.gradient,
      angle: value,
    })
  }

  render() {
    return (
      <div className={'gradient-config-container'}>
        <div className={'gradient-select-container'}>
          <div className={'gradient-colour-select'}>
            <div className={'gradient-colours-container'}>
              <div className={'gradient-colour-container'}>
                <label
                  className={'gradient-config-form-label'}
                  style={{ lineHeight: '24px' }}
                >
                  {EDITOR_GRADIENT_START_COLOUR_LABEL}
                </label>
                <ColourButton
                  colour={this.props.gradient.startColour}
                  attribute={'startColour'}
                  updateColourValue={this.updateColourValue}
                />
              </div>
              <div className={'gradient-colour-container'}>
                <label className={'gradient-config-form-label'}>
                  {EDITOR_GRADIENT_END_COLOUR_LABEL}
                </label>
                <ColourButton
                  colour={this.props.gradient.endColour}
                  attribute={'endColour'}
                  updateColourValue={this.updateColourValue}
                />
              </div>
            </div>
          </div>
          <div className={'gradient-detail-select'}>
            <div className={'gradient-details-container'}>
              <div className={'gradient-detail-container'}>
                <label
                  className={'gradient-config-form-label'}
                  style={{ lineHeight: '24px' }}
                >
                  {EDITOR_GRADIENT_TYPE_LABEL}
                </label>
                <div className={'gradient-config-dropdown-container'}>
                  <Dropdown
                    items={['linear', 'radial']}
                    selected={this.props.gradient.type}
                    handleSelectionCallback={this.updateGradientType}
                  />
                </div>
              </div>
              {this.props.gradient.type === 'radial' ? null : (
                <div className={'gradient-detail-container'}>
                  <label
                    className={'gradient-config-form-label'}
                    style={{ lineHeight: '24px' }}
                  >
                    {EDITOR_GRADIENT_ANGLE_LABEL}
                  </label>
                  <div className={'gradient-config-dropdown-container'}>
                    <Dropdown
                      items={['0', '15', '30', '45', '60', '75', '90']}
                      selected={this.props.gradient.angle}
                      handleSelectionCallback={this.updateGradientAngle}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
