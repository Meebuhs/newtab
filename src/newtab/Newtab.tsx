import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Grid from './containers/Grid'
import store from './store/newtab'

declare let module: any

ReactDOM.render(
  <Provider store={store}>
    <Grid />
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
