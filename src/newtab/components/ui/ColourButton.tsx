import * as React from 'react'
import { ChromePicker, Color, ColorResult } from 'react-color'
import './ColourButton.scss'

interface IProps {
  colour: string
  attribute: string
  updateStateValue: (attribute: string, value: string) => void
}

interface IState {
  showColourPicker: boolean
}

export class ColourButton extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      showColourPicker: false,
    }
  }

  /**
   * Opens the colour picker modal.
   */
  handleOpenColourPicker = () => {
    this.setState({ showColourPicker: true })
  }

  /**
   * Closes the colour picker modal.
   */
  handleCloseColourPicker = () => {
    this.setState({ showColourPicker: false })
  }

  /**
   * Updates the colour value for the attribute passed through props.
   * @param {ColorResult} colour the colour result of the picker
   */
  handleChange = (colour: ColorResult) => {
    this.props.updateStateValue(this.props.attribute, colour.hex)
  }

  render() {
    return (
      <>
        <div className={'colour-button'} onClick={this.handleOpenColourPicker}>
          <div
            className={'colour-preview'}
            style={{ backgroundColor: this.props.colour.toString() }}
          />
        </div>
        {this.state.showColourPicker ? (
          <div className={'popover'}>
            <ChromePicker
              color={this.props.colour}
              onChange={this.handleChange}
              disableAlpha={true}
            />
          </div>
        ) : null}
        {this.state.showColourPicker ? (
          <div className={'cover'} onClick={this.handleCloseColourPicker} />
        ) : null}
      </>
    )
  }
}
