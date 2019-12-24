import * as React from 'react'
import './Checkbox.scss'

interface IProps {
  checked: boolean
  handleToggle: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
}

export class Checkbox extends React.Component<IProps, {}> {
  render() {
    return (
      <div className={'checkbox-container'} onClick={this.props.handleToggle}>
        <div
          className={`checkbox-box${
            this.props.checked ? '-checked' : '-unchecked'
          }`}
        >
          <svg className={'checkbox-tick'} viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    )
  }
}
