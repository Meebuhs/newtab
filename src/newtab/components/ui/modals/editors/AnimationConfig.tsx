import { Dropdown } from 'components/ui/elements/Dropdown'
import { EDITOR_ANIMATION_SELECT } from 'constants/strings'
import { IBackground } from 'models/newtab'
import * as React from 'react'
import './AnimationConfig.scss'

interface IProps {
  updateStateValue: (attribute: keyof IBackground, value: string) => void
  animation: string
}

export class AnimationConfig extends React.Component<IProps, {}> {
  /**
   * Updates the selected animation.
   * @param {string} animation The animation preset to select.
   */
  updateAnimationSelection = (animation: string) => {
    this.props.updateStateValue('animation', animation)
  }

  render() {
    return (
      <div className={'animation-config-container'}>
        <div className={'animation-select-container'}>
          <label className={'animation-config-form-label'}>
            {EDITOR_ANIMATION_SELECT}
          </label>
          <div className={'animation-dropdown-container'}>
            <Dropdown
              items={['network']}
              selected={this.props.animation}
              handleSelectionCallback={this.updateAnimationSelection}
            />
          </div>
        </div>
      </div>
    )
  }
}
