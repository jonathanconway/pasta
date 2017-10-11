import React from 'react'
import ReactDOM from 'react-dom'

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

import App from './App'

export const bootstrap = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

bootstrap()