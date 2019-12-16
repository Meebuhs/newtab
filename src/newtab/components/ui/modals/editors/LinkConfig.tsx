import {
  TILE_EDITOR_NAME_LABEL,
  TILE_EDITOR_URL_LABEL,
} from 'constants/strings'
import { ITile } from 'models/newtab'
import * as React from 'react'
import './LinkConfig.scss'

interface IProps {
  handleKeyPress: (event: any) => void
  updateStateValue: (attribute: keyof ITile, value: string) => void
  url: string
  name: string
}

export class LinkConfig extends React.Component<IProps, {}> {
  render() {
    return (
      <div className={'link-config-container'}>
        <label className={'link-config-form-label'}>
          {TILE_EDITOR_URL_LABEL}
        </label>
        <input
          type={'text'}
          className={'link-config-text-input'}
          value={this.props.url}
          onKeyPress={this.props.handleKeyPress}
          autoFocus={true}
          onChange={event =>
            this.props.updateStateValue('url', event.target.value)
          }
        />
        <label className={'link-config-form-label'}>
          {TILE_EDITOR_NAME_LABEL}
        </label>
        <input
          type={'text'}
          className={'link-config-text-input'}
          value={this.props.name}
          onKeyPress={this.props.handleKeyPress}
          onChange={event =>
            this.props.updateStateValue('name', event.target.value)
          }
        />
      </div>
    )
  }
}
