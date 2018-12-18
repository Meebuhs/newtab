import * as React from 'react'
import { TILECREATOR_BACKGROUND_PREVIEW } from '../../../../constants/strings'
import { ITile } from '../../../../models/newtab'
import { TileColourBackgroundConfig } from './TileColourConfig'
import { TileImageBackgroundConfig } from './TileImageConfig'

interface IProps {
  updateStateValue: (attribute: keyof ITile, value: string) => void
  updateFaviconValue: (value: boolean) => void
  displayMode: 'colour' | 'image'
  backgroundColour: string
  fontColour: string
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
