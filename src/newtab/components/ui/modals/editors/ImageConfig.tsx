import { EDITOR_PREVIEW_LABEL } from 'constants/strings'
import { ITile } from 'models/newtab'
import * as React from 'react'
import { RGBColor } from 'react-color'
import { RGBColorToString } from 'utils/colour'
import { getFaviconURL } from 'utils/url'
import './ImageConfig.scss'

interface IProps {
  updateStateValue: (attribute: keyof ITile, value: string) => void
  url: string
  image: string
  fontColour: RGBColor
  fontSize: string
  favicon: boolean
}

interface IBase64Result {
  result: string
}

/**
 * Converts a file to its base64 representation.
 * @param file the image file to convert.
 */
const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve({ result: reader.result })
    reader.onerror = error => reject(error)
    reader.readAsDataURL(file)
  })
}

export class ImageConfig extends React.Component<IProps, {}> {
  /**
   * Accepts a file upload and if it is an image, converts it for storage
   */
  imageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        if (file.type.match('image.*')) {
          // tslint:disable-next-line
          getBase64(file).then((base64: IBase64Result) => {
            this.props.updateStateValue('image', base64.result)
          })
        }
      }
    }
  }

  render() {
    const { url, fontColour, fontSize, favicon } = this.props

    return (
      <div className={'image-config-container'}>
        <div className={'image-config-top'}>
          <div className={'image-select-container'}>
            <input type="file" id="image-upload" onChange={this.imageUpload} />
          </div>
        </div>
        <div className={'image-config-bottom'}>
          <div
            className={'image-config-preview'}
            style={{
              color: RGBColorToString(fontColour),
              fontSize: `${fontSize}px`,
            }}
          >
            {this.props.image === '' ? null : (
              <img className={'image'} src={this.props.image} />
            )}
            <div className="image-config-text">
              {favicon ? (
                <img className={'favicon'} src={getFaviconURL(url)} />
              ) : null}
              {EDITOR_PREVIEW_LABEL}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
