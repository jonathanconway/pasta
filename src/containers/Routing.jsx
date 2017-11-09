import React from 'react'
import { Route, Redirect } from 'react-router'
import { HashRouter }      from 'react-router-dom'

import App            from '../components/App'
import Header         from '../containers/Header'
import Nav            from '../containers/Nav'
import MyTemplates    from '../containers/MyTemplates'
import FillInTemplate from '../containers/FillInTemplate'
import SendMessage    from '../containers/SendMessage'
import AuthorTemplate from '../containers/AuthorTemplate'

export default ({}: {}) => <HashRouter>
  <App
    Header={Header}
    Body={() => <div>
      <Route exact path="/" render={() => <Redirect to="/fill"/>} />
      <Route exact path="/template" render={() => <Redirect to="/template/list"/>} />
      <Route path="/template/list" component={MyTemplates} />
      <Route path="/template/new/:templateId" component={AuthorTemplate} />

      <Route exact path="/fill" render={() => <Redirect to="/fill/0"/>} />
      <Route exact path="/fill/:templateId" render={({ match }) =>
        <Redirect to={`/fill/${(match.params.templateId || '').toString()}/0`} />
      } />
      <Route path="/fill" component={FillInTemplate} />

      <Route exact path="/send" render={({ match }) => <Redirect to="/send/0" />} />
      <Route path="/send/:templateIndex" render={({ match: { params: { templateIndex } } }) =>
        <SendMessage />
      } />

    </div>}
    Nav={Nav}
  />
</HashRouter>