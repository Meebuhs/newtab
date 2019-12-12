import Newtab from 'containers/Newtab'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Modal from 'react-modal'
import { Provider } from 'react-redux'
import store from 'store/newtab'

Modal.setAppElement('#root')
ReactDOM.render(
  <Provider store={store}>
    <Newtab />
  </Provider>,
  document.getElementById('root')
)
