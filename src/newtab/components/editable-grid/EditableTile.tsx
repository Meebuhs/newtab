import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { ITile } from '../../models/newtab'
import { TileCreator } from '../ui/modals/TileCreator'
import './EditableTile.scss'

interface IProps {
  tile: ITile
  index: number
  handleRemoveTile: (id: string) => void
  handleEditTile: (tile: ITile) => void
}

interface IState {
  showTileEditorModal: boolean
}

export class EditableTile extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { showTileEditorModal: false }
  }

  /**
   * Removes this tile from the grid.
   */
  removeTile = () => {
    this.props.handleRemoveTile(this.props.tile.id)
  }

  /**
   * Opens the TileCreator modal with this tile as props.
   */
  handleOpenTileEditorModal = () => {
    this.setState({ showTileEditorModal: true })
  }

  /**
   * Closes the TileCreator modal without saving any of the changes made.
   */
  handleCloseTileEditorModal = () => {
    this.setState({ showTileEditorModal: false })
  }

  /**
   * Closes the TileCreator modal and saves the changes made to the tile.
   * @param {ITile} tile the new tile to save
   */
  handleSaveTileEditorModal = (tile: ITile) => {
    this.setState({ showTileEditorModal: false })
    this.editTile(tile)
  }

  /**
   * Replaces the current tile in the root state with the edited tile.
   * @param {ITile} tile the edited tile
   */
  editTile = (tile: ITile) => {
    this.props.handleEditTile(tile)
  }

  /**
   * Creates the tile's style based on the displaymode and its properties.
   */
  createStyle = () => {
    const { displayMode } = this.props.tile
    switch (displayMode) {
      case 'image': {
        const { image } = this.props.tile
        return {
          backgroundImage: image,
        }
      }
      case 'colour': {
        const { backgroundColour, fontColour, favicon } = this.props.tile
        return {
          backgroundColor: backgroundColour,
          color: fontColour,
        }
      }
    }
  }

  render() {
    const { id, name } = this.props.tile
    return (
      <>
        <Draggable draggableId={id} index={this.props.index} type={'tile'}>
          {provided => (
            <div
              className={'draggable-tile'}
              key={id}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div className={'tile'} style={this.createStyle()}>
                {name}
                <button
                  className={'edit-tile'}
                  onClick={this.handleOpenTileEditorModal}
                >
                  E
                </button>
                <button className={'remove-tile'} onClick={this.removeTile}>
                  X
                </button>
              </div>
            </div>
          )}
        </Draggable>
        <TileCreator
          tile={this.props.tile}
          edit={true}
          showModal={this.state.showTileEditorModal}
          handleCloseModal={this.handleCloseTileEditorModal}
          handleSaveModal={this.handleSaveTileEditorModal}
        />
      </>
    )
  }
}
