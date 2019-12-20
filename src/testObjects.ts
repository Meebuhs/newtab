import { IBackground, ITile } from 'models/newtab'

export const testTile: ITile = {
  id: 'test.tile.id',
  name: 'test.tile.name',
  url: 'test.tile.url',
  displayMode: 'colour' as 'colour', // Suppress compiler warning
  backgroundColour: { r: 255, g: 255, b: 255, a: 1 },
  fontColour: { r: 0, g: 0, b: 0, a: 1 },
  fontSize: '16',
  gradient: {
    type: 'radial' as 'radial', // Suppress compiler warning
    startColour: { r: 255, g: 255, b: 255, a: 1 },
    endColour: { r: 210, g: 210, b: 210, a: 1 },
    angle: '0',
  },
  favicon: false,
  image: 'test.image.data',
}

export const testBackground: IBackground = {
  displayMode: 'colour' as 'colour', // Suppress compiler warning
  backgroundColour: { r: 255, g: 255, b: 255, a: 1 },
  gradient: {
    type: 'radial' as 'radial', // Suppress compiler warning
    startColour: { r: 255, g: 255, b: 255, a: 1 },
    endColour: { r: 210, g: 210, b: 210, a: 1 },
    angle: '0',
  },
  image: 'test.image.data',
  unsplashURL: 'test.url',
  unsplashQuery: 'test.query',
  animation: {
    preset: 'network' as 'network',
    count: '150',
    backgroundColour: { r: 20, g: 20, b: 20 },
    particleColour: { r: 255, g: 255, b: 255 },
    repel: true,
  },
}

export const emptyFunction = () => {
  return
}
