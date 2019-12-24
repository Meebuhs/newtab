import { ToggleButton } from 'components/ui/elements/ToggleButton'
import {
  CANCEL_BUTTON_TEXT,
  EXPORT_BUTTON_TEXT,
  FILE_SELECT_BUTTON_TEXT,
  FILE_SELECT_WARNING,
  IMPORT_BUTTON_TEXT,
  NO_FILE_SELECTED_LABEL,
  SETTINGS_EXPORT_LABEL,
  SETTINGS_HEADER,
  SETTINGS_IMPORT_LABEL,
  SETTINGS_TOGGLE_EXPORT,
  SETTINGS_TOGGLE_IMPORT,
} from 'constants/strings'
import {
  IFileReaderEvent,
  IFileSelectorEvent,
  SETTINGS_OPERATIONS,
  SettingsOperations,
} from 'constants/types'
import { defaultBackground, emptyTile, IBackground, ITile } from 'models/newtab'
import * as React from 'react'
import Modal from 'react-modal'
import { IGridState, initialState } from 'reducers/grid'
import { ImportSettingsConfirmation } from './ImportConfirmation'
import './Settings.scss'

interface IProps {
  showModal: boolean
  grid: IGridState
  handleCloseModal: () => void
  handleSaveModal: (grid: IGridState) => void
  importGrid: (grid: IGridState) => void
}

interface IState {
  currentOperation: SettingsOperations
  showConfirmModal: boolean
  newGrid: IGridState
  missingProperties: string[]
  errored: boolean
  fileName: string
}

export class Settings extends React.Component<IProps, IState> {
  fileSelector: HTMLInputElement
  fileReader: FileReader

  constructor(props: IProps) {
    super(props)
    this.state = {
      currentOperation: SETTINGS_OPERATIONS[0] as SettingsOperations,
      showConfirmModal: false,
      newGrid: initialState,
      missingProperties: [],
      errored: false,
      fileName: '',
    }
  }

  componentDidMount() {
    this.initialiseFileInput()
  }

  /**
   * Initialises the file selector and reader.
   */
  initialiseFileInput = () => {
    this.fileSelector = this.buildFileSelector()
    this.fileReader = this.buildFileReader()
    this.setState({
      errored: false,
      fileName: '',
      newGrid: initialState,
    })
  }

  /**
   * Constructs and returns the file input element which accepts json file representations of activities.
   */
  buildFileSelector = () => {
    const fileSelector = document.createElement('input')
    fileSelector.setAttribute('type', 'file')
    fileSelector.setAttribute('accept', '.json')
    fileSelector.addEventListener('change', this.handleFileChosen)
    return fileSelector
  }

  /**
   * Constructs and returns the file reader which reads the json files uploaded by the user.
   */
  buildFileReader = () => {
    const fileReader = new FileReader()
    fileReader.addEventListener('load', this.readJSON)
    return fileReader
  }

  /**
   * Reads the json file into the component state.
   */
  readJSON = (event: IFileReaderEvent) => {
    try {
      this.setState({
        newGrid: JSON.parse(event.target.result),
        errored: false,
      })
    } catch (error) {
      this.initialiseFileInput()
      this.setState({ errored: true })
    }
  }

  /**
   * Handles the reading of a file after it is selected by the user.
   */
  handleFileChosen = (event: IFileSelectorEvent) => {
    if (event.target.files && event.target.files[0]) {
      this.fileReader.readAsText(event.target.files[0])
      this.setState({ fileName: event.target.files[0].name })
    }
  }

