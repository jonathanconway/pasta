import React       from 'react'
import { Route }   from 'react-router'

import Nav         from '../components/Nav'

const Component = () =>
  <Route path="/:activeStep" render={({ match }) => (
    <Nav activeStep={match.params.activeStep} />
  )} />

export default Component