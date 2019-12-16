import * as React from 'react'
import { ChromePicker, ColorResult, RGBColor } from 'react-color'
import './ColourButton.scss'

interface IProps {
  colour: RGBColor
  attribute: string
  updateColourValue: (attribute: string, value: RGBColor) => void
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
    // If alpha undefined or outside [0, 1], set it to 1
    let alpha = colour.rgb.a === undefined ? 1 : colour.rgb.a
    alpha = alpha > 1 || alpha < 0 ? 1 : alpha
    const fixedColour: RGBColor = {
      r: colour.rgb.r,
      g: colour.rgb.g,
      b: colour.rgb.b,
      a: alpha,
    }
    this.props.updateColourValue(this.props.attribute, fixedColour)
  }

  render() {
    const colourString = `rgba(${this.props.colour.r}, ${this.props.colour.g}, ${this.props.colour.b}, ${this.props.colour.a})`

    return (
      <>
        <div className={'colour-button'} onClick={this.handleOpenColourPicker}>
          <div
            className={'colour-preview'}
            style={{ backgroundColor: colourString }}
          />
        </div>
        {this.state.showColourPicker ? (
          <div className={'popover'}>
            <ChromePicker
              color={this.props.colour}
              onChange={this.handleChange}
              disableAlpha={false}
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
