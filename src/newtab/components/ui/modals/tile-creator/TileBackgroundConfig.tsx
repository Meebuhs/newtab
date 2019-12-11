import { TileColourBackgroundConfig } from 'modals/tile-creator/TileColourConfig'
import { TileImageBackgroundConfig } from 'modals/tile-creator/TileImageConfig'
import { ITile } from 'models/newtab'
import * as React from 'react'
import { RGBColor } from 'react-color'

interface IProps {
  updateStateValue: (attribute: keyof ITile, value: string) => void
  updateColourValue: (attribute: string, value: RGBColor) => void
  updateFaviconValue: (value: boolean) => void
  displayMode: 'colour' | 'image'
  backgroundColour: RGBColor
  fontColour: RGBColor
  favicon: boolean
  image: string
}

export class TileBackgroundConfig extends React.Component<IProps, {}> {
  render() {
    return (
      <>
        {this.props.displayMode === 'colour' ? (
          <TileColourBackgroundConfig {...this.props} />
        ) : (
          <TileImageBackgroundConfig {...this.props} />
        )}
      </>
    )
  }
}
