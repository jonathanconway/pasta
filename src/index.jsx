window.document.body.innerHTML = '<div id="root"></div>'


import { inject } from './global.styles'
inject()


setInterval(() => window.scrollY > 0 ? window.scrollTo(0, 0) : null)


import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider } from 'react-redux'
import { compose, applyMiddleware, createStore } from 'redux'


// $FlowFixMe
import storage from 'redux-persist/es/storage'
// $FlowFixMe
import { PersistGate } from 'redux-persist/es/integration/react'
// $FlowFixMe
import { persistStore, persistReducer} from 'redux-persist'
import reducer from './reducer'
const store =
  createStore(
    persistReducer({ key: 'pasta', storage }, reducer),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const persistor = persistStore(store)


import Routing from './containers/Routing'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Routing />
    </PersistGate>
  </Provider>, // $FlowFixMe
  (document.querySelector('#root')))