import { TileCreator } from 'modals/tile-creator/TileCreator'
import { ITile } from 'models/newtab'
import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import close from 'resources/close.png'
import options from 'resources/options.png'
import { RGBColorToString } from 'utils/colour'
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

  render() {
    const {
      id,
      name,
      url,
      displayMode,
      backgroundColour,
      fontColour,
      favicon,
      image,
    } = this.props.tile
    return (
      <>
        <Draggable draggableId={id} index={this.props.index} type={'tile'}>
          {(provided, snapshot) => (
            <div
              className={'draggable-tile'}
              key={id}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {displayMode === 'colour' ? (
                <div
                  className={'tile'}
                  key={id}
                  style={{
                    backgroundColor: RGBColorToString(backgroundColour),
                    color: RGBColorToString(fontColour),
                  }}
                >
                  {snapshot.isDragging ? (
                    <div className={'tile-overlay-dragging'} />
                  ) : (
                    <div className={'tile-overlay'} />
                  )}
                  {favicon ? (
                    <img
                      className={'favicon'}
                      src={`http://icons.duckduckgo.com/ip2/${url}.ico`}
                    />
                  ) : null}
                  {name}
                  <button
                    className={'edit-tile'}
                    onClick={this.handleOpenTileEditorModal}
                  >
                    <img className={'button-icon'} src={options} />
                  </button>
                  <button className={'remove-tile'} onClick={this.removeTile}>
                    <img className={'button-icon'} src={close} />
                  </button>
                </div>
              ) : (
                <div className={'tile'} key={id}>
                  {snapshot.isDragging ? (
                    <div className={'tile-overlay-dragging'} />
                  ) : (
                    <div className={'tile-overlay'} />
                  )}
                  <img className={'tile-image'} src={image} />
                  <div className="tile-image-text">{name}</div>
                  <button
                    className={'edit-tile'}
                    onClick={this.handleOpenTileEditorModal}
                  >
                    <img className={'button-icon'} src={options} />
                  </button>
                  <button className={'remove-tile'} onClick={this.removeTile}>
                    <img className={'button-icon'} src={close} />
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
