window.document.body.innerHTML = '<div id="root"></div>'

import { injectGlobal }  from 'styled-components'
injectGlobal`
  body, input, button {
    font-family: 'Source Sans Pro';
  }
  
  .sr-only {
    visibility: hidden;
    left: -10000rem;
    position: absolute;
  }`

setInterval(() => window.scrollTo(0, 0))

import React from 'react'
import ReactDOM from 'react-dom'

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { compose, applyMiddleware, createStore } from 'redux'
// $FlowFixMe
import { persistStore, autoRehydrate } from 'redux-persist'

import appReducer from './appReducer'

let store =
  createStore(
    appReducer,
    undefined,
    compose(
      autoRehydrate()
    ))

persistStore(store)

import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  ((document.querySelector('#root') || {}):any))