  /**
   * Button onclick event which triggers the file select.
   */
  handleFileSelect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    this.fileSelector.click()
  }

  /**
   * Imports the loaded grid.
   */
  importGrid = () => {
    const newGrid = Object.assign({}, this.state.newGrid)
    this.props.importGrid(newGrid)
    this.cleanUp()
  }

  /**
   * Reset the state to remove uncomfirmed changes before closing.
   */
  cleanUp = () => {
    this.initialiseFileInput()
    this.setState({
      newGrid: initialState,
      missingProperties: [],
    })
    this.props.handleCloseModal()
  }

  /**
   * Returns true if an object is empty (i.e. {})
   */
  isEmptyObject = (object: object) => {
    return Object.entries(object).length === 0 && object.constructor === Object
  }

  /**
   * Verifies the loaded grid before displaying the confirmation modal.
   */
  openConfirmation = () => {
    this.verifyGrid()
    this.setConfirmModalVisibility(true)
  }

  /**
   * Checks that the grid object is of a valid structure. Any missing properties are filled with default values
   * and kept track of in state.missingProperties. This should not be necessary as it is expected that
   * the grid is created within this extension and thus the structure can be assumed to be correct. This is
   * written as an added safety measure to ensure that behaviour is as expected after loading a grid as failure
   * to render the grid stops the user from being able to interact with the extension at all.
   *
   * This method is aggressive in attempting to repair/replace any issues in the grid. It ensures that all loaded
   * tiles and the background are well formed by replacing any missing or invalid properties with default values.
   * It also ensures that all declared tiles and columns exist.
   */
  verifyGrid = () => {
    // The compiler 'knows' that newGrid conforms to IGridState however the json parsed at runtime could be misformed.
    // This leads the compiler to believe that these null checks could never fail, but we know they can.
    /* tslint:disable:strict-type-predicates */
    const missingProperties: string[] = []
    const newGrid = Object.assign({}, this.state.newGrid)

    // Check that tiles exists
    if (newGrid.tiles == null) {
      newGrid.tiles = initialState.tiles
      missingProperties.push('tiles')
    }

    // Check that columns exists
    if (newGrid.columns == null || this.isEmptyObject(newGrid.columns)) {
      newGrid.columns = initialState.columns
      missingProperties.push('columns')
    }

    // Check that columnOrder exists
    if (newGrid.columnOrder == null) {
      // columns must now be populated and as such can be used to construct an ordering
      newGrid.columnOrder = Object.keys(newGrid.columns)
      missingProperties.push('columnOrder')
    }

    // Check that each column in the ordering exists and remove those that don't
    const columnsToRemove: string[] = []
    newGrid.columnOrder.forEach(column => {
      if (newGrid.columns[column] == null) {
        columnsToRemove.push(column)
      }
    })
    if (columnsToRemove.length > 0) {
      newGrid.columnOrder = newGrid.columnOrder.filter(
        column => !columnsToRemove.includes(column)
      )
      missingProperties.push('columns')
    }

    // Remove columns which are not in the ordering
    Object.keys(newGrid.columns)
      .filter(column => !newGrid.columnOrder.includes(column))
      .forEach(column => delete newGrid.columns[column])

    // Check that each tile is well formed and remove any that are not
    let tilesToRemove: string[] = []
    Object.keys(newGrid.tiles).forEach(tile => {
      Object.keys(emptyTile).forEach((key: keyof ITile) => {
        if (
          newGrid.tiles[tile][key] == null ||
          typeof newGrid.tiles[tile][key] !== typeof emptyTile[key]
        ) {
          tilesToRemove.push(tile)
        }
        if (newGrid.tiles[tile].id !== tile) {
          newGrid.tiles[tile].id = tile
        }
      })
    })

    // Remove all invalid tiles
    if (tilesToRemove.length > 0) {
      Object.keys(newGrid.tiles)
        .filter(tile => tilesToRemove.includes(tile))
        .forEach(tile => delete newGrid.tiles[tile])
      missingProperties.push('tiles')
    }

    const declaredTiles: string[] = []
    // Check that the remaining columns are well formed
    newGrid.columnOrder.forEach(column => {
      // Ensure id is correct
      if (newGrid.columns[column].id !== column) {
        newGrid.columns[column].id = column
      }
      // Check that tileIds exists
      if (newGrid.columns[column].tileIds == null) {
        newGrid.columns[column].tileIds = []
      } else {
        // Check that each declared tile exists and remove those that don't
        tilesToRemove = []
        newGrid.columns[column].tileIds.forEach(tile => {
          if (newGrid.tiles[tile] == null) {
            tilesToRemove.push(tile)
          } else {
            declaredTiles.push(tile)
          }
        })
        if (tilesToRemove.length > 0) {
          newGrid.columns[column].tileIds = newGrid.columns[
            column
          ].tileIds.filter(tile => !tilesToRemove.includes(tile))
          missingProperties.push('tiles')
        }
      }
    })

    // Remove tiles which aren't declared in any column's tileIds
    Object.keys(newGrid.tiles)
      .filter(tile => !declaredTiles.includes(tile))
      .forEach(tile => delete newGrid.tiles[tile])

    // Check that the background exists and is well formed
    if (newGrid.background == null) {
      newGrid.background = defaultBackground
      missingProperties.push('background')
    } else {
      Object.keys(defaultBackground).forEach((key: keyof IBackground) => {
        if (
          newGrid.background[key] == null ||
          typeof newGrid.background[key] !== typeof defaultBackground[key]
        ) {
          // Reset background if invalid
          newGrid.background = defaultBackground
          missingProperties.push('background')
        }
      })
    }

    this.setState({
      newGrid,
      missingProperties: missingProperties.filter(
        (name, index) => missingProperties.indexOf(name) === index
      ),
    })
    /* tslint:enable:strict-type-predicates */
  }

  /**
   * Sets the visibility of the confirmation modal
   */
  setConfirmModalVisibility = (visibility: boolean) => {
    this.setState({ showConfirmModal: visibility })
  }

  /**
   * Changes the state of the toggle button.
   * @param {SettingsOperations} key the key of the button which is selected.
   */
  handleSelectionCallback = (key: SettingsOperations) => {
    this.setState({ currentOperation: key })
  }

  /**
   * Calls the appropriate confirmation function based on the expected operation.
   */
  handleConfirmation = () => {
    if (this.state.currentOperation === 'export') {
      this.exportGridSettings()
    } else {
      if (this.state.fileName !== '') {
        this.openConfirmation()
      }
    }
  }

  /**
   * Saves the grid settings locally to a json file allowing the user to restore these settings at a later date
   * or on another machine
   */
  exportGridSettings = () => {
    const newGrid = {
      ...this.props.grid,
      background: {
        ...this.props.grid.background,
        // Replace unsplashURL with a placeholder as its possible for it to be undefined which leads to the loss
        // of the background when loading. The placeholder will be replaced when newtab first mounts anyway.
        unsplashURL: 'placeholder',
        // If image is not the current display mode, don't commit the base64 image to json
        image:
          this.props.grid.background.displayMode === 'image'
            ? this.props.grid.background.image
            : '',
      },
    }
    const jsonData = JSON.stringify(newGrid)
    const a = document.createElement('a')
    const file = new Blob([jsonData], { type: 'text/plain' })
    a.href = URL.createObjectURL(file)
    a.download = `newtab-data-${Date.now()}.json`
    a.click()
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
            width: '500px',
            height: '300px',
            margin: 'auto',
          },
        }}
      >
        <div className={'settings-container'}>
          <h2 className={'header'}>{SETTINGS_HEADER}</h2>
          <div className={'settings-content'}>
            <ToggleButton
              labels={[SETTINGS_TOGGLE_EXPORT, SETTINGS_TOGGLE_IMPORT]}
              keys={SETTINGS_OPERATIONS}
              selectedKey={this.state.currentOperation}
              handleSelectionCallback={this.handleSelectionCallback}
            />
            <div className={'settings-content-container'}>
              {this.state.currentOperation === 'export' ? (
                SETTINGS_EXPORT_LABEL
              ) : (
                <div className={'settings-import-container'}>
                  {SETTINGS_IMPORT_LABEL}
                  <div className={'settings-filename'}>
                    {this.state.newGrid === initialState
                      ? NO_FILE_SELECTED_LABEL
                      : this.state.fileName}
                  </div>
                  <button
                    key={'file-select'}
                    className={'file-button'}
                    onClick={this.handleFileSelect}
                  >
                    {FILE_SELECT_BUTTON_TEXT}
                  </button>
                  {this.state.errored ? (
                    <div className="settings-warning">
                      {FILE_SELECT_WARNING}
                    </div>
                  ) : null}
                </div>
              )}
              <div className={'modal-end-buttons'}>
                <button
                  key={'cancel'}
                  className={'modal-cancel-button'}
                  onClick={this.props.handleCloseModal}
                >
                  {CANCEL_BUTTON_TEXT}
                </button>
                <button
                  key={'save'}
                  className={`modal-save-button${
                    this.state.newGrid === initialState &&
                    this.state.currentOperation === 'import'
                      ? '-disabled'
                      : ''
                  }`}
                  onClick={this.handleConfirmation}
                >
                  {this.state.currentOperation === 'export'
                    ? EXPORT_BUTTON_TEXT
                    : IMPORT_BUTTON_TEXT}
                </button>
                <ImportSettingsConfirmation
                  grid={this.state.newGrid}
                  showModal={this.state.showConfirmModal}
                  setModalVisibility={this.setConfirmModalVisibility}
                  importGrid={this.importGrid}
                  missingProperties={this.state.missingProperties}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}
