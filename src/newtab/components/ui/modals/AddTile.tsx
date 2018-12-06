import * as React from 'react'
import Modal from 'react-modal'
import {
  ADDTILE_HEADER,
  ADDTILE_TEXT,
  CANCEL_BUTTON_TEXT,
  SAVE_BUTTON_TEXT,
} from '../../../constants/strings'
import './AddTile.scss'

interface IProps {
  showModal: boolean
  handleCloseModal: () => void
  handleSaveModal: (url: string) => void
}

interface IState {
  inputText: string
}

export class AddTile extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { inputText: '' }
  }

  /**
   * Binds saving and closing the modal to the enter key.
   * @param event The keypress event.
   */
  handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      this.addTile()
    }
  }

  updateInputText = (value: string) => {
    this.setState({ inputText: value })
  }

  addTile = () => {
    this.props.handleSaveModal(this.state.inputText)
    this.setState({ inputText: '' })
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={this.props.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        contentLabel="Add Tile Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
          content: {
            width: '500px',
            height: '210px',
            margin: 'auto',
          },
        }}
      >
        <div className={'container'}>
          <h2 className={'header'}>{ADDTILE_HEADER}</h2>
          <div className={'text'}>{ADDTILE_TEXT}</div>
          <input
            type={'text'}
            className={'text-input'}
            value={this.state.inputText}
            onKeyPress={this.handleKeyPress}
            autoFocus={true}
            onChange={event => this.updateInputText(event.target.value)}
          />
          <div className={'nav-buttons'}>
            <button
              key={'cancel'}
              className={'cancel-button'}
              onClick={this.props.handleCloseModal}
            >
              {CANCEL_BUTTON_TEXT}
            </button>
            <button
              key={'save'}
              className={'save-button'}
              onClick={this.addTile}
            >
              {SAVE_BUTTON_TEXT}
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}
