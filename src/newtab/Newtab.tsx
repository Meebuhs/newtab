import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Newtab } from './components/Newtab'
import store from './store/newtab'

declare let module: any

ReactDOM.render(
  <Provider store={store}>
    <Newtab />
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
