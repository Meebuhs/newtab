import { TILECREATOR_IMAGE_SELECT } from 'constants/strings'
import { ITile } from 'models/newtab'
import * as React from 'react'
import './TileImageConfig.scss'

interface IProps {
  updateStateValue: (attribute: keyof ITile, value: string) => void
  image: string
}

export class TileImageBackgroundConfig extends React.Component<IProps, {}> {
  selectImage = () => {
    return
  }

  render() {
    return (
      <div className={'tile-image-container'}>
        <div className={'tile-image-top'}>
          <div className={'tile-image-select'}>
            <button
              key={'image-select'}
              className={'image-select-button'}
              onClick={this.selectImage}
            >
              {TILECREATOR_IMAGE_SELECT}
            </button>
          </div>
        </div>
        <div className={'tile-image-bottom'}>
          <div className={'tile-image-preview'}>
            <span>Image</span>
          </div>
        </div>
      </div>
    )
  }
}
