import {
  SETTINGS_HEADER,
  SETTINGS_TOGGLE_LOAD,
  SETTINGS_TOGGLE_SAVE,
} from 'constants/strings'
import { SETTINGS_OPERATIONS, SettingsOperations } from 'constants/types'
import * as React from 'react'
import Modal from 'react-modal'
import { IGridState } from 'reducers/grid'
import { ToggleButton } from '../elements/ToggleButton'

interface IProps {
  showModal: boolean
  handleCloseModal: () => void
  handleSaveModal: (grid: IGridState) => void
}

interface IState {
  currentOperation: SettingsOperations
}

export class Settings extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      currentOperation: SETTINGS_OPERATIONS[0] as SettingsOperations,
    }
  }

  /**
   * Changes the state of the toggle button.
   * @param {SettingsOperations} key the key of the button which is selected.
   */
  handleSelectionCallback = (key: SettingsOperations) => {
    this.setState({ currentOperation: key })
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={this.props.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        contentLabel="Settings Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
          content: {
            width: '700px',
            height: '300px',
            margin: 'auto',
          },
        }}
      >
        <div className={'settings-container'}>
          <h2 className={'header'}>{SETTINGS_HEADER}</h2>
          <div className={'settings-content'}>
            <ToggleButton
              labels={[SETTINGS_TOGGLE_SAVE, SETTINGS_TOGGLE_LOAD]}
              keys={SETTINGS_OPERATIONS}
              selectedKey={this.state.currentOperation}
              handleSelectionCallback={this.handleSelectionCallback}
            />
          </div>
        </div>
      </Modal>
    )
  }
}
