import { TileCreator } from 'modals/tile-creator/TileCreator'
import { ITile } from 'models/newtab'
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
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
   * Creates the tile's style based on its colour and font properties. This is only done with colour tiles,
   * image tiles are created in the render function.
   */
  createStyle = () => {
    const { backgroundColour, fontColour, favicon } = this.props.tile
    return {
      backgroundColor: backgroundColour,
      color: fontColour,
      marginBottom: '20px',
    }
  }

  render() {
    const { id, name, displayMode, image } = this.props.tile
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
              {displayMode === 'colour' ? (
                <div className={'tile'} key={id} style={this.createStyle()}>
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
              ) : (
                <div className={'tile'} key={id}>
                  <img className={'tile-image'} src={image} />
                  <div className="tile-image-text">{name}</div>
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
              )}
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
