import * as React from 'react'
import './ToggleButton.scss'

interface IProps {
  leftLabel: string
  rightLabel: string
  toggled: boolean
  handleToggleCallback: (side: string) => void
}

interface IState {
  toggled: boolean
}

/**
 * A button component which acts as a toggle between two options.
 *
 * One, and only one, of the two options must be selected at all times.
 *
 * This component requires leftLabel and rightLabel props be passed in to define the label text for each button.
 * handleToggleCallback must also be passed in. It is passed either 'left' or 'right' on a click event and must handle
 * the logic of switching the button state.
 */
export class ToggleButton extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      toggled: props.toggled,
    }
  }

  /**
   * Handles the selection of one of the button's sides.
   * @param {'left' | 'right'} side The side which is selected.
   */
  handleToggleClick = (side: 'left' | 'right') => {
    if (side === 'left') {
      this.setState({ toggled: false })
    } else {
      this.setState({ toggled: true })
    }
    this.props.handleToggleCallback(side)
  }

  render() {
    const leftClass = this.state.toggled
      ? 'toggle-section-unselected'
      : 'toggle-section-selected'
    const rightClass = this.state.toggled
      ? 'toggle-section-selected'
      : 'toggle-section-unselected'
    return (
      <div className={'toggle-wrapper'}>
        <div
          className={leftClass}
          onClick={() => this.handleToggleClick('left')}
        >
          {this.props.leftLabel}
        </div>
        <div
          className={rightClass}
          onClick={() => this.handleToggleClick('right')}
        >
          {this.props.rightLabel}
        </div>
      </div>
    )
  }
}
