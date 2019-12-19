import { Newtab } from 'components/Newtab'
import * as enzyme from 'enzyme'
import * as React from 'react'
import { testBackground } from 'testObjects'
import { getGradientString, RGBColorToString } from 'utils/colour'
import { ParticleWrapper } from './ui/ParticleWrapper'

describe('Newtab component', () => {
  it('should render the editable grid when the sidebar is visible', () => {
    const newtab = enzyme.shallow(
      <Newtab sidebarVisible={true} background={testBackground} />
    )
    expect(newtab.find('Connect(EditableGrid)')).toHaveLength(1)
    expect(newtab.find('Connect(Grid)')).toHaveLength(0)
  })

  it('should render the grid when the sidebar is not visible', () => {
    const newtab = enzyme.shallow(
      <Newtab sidebarVisible={false} background={testBackground} />
    )
    expect(newtab.find('Connect(EditableGrid)')).toHaveLength(0)
    expect(newtab.find('Connect(Grid)')).toHaveLength(1)
  })

  it('should correctly render colour background', () => {
    const background = {
      ...testBackground,
      displayMode: 'colour' as 'colour',
    }
    const newtab = enzyme.shallow(
      <Newtab sidebarVisible={false} background={background} />
    )

    expect(newtab.find('.newtab').get(0).props.style).toHaveProperty(
      'backgroundColor',
      RGBColorToString(background.backgroundColour)
    )
  })

  it('should correctly render gradient background', () => {
    const background = {
      ...testBackground,
      displayMode: 'gradient' as 'gradient',
    }
    const newtab = enzyme.shallow(
      <Newtab sidebarVisible={false} background={background} />
    )

    expect(newtab.find('.newtab').get(0).props.style).toHaveProperty(
      'background',
      getGradientString(
        testBackground.gradient.startColour,
        testBackground.gradient.endColour,
        testBackground.gradient.angle,
        testBackground.gradient.type
      )
    )
  })

  it('should correctly render image background', () => {
    const background = {
      ...testBackground,
      displayMode: 'image' as 'image',
    }
    const newtab = enzyme.shallow(
      <Newtab sidebarVisible={false} background={background} />
    )

    expect(newtab.find('.background-image')).toHaveLength(1)
  })

  it('should render particle animation background', () => {
    const background = {
      ...testBackground,
      displayMode: 'animation' as 'animation',
    }

    const newtab = enzyme.shallow(
      <Newtab sidebarVisible={false} background={background} />
    )

    expect(newtab.find(ParticleWrapper)).toHaveLength(1)
  })
})
