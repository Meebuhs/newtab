import * as React from 'react'
import './Sidebar.scss'

interface IProps {
  handleAddColumn: (id: string) => void
  handleAddTile: (id: string, url: string) => void
}
interface IState {
  currentUrlValue: string
}
export class Sidebar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { currentUrlValue: '' }
  }

  /**
   * Adds a column to the grid. A collision here is possible if the user
   * is able to create two columns in the same millisecond
   */
  addColumn = () => {
    const id = this.getHashCode(['column', Date.now()].join('.'))
    this.props.handleAddColumn(id)
  }

  /**
   * Adds a tile to the grid with the url which is currently specified by the input #tileUrl
   */
  addTile = () => {
    const url = this.state.currentUrlValue
    const id = this.getHashCode([url, Date.now()].join('.'))
    this.setState({ currentUrlValue: '' })
    this.props.handleAddTile(id, url)
  }

  /**
   * Returns the hash code for a string. This is a javascript implementation of Java's String.hashcode()
   * ref: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
   */
  getHashCode = (value: string) => {
    let hash = 0
    let i = 0
    let chr
    if (value.length === 0) {
      return hash.toString()
    }

    for (i = 0; i < value.length; i++) {
      chr = value.charCodeAt(i)
      hash = (hash << 5) - hash + chr
      hash |= 0
    }

    return hash.toString()
  }

  /**
   * Sets the current url value in the state
   */
  updateUrlValue = (url: string) => {
    this.setState({ currentUrlValue: url })
  }

  render() {
    const urlValue = this.state.currentUrlValue

    return (
      <div className={'sidebar'}>
        <div className={'addTile'}>
          <input
            type={'text'}
            id={'tileUrl'}
            value={urlValue}
            onChange={event => this.updateUrlValue(event.target.value)}
          />
          <button onClick={this.addTile}>Add tile</button>
        </div>

        <div className={'addColumn'}>
          <button onClick={this.addColumn}>Add column</button>
        </div>
      </div>
    )
  }
}
