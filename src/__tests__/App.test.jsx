import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { shallow } from 'enzyme'

import App from '../App'

describe('<App />', () => {
  it('renders', () => {
    shallow(<App />)
  })
})