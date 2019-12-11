import { ToggleButton } from 'components/ui/ToggleButton'
import {
  CANCEL_BUTTON_TEXT,
  SAVE_BUTTON_TEXT,
  TILECREATOR_CREATE_HEADER,
  TILECREATOR_EDIT_HEADER,
  TILECREATOR_TOGGLE_COLOUR,
  TILECREATOR_TOGGLE_IMAGE,
} from 'constants/strings'
import { TileBackgroundConfig } from 'modals/tile-creator/TileBackgroundConfig'
import { emptyTile, ITile } from 'models/newtab'
import * as React from 'react'
import { RGBColor } from 'react-color'
import Modal from 'react-modal'
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
  backgroundColour: RGBColor
  fontColour: RGBColor
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
   * Updates the value of the given state colour attribute.
   * @param {'backgroundColour' | 'fontColour'} attribute the state colour attribute to update
   * @param {RGBColor} value the value to set
   */
  updateColourValue = (
    attribute: 'backgroundColour' | 'fontColour',
    value: RGBColor
  ) => {
    this.setState(prevState => ({ ...prevState, [attribute]: value }))
  }

  /**
   * Updates the value of the favicon state property.
   * @param {boolean} value the value to set
   */
  updateFaviconValue = (value: boolean) => {
    this.setState({ favicon: value })
  }

  /**
   * Changes the state of the toggle button. The left side of the toggle button is the colour editor.
   * @param {string} side the editor which is being displayed.
   */
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
            leftLabel={TILECREATOR_TOGGLE_COLOUR}
            rightLabel={TILECREATOR_TOGGLE_IMAGE}
            toggled={this.state.displayMode === 'image'}
            handleToggleCallback={this.handleToggleCallback}
          />
          <TileBackgroundConfig
            {...this.state}
            updateFaviconValue={this.updateFaviconValue}
            updateStateValue={this.updateStateValue}
            updateColourValue={this.updateColourValue}
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
