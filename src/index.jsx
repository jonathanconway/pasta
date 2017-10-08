import React from 'react'
import ReactDOM from 'react-dom'

window.document.body.innerHTML = '<div id="root"></div>'

import { injectGlobal }  from 'styled-components'
injectGlobal`
  body, input, button {
    font-family: 'Source Sans Pro';
  }`

import App from './App'
ReactDOM.render(<App />, document.getElementById('root'))