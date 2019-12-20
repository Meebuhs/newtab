import { IBackground, ITile } from 'models/newtab'
import * as React from 'react'
import './ImageConfig.scss'

interface IProps {
  updateStateValue: (
    attribute: keyof IBackground | keyof ITile,
    value: string
  ) => void
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
          getBase64(file).then((base64: IBase64Result) => {
            this.props.updateStateValue('image', base64.result)
          })
        }
      }
    }
  }

  render() {
    return (
      <div className={'image-config-container'}>
        <div className={'image-select-container'}>
          <input type="file" id="image-upload" onChange={this.imageUpload} />
        </div>
      </div>
    )
  }
}
