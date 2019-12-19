// ActionTypes for grid state
export const ADD_COLUMN = 'ADD_COLUMN'
export const REMOVE_COLUMN = 'REMOVE_COLUMN'
export const REORDER_COLUMN = 'REORDER_COLUMN'
export const ADD_TILE = 'ADD_TILE'
export const EDIT_TILE = 'EDIT_TILE'
export const REMOVE_TILE = 'REMOVE_TILE'
export const REORDER_TILE = 'REORDER_TILE'
export const MOVE_TILE = 'MOVE_TILE'
export const EDIT_BACKGROUND = 'EDIT_BACKGROUND'

// ActionTypes for ui state
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

// Types for ui components
export type TileDisplayMode = 'colour' | 'gradient' | 'image'
export type BackgroundDisplayMode =
  | 'colour'
  | 'gradient'
  | 'image'
  | 'unsplash'
  | 'animation'
export type GradientType = 'linear' | 'radial'
export type AnimationPreset = 'network' | 'float' | 'fall' | 'sky'

// Key sets for ui components
export const TILE_DISPLAY_MODES = ['colour', 'gradient', 'image']
export const BACKGROUND_DISPLAY_MODES = [
  'colour',
  'gradient',
  'image',
  'unsplash',
  'animation',
]
export const GRADIENT_TYPES = ['linear', 'radial']
export const GRADIENT_ANGLES = ['0', '45', '90', '135']
export const ANIMATION_PRESETS = ['network', 'float', 'fall', 'sky']
export const FONT_SIZES = ['8', '10', '12', '14', '16', '18', '20', '22', '24']
