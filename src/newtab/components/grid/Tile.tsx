import * as React from 'react'
import './Tile.scss'

import { ITile } from '../../models/newtab'

interface IProps {
  tile: ITile
}

export class Tile extends React.Component<IProps, {}> {
  render() {
    const { id, url } = this.props.tile
    return (
      <div className={'tile'} key={id}>
        {url}
      </div>
    )
  }
}
