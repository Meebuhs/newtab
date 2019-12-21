import {
  SIDEBAR_ADDCOLUMN,
  SIDEBAR_ADDTILE,
  SIDEBAR_EDIT_BACKGROUND,
  SIDEBAR_SETTINGS,
} from 'constants/strings'
import { BackgroundEditor } from 'modals/editors/background-editor/BackgroundEditor'
import { TileEditor } from 'modals/editors/tile-editor/TileEditor'
import { Settings } from 'modals/Settings'
import { emptyTile, IBackground, ITile } from 'models/newtab'
import * as React from 'react'
import { IGridState } from 'reducers/grid'
import left from 'resources/left.png'
import options from 'resources/options.png'
import { getHashCode } from 'utils/hashcode'
import './Sidebar.scss'

interface IProps {
  sidebarVisible: boolean
  background: IBackground
  handleAddColumn: (id: string) => void
  handleAddTile: (tile: ITile) => void
  handleToggleSidebar: () => void
  handleEditBackground: (background: IBackground) => void
}

interface IState {
  showTileEditorModal: boolean
  showBackgroundEditorModal: boolean
  showSettingsModal: boolean
}

export class Sidebar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      showTileEditorModal: false,
      showBackgroundEditorModal: false,
      showSettingsModal: false,
    }
  }

  /**
   * Toggles the visibility of the sidebar.
   */
  toggleSidebar = () => {
    this.props.handleToggleSidebar()
  }

  /**
   * Adds a column to the grid. A collision of ids is possible here if the user
   * is able to create two columns in the same millisecond.
   */
  addColumn = () => {
    const id = getHashCode(['column', Date.now()].join('.'))
    this.props.handleAddColumn(id)
  }

  /**
   * Adds a tile to the grid with the specified url.
   * @param {ITile} tile the tile to add
   */
  addTile = (tile: ITile) => {
    if (tile.id === '') {
      tile.id = getHashCode([tile.name, Date.now()].join('.'))
    }
    this.props.handleAddTile(tile)
  }

  /**
   * Opens the TileEditor modal with an empty tile.
   */
  handleOpenTileEditorModal = () => {
    this.setState({ showTileEditorModal: true })
  }

  /**
   * Closes the TileEditor modal without saving any of the changes made.
   */
  handleCloseTileEditorModal = () => {
    this.setState({ showTileEditorModal: false })
  }

  /**
   * Creates the tile defined in the TileEditor modal.
   * @param {ITile} tile the tile to add
   */
  handleSaveTileEditorModal = (tile: ITile) => {
    this.setState({ showTileEditorModal: false })
    this.addTile(tile)
  }

  /**
   * Opens the BackgroundEditor modal.
   */
  handleOpenBackgroundEditorModal = () => {
    this.setState({ showBackgroundEditorModal: true })
  }

  /**
   * Closes the BackgroundEditor modal without saving any of the changes made.
   */
  handleCloseBackgroundEditorModal = () => {
    this.setState({ showBackgroundEditorModal: false })
  }

  /**
   * Saves the changes made in the BackgroundEditor modal.
   * @param {IBackground} background the background to save
   */
  handleSaveBackgroundEditorModal = (background: IBackground) => {
    this.setState({ showBackgroundEditorModal: false })
    this.props.handleEditBackground(background)
  }

  /**
   * Opens the Settings modal.
   */
  handleOpenSettingsModal = () => {
    this.setState({ showSettingsModal: true })
  }

  /**
   * Closes the Settings modal without saving any of the changes made.
   */
  handleCloseSettingsModal = () => {
    this.setState({ showSettingsModal: false })
  }

  /**
   * Performs the load operation with the grid state provided in the Settings modal.
   * @param {IGridState} grid the grid state to apply.
   */
  handleSaveSettingsModal = (grid: IGridState) => {
    this.setState({ showSettingsModal: false })
  }

  render() {
    const sidebarMargin = this.props.sidebarVisible ? 0 : '-18%'
    const toggleMargin = this.props.sidebarVisible ? '18%' : 0

    return (
      <>
        <button
          className={'toggle-sidebar'}
          onClick={this.toggleSidebar}
          style={{ marginLeft: toggleMargin }}
        >
          {this.props.sidebarVisible ? (
            <img className={'button-icon'} src={left} />
          ) : (
            <img className={'button-icon'} src={options} />
          )}
        </button>
        <div className={'sidebar'} style={{ marginLeft: sidebarMargin }}>
          <div
            className={'sidebar-function'}
            onClick={this.handleOpenTileEditorModal}
          >
            {SIDEBAR_ADDTILE}
          </div>
          <TileEditor
            tile={emptyTile}
            edit={false}
            showModal={this.state.showTileEditorModal}
            handleCloseModal={this.handleCloseTileEditorModal}
            handleSaveModal={this.handleSaveTileEditorModal}
          />
          <div className={'sidebar-function'} onClick={this.addColumn}>
            {SIDEBAR_ADDCOLUMN}
          </div>
          <div
            className={'sidebar-function'}
            onClick={this.handleOpenBackgroundEditorModal}
          >
            {SIDEBAR_EDIT_BACKGROUND}
          </div>
          <BackgroundEditor
            background={this.props.background}
            showModal={this.state.showBackgroundEditorModal}
            handleCloseModal={this.handleCloseBackgroundEditorModal}
            handleSaveModal={this.handleSaveBackgroundEditorModal}
          />
          <div
            className={'sidebar-function'}
            onClick={this.handleOpenSettingsModal}
          >
            {SIDEBAR_SETTINGS}
          </div>
          <Settings
            showModal={this.state.showSettingsModal}
            handleCloseModal={this.handleCloseSettingsModal}
            handleSaveModal={this.handleSaveSettingsModal}
          />
        </div>
      </>
    )
  }
}
