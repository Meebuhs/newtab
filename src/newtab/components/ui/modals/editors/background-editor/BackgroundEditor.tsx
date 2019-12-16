import { ToggleButton } from 'components/ui/elements/ToggleButton'
import {
  BACKGROUND_EDITOR_HEADER,
  CANCEL_BUTTON_TEXT,
  EDITOR_TOGGLE_COLOUR,
  EDITOR_TOGGLE_GRADIENT,
  EDITOR_TOGGLE_IMAGE,
  SAVE_BUTTON_TEXT,
} from 'constants/strings'
import { ColourConfig } from 'modals/editors/ColourConfig'
import { GradientConfig } from 'modals/editors/GradientConfig'
import { ImageConfig } from 'modals/editors/ImageConfig'
import { IBackground } from 'models/newtab'
import * as React from 'react'
import { RGBColor } from 'react-color'
import Modal from 'react-modal'
import './BackgroundEditor.scss'

interface IProps {
  showModal: boolean
  background: IBackground
  handleCloseModal: () => void
  handleSaveModal: (background: IBackground) => void
}

interface IState {
  displayMode: 'colour' | 'gradient' | 'image'
  backgroundColour: RGBColor
  gradient: {
    type: 'linear' | 'radial'
    startColour: RGBColor
    endColour: RGBColor
    angle: string
  }
  image: string
}

export class BackgroundEditor extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      ...props.background,
    }
  }

  /**
   * Binds saving and closing the modal to the enter key.
   * @param {any} event The keypress event.
   */
  handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      this.props.handleSaveModal({ ...this.state })
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
   * Changes the state of the toggle button.
   * @param {'colour' | 'gradient' | 'image'} key the key of the button which is selected.
   */
  handleSelectionCallback = (key: 'colour' | 'gradient' | 'image') => {
    this.setState({ displayMode: key })
  }

  /**
   * Returns the appropriate display config based on the current display mode.
   */
  getDisplayConfig = () => {
    if (this.state.displayMode === 'colour') {
      return (
        <ColourConfig
          backgroundColour={this.state.backgroundColour}
          updateColourValue={this.updateColourValue}
        />
      )
    } else if (this.state.displayMode === 'gradient') {
      return (
        <GradientConfig
          gradient={this.state.gradient}
          updateGradientValue={this.updateGradientValue}
        />
      )
    } else {
      return <ImageConfig updateStateValue={this.updateStateValue} />
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={this.props.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        contentLabel="Background Editor Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
          content: {
            width: '500px',
            height: '300px',
            margin: 'auto',
          },
        }}
      >
        <div className={'editor-container'}>
          <h2 className={'header'}>{BACKGROUND_EDITOR_HEADER}</h2>
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
            onClick={() => this.props.handleSaveModal({ ...this.state })}
          >
            {SAVE_BUTTON_TEXT}
          </button>
        </div>
      </Modal>
    )
  }
}
