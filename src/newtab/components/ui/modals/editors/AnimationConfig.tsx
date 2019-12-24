import { Checkbox } from 'components/ui/elements/Checkbox'
import { ColourButton } from 'components/ui/elements/ColourButton'
import { Dropdown } from 'components/ui/elements/Dropdown'
import {
  EDITOR_ANIMATION_BACKGROUND_COLOUR,
  EDITOR_ANIMATION_COUNT,
  EDITOR_ANIMATION_PARTICLE_COLOUR,
  EDITOR_ANIMATION_REPEL,
  EDITOR_ANIMATION_SELECT,
} from 'constants/strings'
import {
  ANIMATION_PARTICLE_COUNTS,
  ANIMATION_PRESETS,
  AnimationPreset,
} from 'constants/types'
import * as React from 'react'
import { RGBColor } from 'react-color'
import './AnimationConfig.scss'

interface IProps {
  updateAnimationValue: (animation: {
    preset: AnimationPreset
    count: string
    backgroundColour: RGBColor
    particleColour: RGBColor
    repel: boolean
  }) => void
  animation: {
    preset: AnimationPreset
    count: string
    backgroundColour: RGBColor
    particleColour: RGBColor
    repel: boolean
  }
}

export class AnimationConfig extends React.Component<IProps, {}> {
  /**
   * Updates the selected animation preset.
   * @param {AnimationPreset} preset The animation preset to select.
   */
  updateAnimationSelection = (preset: AnimationPreset) => {
    this.props.updateAnimationValue({ ...this.props.animation, preset })
  }

  /**
   * Updates the animation particle count.
   * @param {string} count the number of particles to render.
   */
  updateCount = (count: string) => {
    this.props.updateAnimationValue({ ...this.props.animation, count })
  }

  /**
   * Updates the value of the given state colour attribute.
   * @param {'backgroundColour' | 'particleColour'} attribute the state colour attribute to update.
   * @param {RGBColor} value the value to set.
   */
  updateColourValue = (
    attribute: 'backgroundColour' | 'particleColour',
    value: RGBColor
  ) => {
    this.props.updateAnimationValue({
      ...this.props.animation,
      [attribute]: value,
    })
  }

  /**
   * Updates the animation repel value.
   * @param {boolean} repel whether the the particles will be repelled by the mouse.
   */
  updateRepelValue = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    if (event.target) {
      this.props.updateAnimationValue({
        ...this.props.animation,
        repel: !this.props.animation.repel,
      })
    }
  }

  render() {
    return (
      <div className={'animation-config-container'}>
        <div className={'animation-particle-count-config'}>
          <label className={'form-label'}>{EDITOR_ANIMATION_COUNT}</label>
          <div className={'animation-dropdown-container'}>
            <Dropdown
              items={ANIMATION_PARTICLE_COUNTS}
              selected={this.props.animation.count}
              handleSelectionCallback={this.updateCount}
            />
          </div>
        </div>
        <div className={'animation-preset-config'}>
          <label className={'form-label'}>{EDITOR_ANIMATION_SELECT}</label>
          <div className={'animation-dropdown-container'}>
            <Dropdown
              items={ANIMATION_PRESETS}
              selected={this.props.animation.preset}
              handleSelectionCallback={this.updateAnimationSelection}
            />
          </div>
        </div>
        <div className={'animation-background-colour-config'}>
          <label className={'form-label'}>
            {EDITOR_ANIMATION_BACKGROUND_COLOUR}
          </label>
          <ColourButton
            colour={this.props.animation.backgroundColour}
            alpha={false}
            attribute={'backgroundColour'}
            updateColourValue={this.updateColourValue}
          />
        </div>
        <div className={'animation-particle-colour-config'}>
          <label className={'form-label'}>
            {EDITOR_ANIMATION_PARTICLE_COLOUR}
          </label>
          <ColourButton
            colour={this.props.animation.particleColour}
            alpha={false}
            attribute={'particleColour'}
            updateColourValue={this.updateColourValue}
          />
        </div>
        <div className={'animation-repel-config'}>
          <label className={'form-label'}>{EDITOR_ANIMATION_REPEL}</label>
          <Checkbox
            checked={this.props.animation.repel}
            handleToggle={this.updateRepelValue}
          />
        </div>
      </div>
    )
  }
}
