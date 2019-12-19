import * as React from 'react'
import Particles from 'react-particles-js'
import './ParticleWrapper.scss'

export class ParticleWrapper extends React.Component<{}, {}> {
  render() {
    return (
      <Particles
        className={'particle-canvas'}
        params={{
          particles: {
            number: {
              value: 100,
            },
            color: {
              value: '#000',
            },
            size: {
              value: 3,
            },
            line_linked: {
              color: '#000',
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'repulse',
              },
            },
          },
        }}
      />
    )
  }
}
