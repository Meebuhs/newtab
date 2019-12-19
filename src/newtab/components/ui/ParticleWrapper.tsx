import { AnimationPreset } from 'constants/types'
import * as React from 'react'
import Particles from 'react-particles-js'
import './ParticleWrapper.scss'

interface IProps {
  animation: {
    preset: AnimationPreset
    count: number
    backgroundColour: string
    particleColour: string
    repel: boolean
  }
}

export class ParticleWrapper extends React.Component<IProps, {}> {
  render() {
    const {
      preset,
      count,
      backgroundColour,
      particleColour,
      repel,
    } = this.props.animation

    const parameterPresets = {
      network: {
        particles: {
          number: {
            value: count,
          },
          size: {
            value: 3,
          },
          line_linked: {
            color: particleColour,
          },
          move: {
            bounce: false,
            speed: 2,
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: repel,
              mode: 'repulse' as 'repulse',
            },
          },
        },
      },
      float: {
        particles: {
          number: {
            value: count,
          },
          color: {
            value: particleColour,
          },
          density: {
            enable: false,
          },
          size: {
            value: 3,
            random: true,
            anim: {
              speed: 4,
              size_min: 0.3,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            bounce: false,
            random: true,
            speed: 1,
            direction: 'top' as 'top',
            out_mode: 'out' as 'out',
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: repel,
              mode: 'repulse' as 'repulse',
            },
          },
        },
      },
      fall: {
        particles: {
          number: {
            value: count,
          },
          color: {
            value: particleColour,
          },
          size: {
            value: 6,
            random: true,
          },
          move: {
            bounce: false,
            direction: 'bottom' as 'bottom',
            out_mode: 'out' as 'out',
          },
          line_linked: {
            enable: false,
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: repel,
              mode: 'repulse' as 'repulse',
            },
          },
        },
      },
      sky: {
        particles: {
          number: {
            value: count,
          },
          color: {
            value: particleColour,
          },
          density: {
            enable: true,
            value_area: 1500,
          },
          line_linked: {
            color: particleColour,
            enable: true,
            opacity: 0.02,
          },
          move: {
            bounce: false,
            direction: 'right' as 'right',
            speed: 0.05,
          },
          size: {
            value: 2,
          },
          opacity: {
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.05,
            },
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: repel,
              mode: 'repulse' as 'repulse',
            },
          },
        },
        retina_detect: true,
      },
    }

    return (
      <Particles
        className={'particle-canvas'}
        style={{ background: backgroundColour }}
        params={{
          ...parameterPresets[preset],
        }}
      />
    )
  }
}
