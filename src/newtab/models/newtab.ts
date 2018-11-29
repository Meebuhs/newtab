// A column of tiles in the grid
export interface IColumn {
  id: string
  tileIds: string[]
}

// A single tile in the grid
export interface ITile {
  id: string
  url: string
}
