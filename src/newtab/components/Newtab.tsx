import axios from 'axios'
import EditableGrid from 'containers/EditableGrid'
import Grid from 'containers/Grid'
import Sidebar from 'containers/Sidebar'
import { IBackground } from 'models/newtab'
import * as React from 'react'
import { apiKey } from 'utils/api'
import { getGradientString, RGBColorToString } from 'utils/colour'
import './Newtab.scss'

interface IProps {
  sidebarVisible: boolean
  background: IBackground
}

interface IState {
  background: IBackground
  credit: {
    name: string
    userName: string
  }
}

export class Newtab extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      background: props.background,
      credit: {
        name: '',
        userName: '',
      },
    }
  }

  componentDidMount() {
    const apiRoot = 'https://api.unsplash.com'
    const query = this.state.background.unsplashQuery

    axios
      .get(
        `${apiRoot}/photos/random?client_id=${apiKey}&featured=true&orientation=landscape&query=${query}`
      )
      .then(response => {
        this.setState(prevState => ({
          background: {
            ...prevState.background,
            unsplashURL: `${response.data.urls.raw}&h=${window.innerHeight}&w=${window.innerWidth}&auto=format`,
          },
          credit: {
            name: response.data.user.name,
            userName: response.data.user.username,
          },
        }))
      })
      .catch()
  }

  getBackgroundStyle = () => {
    const { displayMode, backgroundColour, gradient } = this.state.background

    if (displayMode === 'colour') {
      return {
        backgroundColor: RGBColorToString(backgroundColour),
      }
    } else if (displayMode === 'gradient') {
      return {
        background: getGradientString(
          gradient.startColour,
          gradient.endColour,
          gradient.angle,
          gradient.type
        ),
      }
    } else {
      return {}
    }
  }

  render() {
    const { displayMode, image } = this.props.background
    const imageSource =
      displayMode === 'image' ? image : this.state.background.unsplashURL

    return (
      <div className={'newtab'} style={this.getBackgroundStyle()}>
        {displayMode === 'image' || displayMode === 'unsplash' ? (
          <img className={'background-image'} src={imageSource} />
        ) : null}
        {this.props.sidebarVisible ? <EditableGrid /> : <Grid />}
        <Sidebar />
        {displayMode === 'unsplash' ? (
          <div className="unsplash-credit">
            {`Photo by `}
            <a
              href={`https://unsplash.com/@${this.state.credit.userName}?utm_source=newtab&utm_medium=referral`}
            >
              {this.state.credit.name}
            </a>
            {` on `}
            <a
              href={`https://unsplash.com/?utm_source=newtab&utm_medium=referral`}
            >
              {'Unsplash'}
            </a>
          </div>
        ) : null}
      </div>
    )
  }
}
