import * as React from 'react'
import down from 'resources/down.png'
import up from 'resources/up.png'
import './Dropdown.scss'

interface IProps {
  items: string[]
  selected: string
  handleSelectionCallback: (selectedItem: string) => void
}

interface IState {
  listOpen: boolean
}

/**
 * A Dropdown acts as a convenient selection method when selecting one item from a fairly large set.
 *
 * It requires as props:
 *     items: an array of options to choose from.
 *     selected: the item which is currently selected.
 *     handleSelectionCallback: a function which controls the selection logic. It will receive the string of the item.
 */
export class Dropdown extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      listOpen: false,
    }
  }
  /**
   * Selects an item from the list.
   * @param item The item which was selected.
   */
  selectItem = (item: string) => {
    this.setState({
      listOpen: false,
    })
    this.props.handleSelectionCallback(item)
  }

  /** Toggles whether the list is visible. */
  toggleList = () => {
    if (this.state.listOpen) {
      document.removeEventListener('click', this.toggleList)
    } else {
      document.addEventListener('click', this.toggleList)
    }
    this.setState({
      listOpen: !this.state.listOpen,
    })
  }

  /**
   * Returns the class name for a dropdown item based on whether it is the currently selected label.
   * @param {string} item the item which is being checked.
   */
  getClassname = (item: string) => {
    return item === this.props.selected
      ? 'dropdown-item-selected'
      : 'dropdown-item-unselected'
  }

  render() {
    return (
      <div className={'dropdown-container'} onClick={this.toggleList}>
        <div className={'dropdown-header'}>
          <div className={'dropdown-title'}>{this.props.selected}</div>
          {this.state.listOpen ? (
            <img className={'dropdown-image'} src={up} />
          ) : (
            <img className={'dropdown-image'} src={down} />
          )}
        </div>
        {this.state.listOpen && (
          <div className={'dropdown-list'}>
            {this.props.items.map(item => (
              <div
                className={this.getClassname(item)}
                key={item}
                onClick={() => this.selectItem(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default Dropdown
