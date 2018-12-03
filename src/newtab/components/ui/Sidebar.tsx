import * as React from 'react'
import { AddTile } from './modals/AddTile'
import './Sidebar.scss'

interface IProps {
  sidebarVisible: boolean
  handleAddColumn: (id: string) => void
  handleAddTile: (id: string, url: string) => void
  handleToggleSidebar: () => void
}
interface IState {
  showAddTileModal: boolean
}

export class Sidebar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { showAddTileModal: false }
  }

  toggleSidebar = () => {
    this.props.handleToggleSidebar()
  }

  /**
   * Adds a column to the grid. A collision of ids is possible here if the user
   * is able to create two columns in the same millisecond
   */
  addColumn = () => {
    const id = this.getHashCode(['column', Date.now()].join('.'))
    this.props.handleAddColumn(id)
  }

  /**
   * Adds a tile to the grid with the url which is currently specified by the input #tileUrl
   */
  addTile = (url: string) => {
    const id = this.getHashCode([url, Date.now()].join('.'))
    this.props.handleAddTile(id, url)
  }

  /**
   * Returns the hash code for a string. This is a javascript implementation of Java's String.hashcode()
   * ref: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
   */
  getHashCode = (value: string) => {
    let hash = 0
    let i = 0
    let chr
    if (value.length === 0) {
      return hash.toString()
    }

    for (i = 0; i < value.length; i++) {
      chr = value.charCodeAt(i)
      hash = (hash << 5) - hash + chr
      hash |= 0
    }

    return hash.toString()
  }

  handleOpenAddTileModal = () => {
    this.setState({ showAddTileModal: true })
  }

  handleCloseAddTileModal = () => {
    this.setState({ showAddTileModal: false })
  }

  handleSaveAddTileModal = (value: string) => {
    this.setState({ showAddTileModal: false })
    this.addTile(value)
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
          {this.props.sidebarVisible ? '<' : '>'}
        </button>
        <div className={'sidebar'} style={{ marginLeft: sidebarMargin }}>
          <div
            className={'sidebar-function'}
            onClick={this.handleOpenAddTileModal}
          >
            Add Tile
          </div>
          <AddTile
            showModal={this.state.showAddTileModal}
            handleCloseModal={this.handleCloseAddTileModal}
            handleSaveModal={this.handleSaveAddTileModal}
          />
          <div className={'sidebar-function'} onClick={this.addColumn}>
            Add Column
          </div>
        </div>
      </>
    )
  }
}
