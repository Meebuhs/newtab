import { INSTRUCTION_HEADER, INSTRUCTION_TEXT } from 'constants/strings'
import * as React from 'react'
import './Instructions.scss'

export class Instructions extends React.Component<{}, {}> {
  render() {
    return (
      <div className={'instructions-wrapper'}>
        <div className={'instructions'}>
          <div className={'instructions-header'}>{INSTRUCTION_HEADER}</div>
          <div className={'instructions-text'}>{INSTRUCTION_TEXT}</div>
        </div>
      </div>
    )
  }
}
