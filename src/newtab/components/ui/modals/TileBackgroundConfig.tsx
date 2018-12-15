import * as React from 'react'
import { TILECREATOR_BACKGROUND_PREVIEW } from '../../../constants/strings'
import { ITile } from '../../../models/newtab'
import { ColourButton } from '../ColourButton'
import './TileBackgroundConfig.scss'

interface IProps {
  updateStateValue: (attribute: keyof ITile, value: string) => void
  updateFaviconValue: (value: boolean) => void
  displayMode: 'colour' | 'image'
  backgroundColour: string
  fontColour: string
  favicon: boolean
  image: string
}

export class TileBackgroundConfig extends React.Component<IProps, {}> {
  render() {
    return (
      <>
        {this.props.displayMode === 'colour' ? (
          <div className={'tile-background-config-container'}>
            <div className={'tile-background-config-top'}>
              <div className={'tile-background-colour-container'}>
                <div className={'tile-background-colour-select'}>
                  <div className={'tile-background-colour-buttons'}>
                    <div className={'tile-background-colour-button'}>
                      <label
                        className={'form-label'}
                        style={{ lineHeight: '24px' }}
                      >
                        {'Tile colour:'}
                      </label>
                      <ColourButton
                        colour={this.props.backgroundColour}
                        attribute={'backgroundColour'}
                        updateStateValue={this.props.updateStateValue}
                      />
                    </div>
                    <div className={'tile-background-colour-button'}>
                      <label className={'form-label'}>{'Font colour:'}</label>
                      <ColourButton
                        colour={this.props.fontColour}
                        attribute={'fontColour'}
                        updateStateValue={this.props.updateStateValue}
                      />
                    </div>
                  </div>
                </div>
                <div className={'tile-background-favicon-select'}>
                  <div className={'tile-background-favicon-container'}>
                    <span>
                      <label className={'form-label'}>
                        {'Display favicon:'}
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
            </div>
            <div className={'tile-background-config-bottom'}>
              <div
                className={'tile-background-preview'}
                style={{
                  backgroundColor: this.props.backgroundColour,
                  color: this.props.fontColour,
                }}
              >
                <span>{TILECREATOR_BACKGROUND_PREVIEW}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={'tile-image-config-container'}>
            <div className={'tile-image-config-top'} />
            <div className={'tile-image-config-bottom'}>
              <span>Image</span>
            </div>
          </div>
        )}
      </>
    )
  }
}
