import { ToggleButton } from 'components/ui/elements/ToggleButton'
import {
  CANCEL_BUTTON_TEXT,
  EDITOR_TOGGLE_COLOUR,
  EDITOR_TOGGLE_GRADIENT,
  EDITOR_TOGGLE_IMAGE,
  SAVE_BUTTON_TEXT,
  TILE_EDITOR_CREATE_HEADER,
  TILE_EDITOR_EDIT_HEADER,
} from 'constants/strings'
import { ColourConfig } from 'modals/editors/ColourConfig'
import { GradientConfig } from 'modals/editors/GradientConfig'
import { ImageConfig } from 'modals/editors/ImageConfig'
import { LinkConfig } from 'modals/editors/LinkConfig'
import { TextConfig } from 'modals/editors/TextConfig'
import { emptyTile, ITile } from 'models/newtab'
import * as React from 'react'
import { RGBColor } from 'react-color'
import Modal from 'react-modal'
import './TileEditor.scss'

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
  displayMode: 'colour' | 'gradient' | 'image'
  backgroundColour: RGBColor
  fontColour: RGBColor
  fontSize: string
  gradient: {
    type: 'linear' | 'radial'
    startColour: RGBColor
    endColour: RGBColor
    angle: string
  }
  favicon: boolean
  image: string
}

export class TileEditor extends React.Component<IProps, IState> {
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
   * Updates the value of the gradient definition.
   * @param {'linear' | 'radial'} type the type of gradient
   * @param {RGBColor} startColour the starting colour of the gradient
   * @param {RGBColor} endColour the ending colour of the gradient
   * @param {string} angle the direction of the gradient, used for linear gradients
   */
  updateGradientValue = (gradient: {
    type: 'linear' | 'radial'
    startColour: RGBColor
    endColour: RGBColor
    angle: string
  }) => {
    this.setState(prevState => ({
      ...prevState,
      gradient,
    }))
  }

  /**
   * Updates the value of the favicon state property.
   * @param {boolean} value the value to set
   */
  updateFaviconValue = (value: boolean) => {
    this.setState({ favicon: value })
  }

  /**
   * Changes the state of the toggle button.
   * @param {'colour' | 'gradient' | 'image'} key the key of the button which is selected.
   */
  handleSelectionCallback = (key: 'colour' | 'gradient' | 'image') => {
    this.setState({ displayMode: key })
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

  /**
   * Returns the appropriate display config based on the current display mode.
   */
  getDisplayConfig = () => {
    if (this.state.displayMode === 'colour') {
      return (
        <ColourConfig
          url={this.state.url}
          backgroundColour={this.state.backgroundColour}
          fontColour={this.state.fontColour}
          fontSize={this.state.fontSize}
          favicon={this.state.favicon}
          updateColourValue={this.updateColourValue}
        />
      )
    } else if (this.state.displayMode === 'gradient') {
      return (
        <GradientConfig
          url={this.state.url}
          gradient={this.state.gradient}
          fontColour={this.state.fontColour}
          fontSize={this.state.fontSize}
          favicon={this.state.favicon}
          updateGradientValue={this.updateGradientValue}
        />
      )
    } else {
      return (
        <ImageConfig
          url={this.state.url}
          image={this.state.image}
          fontColour={this.state.fontColour}
          fontSize={this.state.fontSize}
          favicon={this.state.favicon}
          updateStateValue={this.updateStateValue}
        />
      )
    }
  }

  render() {
    const header = this.props.edit
      ? TILE_EDITOR_EDIT_HEADER
      : TILE_EDITOR_CREATE_HEADER

    return (
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={this.props.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        contentLabel="Tile Editor Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
          content: {
            width: '500px',
            height: '720px',
            margin: 'auto',
          },
        }}
      >
        <div className={'editor-container'}>
          <h2 className={'header'}>{header}</h2>
          <LinkConfig
            updateStateValue={this.updateStateValue}
            handleKeyPress={this.handleKeyPress}
            url={this.state.url}
            name={this.state.name}
          />
          <TextConfig
            updateStateValue={this.updateStateValue}
            updateColourValue={this.updateColourValue}
            updateFaviconValue={this.updateFaviconValue}
            handleKeyPress={this.handleKeyPress}
            fontColour={this.state.fontColour}
            fontSize={this.state.fontSize}
            favicon={this.state.favicon}
          />
          <div className={'display-config-container'}>
            <ToggleButton
              labels={[
                EDITOR_TOGGLE_COLOUR,
                EDITOR_TOGGLE_GRADIENT,
                EDITOR_TOGGLE_IMAGE,
              ]}
              keys={['colour', 'gradient', 'image']}
              selectedKey={this.state.displayMode}
              handleSelectionCallback={this.handleSelectionCallback}
            />
            {this.getDisplayConfig()}
          </div>
          <div className={'editor-end-buttons'}>
            <button
              key={'cancel'}
              className={'editor-cancel-button'}
              onClick={this.props.handleCloseModal}
            >
              {CANCEL_BUTTON_TEXT}
            </button>
            <button
              key={'save'}
              className={'editor-save-button'}
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
