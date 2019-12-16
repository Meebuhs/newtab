import * as React from 'react'
import './UnsplashConfig.scss'

export class UnsplashConfig extends React.Component<{}, {}> {
  render() {
    return (
      <div className={'unsplash-config-container'}>
        {
          'No configuration needed. A random image will be loaded each time new tab is opened.'
        }
      </div>
    )
  }
}
