import * as React from 'react'
import './ToggleButton.scss'

interface IProps {
  keys: string[]
  labels: string[]
  selectedKey?: string
  handleSelectionCallback: (label: string) => void
}

interface IState {
  selectedKey: string
}

/**
 * A button component which acts as a toggle between several options.
 *
 * One, and only one, of the options must be selected at all times.
 *
 * This component requires a labels prop be passed in to define the label text for each button.
 * handleSelectionCallback must also be passed in. It is passed the label which was selected on a
 * click event and must handle the logic of switching the button state.
 *
 * It is assumed that the keys are distinct and that the index of each key corresponds to its label.
 */
export class ToggleButton extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      selectedKey:
        props.selectedKey !== undefined &&
        props.keys.includes(props.selectedKey)
          ? props.selectedKey
          : props.keys[0],
    }
  }

  /**
   * Handles the selection of one of the buttons.
   * @param {string} key The key of the button which is selected.
   */
  handleSelection = (key: string) => {
    this.setState({ selectedKey: key })
    this.props.handleSelectionCallback(key)
  }

  /**
   * Returns the class name for a toggle section based on whether it is the currently selected label.
   * @param {string} key The key of the button which is being checked.
   */
  getClassname = (key: string) => {
    return key === this.state.selectedKey
      ? 'toggle-section-selected'
      : 'toggle-section-unselected'
  }

  render() {
    return (
      <div className={'toggle-wrapper'}>
        {this.props.keys.map((key, index) => (
          <div
            key={key}
            className={this.getClassname(key)}
            onClick={() => this.handleSelection(key)}
          >
            {this.props.labels[index]}
          </div>
        ))}
      </div>
    )
  }
}
