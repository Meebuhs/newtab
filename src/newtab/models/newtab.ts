/**
 * A single column in the grid.
 * @property {string} id the id of the column. This is used as the key in the state's column dictionary
 * @property {string[]} tileIds the ids of tiles which are in this column, in the order of their appearance
 */
export interface IColumn {
  id: string
  tileIds: string[]
}

/**
 * A single tile on the grid. The method for rendering the tile is determined by the value of the displayMode property.
 *  - image: simply uses a user defined image as the background for the tile. The value stored in image is the key used
 *           to retrieve the image from local storage.
 *  - colour: uses the defined backgroundColour as the background for the tile, fontColour for the font, name as the
 *            text displayed on the tile and favicon to determine whether an icon should be shown beside the text.
 * The tile will have values for all of these properties even though they cannot all be used at once. This is to allow
 * alternatives to be stored within each tile when being customized by the tile creator.
 * @property {string} id the id of the tile. This is used as the key in the state's tile dictionary
 * @property {string} name the text which is displayed on the tile
 * @property {string} url the url which the tile leads to
 * @property {'image' | 'colour'} displayMode the display mode of the tile
 * @property {string} backgroundColour the colour of the tile background
 * @property {string} fontColour the colour of the tile font
 * @property {boolean} favicon whether the favicon should be displayed beside the tile name
 * @property {string} image the key used to retrieve the image from local storage
 */
export interface ITile {
  id: string
  name: string
  url: string
  displayMode: 'colour' | 'image'
  backgroundColour: string
  fontColour: string
  favicon: boolean
  image: string
}

/**
 * The default empty configuration of a tile
 */
export const emptyTile = {
  id: '',
  name: '',
  url: '',
  displayMode: 'colour' as 'colour', // Suppress compiler warning
  backgroundColour: '#fff',
  fontColour: '#000',
  favicon: false,
  image: '',
}
