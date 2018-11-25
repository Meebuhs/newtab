import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Grid } from './components/Grid'
declare let module: any

ReactDOM.render(
  <Grid testString="Boilerplate Test For New Tab Extension" />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
