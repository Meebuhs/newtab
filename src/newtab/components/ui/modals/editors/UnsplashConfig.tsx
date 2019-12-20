import {
  EDITOR_UNSPLASH_SELECT,
  EDITOR_UNSPLASH_SELECT_SUB,
} from 'constants/strings'
import { IBackground } from 'models/newtab'
import * as React from 'react'
import './UnsplashConfig.scss'

interface IProps {
  updateStateValue: (attribute: keyof IBackground, value: string) => void
  handleKeyPress: (event: any) => void
  unsplashQuery: string
}

export class UnsplashConfig extends React.Component<IProps, {}> {
  render() {
    return (
      <div className={'unsplash-config-container'}>
        <div className={'unsplash-select-container'}>
          <label className={'unsplash-config-form-label'}>
            {EDITOR_UNSPLASH_SELECT}
          </label>
          <input
            type={'text'}
            className={'unsplash-config-text-input'}
            value={this.props.unsplashQuery}
            onKeyPress={this.props.handleKeyPress}
            autoFocus={true}
            onChange={event =>
              this.props.updateStateValue('unsplashQuery', event.target.value)
            }
          />
        </div>
        <div className={'unsplash-config-subtext-container'}>
          <label className={'unsplash-config-form-label'}>
            {EDITOR_UNSPLASH_SELECT_SUB}
          </label>
        </div>
      </div>
    )
  }
}
