import * as React from 'react'
import './Instructions.scss'

export class Instructions extends React.Component<{}, {}> {
  render() {
    return (
      <div className={'instructions-wrapper'}>
        <div className={'instructions'}>
          <div className={'instructions-header'}>There's more to this!</div>
          <div className={'instructions-text'}>
            Click the settings button in the top left to add some tiles.
          </div>
        </div>
      </div>
    )
  }
}
