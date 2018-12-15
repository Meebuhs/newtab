import * as React from 'react'
import Modal from 'react-modal'
import {
  CANCEL_BUTTON_TEXT,
  SAVE_BUTTON_TEXT,
  TILECREATOR_CREATE_HEADER,
  TILECREATOR_EDIT_HEADER,
  TILECREATOR_TOGGLE_BACKGROUND,
  TILECREATOR_TOGGLE_IMAGE,
} from '../../../constants/strings'
import { emptyTile, ITile } from '../../../models/newtab'
import { ToggleButton } from '../ToggleButton'
import { TileBackgroundConfig } from './TileBackgroundConfig'
import './TileCreator.scss'

interface IProps {
  showModal: boolean
  tile: ITile
  edit: boolean
  handleCloseModal: () => void
  handleSaveModal: (tile: ITile) => void
}

interface IState {
  id: string
  name: string
  url: string
  displayMode: 'colour' | 'image'
  backgroundColour: string
  fontColour: string
  favicon: boolean
  image: string
}

export class TileCreator extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      ...props.tile,
    }
  }

  /**
   * Binds saving and closing the modal to the enter key.
   * @param {any} event The keypress event.
   */
  handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      this.finalise()
    }
  }

  /**
   * Updates the value of the given state attribute.
   * @param {keyof IState} attribute the state attribute to update
   * @param {string} value the value to set
   */
  updateStateValue = (attribute: keyof IState, value: string) => {
    this.setState(prevState => ({ ...prevState, [attribute]: value }))
  }

  /**
   * Updates the value of the favicon state property.
   * @param {boolean} value the value to set
   */
  updateFaviconValue = (value: boolean) => {
    this.setState({ favicon: value })
  }

  handleToggleCallback = (side: string) => {
    this.setState({ displayMode: side === 'left' ? 'colour' : 'image' })
  }

  /**
   * Uses the state information to add a tile to the grid.
   */
  finalise = () => {
    this.props.handleSaveModal({ ...this.state })
    if (!this.props.edit) {
      this.setState(emptyTile)
    }
  }

  render() {
    const header = this.props.edit
      ? TILECREATOR_EDIT_HEADER
      : TILECREATOR_CREATE_HEADER

    return (
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={this.props.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        contentLabel="Tile Creation Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
          content: {
            width: '500px',
            height: '620px',
            margin: 'auto',
          },
        }}
      >
        <div className={'tilecreator-container'}>
          <h2 className={'header'}>{header}</h2>
          <label className={'form-label'}>{'Tile url:'}</label>
          <input
            type={'text'}
            className={'text-input'}
            value={this.state.url}
            onKeyPress={this.handleKeyPress}
            autoFocus={true}
            onChange={event => this.updateStateValue('url', event.target.value)}
          />
          <label className={'form-label'}>{'Tile name:'}</label>
          <input
            type={'text'}
            className={'text-input'}
            value={this.state.name}
            onKeyPress={this.handleKeyPress}
            onChange={event =>
              this.updateStateValue('name', event.target.value)
            }
          />
          <ToggleButton
            leftLabel={TILECREATOR_TOGGLE_BACKGROUND}
            rightLabel={TILECREATOR_TOGGLE_IMAGE}
            handleToggleCallback={this.handleToggleCallback}
          />
          <TileBackgroundConfig
            {...this.state}
            updateFaviconValue={this.updateFaviconValue}
            updateStateValue={this.updateStateValue}
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
              onClick={this.finalise}
            >
              {SAVE_BUTTON_TEXT}
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}
