import React from 'react'

import { Route, Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'

import MyTemplates from './containers/MyTemplates'
import FillInTemplate from './containers/FillInTemplate'
import SendMessage from './containers/SendMessage'
import AuthorTemplate from './containers/AuthorTemplate'

import Nav from './components/Nav'

export default ({}: {}) => <HashRouter>
  <div>
    <Route path="/:activeStep" render={({ match }) => (
      <Nav activeStep={match.params.activeStep} />
    )} />

    <Route exact path="/" render={() => <Redirect to="/list"/>} />
    
    <Route path="/list" component={MyTemplates} />

    <Route exact path="/fill/:templateId" render={({ match }) =>
      <Redirect to={`/fill/${(match.params.templateId || '').toString()}/0`} />
    } />
    <Route path="/fill" component={FillInTemplate} />

    <Route exact path="/send" render={({ match }) => <Redirect to="/send/0" />} />
    <Route path="/send/:templateIndex" render={({ match: { params: { templateIndex } } }) =>
      <SendMessage />
    } />

    <Route path="/author" component={AuthorTemplate} />
  </div>
</HashRouter>