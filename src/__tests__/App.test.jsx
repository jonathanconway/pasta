import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { mount } from 'enzyme'

import App from '../App'

describe('<App />', () => {
  it('renders', () => {
    mount(<App />)
  })
})