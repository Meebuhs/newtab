import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Modal from 'react-modal'
import { Provider } from 'react-redux'

import Newtab from 'containers/Newtab'
import store from 'store/newtab'

declare let module: any

Modal.setAppElement('#root')
ReactDOM.render(
  <Provider store={store}>
    <Newtab />
  </Provider>,
  document.getElementById('root')
)
