import { FILE_SELECT_BUTTON_TEXT } from 'constants/strings'
import { IFileSelectorEvent } from 'constants/types'
import { IBackground, ITile } from 'models/newtab'
import * as React from 'react'
import './ImageConfig.scss'

interface IProps {
  updateStateValue: (
    attribute: keyof IBackground | keyof ITile,
    value: string
  ) => void
}

interface IState {
  fileName: string
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

export class ImageConfig extends React.Component<IProps, IState> {
  fileSelector: HTMLInputElement

  constructor(props: IProps) {
    super(props)
    this.state = {
      fileName: '',
    }
  }

  componentDidMount() {
    this.initialiseFileInput()
  }

  /**
   * Initialises the file selector and reader.
   */
  initialiseFileInput = () => {
    this.fileSelector = this.buildFileSelector()
    this.setState({
      fileName: '',
    })
  }

  /**
   * Constructs and returns the file input element which accepts json file representations of activities.
   */
  buildFileSelector = () => {
    const fileSelector = document.createElement('input')
    fileSelector.setAttribute('type', 'file')
    fileSelector.setAttribute('accept', 'image/png,image/jpeg')
    fileSelector.addEventListener('change', this.imageUpload)
    return fileSelector
  }

  /**
   * Accepts a file upload and if it is an image, converts it for storage
   */
  imageUpload = (event: IFileSelectorEvent) => {
    if (event.target) {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0]
        this.setState({ fileName: file.name })
        if (file.type.match('image.*')) {
          getBase64(file).then((base64: IBase64Result) => {
            this.props.updateStateValue('image', base64.result)
          })
        }
      }
    }
  }

  /**
   * Button onclick event which triggers the file select.
   */
  handleFileSelect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    this.fileSelector.click()
  }

  render() {
    return (
      <div className={'image-config-container'}>
        <div className={'image-select-container'}>
          {this.state.fileName}
          <button
            key={'file-select'}
            className={'settings-file-button'}
            onClick={this.handleFileSelect}
          >
            {FILE_SELECT_BUTTON_TEXT}
          </button>
        </div>
      </div>
    )
  }
}
