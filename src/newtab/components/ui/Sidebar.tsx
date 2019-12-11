import { SIDEBAR_ADDCOLUMN, SIDEBAR_ADDTILE } from 'constants/strings'
import { TileCreator } from 'modals/tile-creator/TileCreator'
import { emptyTile, ITile } from 'models/newtab'
import * as React from 'react'
import left from 'resources/left.png'
import right from 'resources/right.png'
import { getHashCode } from 'utils/hashcode'
import './Sidebar.scss'

interface IProps {
  sidebarVisible: boolean
  handleAddColumn: (id: string) => void
  handleAddTile: (tile: ITile) => void
  handleToggleSidebar: () => void
}

interface IState {
  showTileCreatorModal: boolean
}

export class Sidebar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { showTileCreatorModal: false }
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
   * Opens the TileCreator modal with an empty tile.
   */
  handleOpenTileCreatorModal = () => {
    this.setState({ showTileCreatorModal: true })
  }

  /**
   * Closes the TileCreator modal without saving any of the changes made.
   */
  handleCloseTileCreatorModal = () => {
    this.setState({ showTileCreatorModal: false })
  }

  /**
   * Creates the tile defined in the TileCreator modal.
   * @param {ITile} tile the tile to add
   */
  handleSaveTileCreatorModal = (tile: ITile) => {
    this.setState({ showTileCreatorModal: false })
    this.addTile(tile)
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
            <img className={'button-icon'} src={right} />
          )}
        </button>
        <div className={'sidebar'} style={{ marginLeft: sidebarMargin }}>
          <div
            className={'sidebar-function'}
            onClick={this.handleOpenTileCreatorModal}
          >
            {SIDEBAR_ADDTILE}
          </div>
          <TileCreator
            tile={emptyTile}
            edit={false}
            showModal={this.state.showTileCreatorModal}
            handleCloseModal={this.handleCloseTileCreatorModal}
            handleSaveModal={this.handleSaveTileCreatorModal}
          />
          <div className={'sidebar-function'} onClick={this.addColumn}>
            {SIDEBAR_ADDCOLUMN}
          </div>
        </div>
      </>
    )
  }
}
