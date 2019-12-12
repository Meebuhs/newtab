export const testTile = {
  id: 'test.tile.id',
  name: 'test.tile.name',
  url: 'test.tile.url',
  displayMode: 'colour' as 'colour', // Suppress compiler warning
  backgroundColour: { r: 255, g: 255, b: 255, a: 1 },
  fontColour: { r: 0, g: 0, b: 0, a: 1 },
  favicon: false,
  image: 'test.image.data',
}

export const emptyFunction = () => {
  return
}
