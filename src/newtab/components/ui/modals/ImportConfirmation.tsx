import {
  CANCEL_BUTTON_TEXT,
  SAVE_BUTTON_TEXT,
  SETTINGS_IMPORT_CONFIRM_HEADER,
  SETTINGS_IMPORT_CONFIRM_LABEL,
  SETTINGS_VALID_FILE_LABEL,
} from 'constants/strings'
import * as React from 'react'
import Modal from 'react-modal'
import { IGridState } from 'reducers/grid'
import './ImportConfirmation.scss'

interface IProps {
  grid: IGridState
  showModal: boolean
  setModalVisibility: (visibility: boolean) => void
  importGrid: () => void
  missingProperties: string[]
}

export class ImportSettingsConfirmation extends React.Component<IProps, {}> {
  /**
   * Closes this modal before calling the load procedure.
   */
  importGrid = () => {
    this.props.setModalVisibility(false)
    this.props.importGrid()
  }

  constructPropertyString = () => {
    if (this.props.missingProperties.length === 1) {
      return this.props.missingProperties[0]
    } else {
      const lastItem = this.props.missingProperties.pop()
      return this.props.missingProperties.join(', ') + ' and ' + lastItem
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={() => this.props.setModalVisibility(false)}
        shouldCloseOnOverlayClick={true}
        contentLabel="Confirm Import Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
          content: {
            width: '400px',
            height: '250px',
            margin: 'auto',
          },
        }}
      >
        <div className={'import-confirmation-container'}>
          <h2 className={'header'}>{SETTINGS_IMPORT_CONFIRM_HEADER}</h2>
          <div className={'import-confirmation-content'}>
            {SETTINGS_IMPORT_CONFIRM_LABEL}
            {this.props.missingProperties.length > 0 ? (
              <div className={'settings-warning'}>
                {`The loader has changed the ${this.constructPropertyString()} of this activity. Ensure this is the file you intended to load before continuing`}
              </div>
            ) : (
              <div className={'settings-valid'}>
                {SETTINGS_VALID_FILE_LABEL}
              </div>
            )}
          </div>
          <div className={'modal-end-buttons'}>
            <button
              key={'cancel'}
              className={'modal-cancel-button'}
              onClick={() => this.props.setModalVisibility(false)}
            >
              {CANCEL_BUTTON_TEXT}
            </button>
            <button
              key={'save'}
              className={'modal-save-button'}
              onClick={this.importGrid}
            >
              {SAVE_BUTTON_TEXT}
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}
