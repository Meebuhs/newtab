import * as React from 'react'
import Modal from 'react-modal'
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
          <h2 className={'header'}>Add a tile</h2>
          <div className={'text'}>
            Enter the url for a new tile and it will be added to the grid.
          </div>
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
              Cancel
            </button>
            <button
              key={'save'}
              className={'save-button'}
              onClick={this.addTile}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}
