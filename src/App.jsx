import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router'
import { HashRouter, NavLink } from 'react-router-dom'

import {
  Nav,
  NavStep,
  NavBackButton,
  TemplateList,
  InfoAlert,
  Message,
  Template,
  FieldInput,
  RecipientInput,
  Row,
  TemplateText,
  TemplateField,
  NavLinkButton,
  Button,
  ThreeButtonRow } from './App.styles'

export default class App extends React.Component {
  static propTypes = {
    templates: PropTypes.arrayOf(PropTypes.shape({
      parts: PropTypes.arrayOf(PropTypes.string)
    })),
    recipient: PropTypes.string,
    onChangeFieldValue: PropTypes.func,
    fieldValues: PropTypes.object
  }

  static defaultProps = {
    templates: [
      {
        parts: [
          'Hello ',
          '~',
          'I am a fan of your app! When will the next update be?'
        ]
      }
    ],
    recipient: '+44 (0) 7455 661073‬',
    message: 'Hello, Jonathan. I am a fan of your app! When will the next update be?',
    createOnChangeFieldValue: () => null,
    fieldValues: {}
  }

  render = () => {
    const {
      templates,
      recipient,
      message,
      createOnChangeFieldValue,
      fieldValues,
      onGoBack } = this.props

    return <HashRouter>
      <div>
        <Route path="/:screen" render={({ match }) => (
          <Nav>
            <NavBackButton onClick={onGoBack}>Back</NavBackButton>
            <Row>
              <NavStep className={[match.params.screen === 'list' ? 'active' : ''].join(' ')}>List</NavStep>
              <NavStep className={[match.params.screen === 'fill' ? 'active' : ''].join(' ')}>Fill</NavStep>
              <NavStep className={[match.params.screen === 'send' ? 'active' : ''].join(' ')}>Send</NavStep>
            </Row>
          </Nav>
        )} />

        <Route exact path="/" render={() => <Redirect to="/list"/>} />
        
        <Route path="/list" render={() =>
          <div>
            <TemplateList>
              {templates.map((template, index) =>
                <li key={`template${index}`}>
                  <Template>
                    <NavLink to={`/fill/${index}`}>
                      {template.parts.join(' ')}
                    </NavLink>
                  </Template>
                </li>
              )}
            </TemplateList>

            <InfoAlert>
              Tap a message to get started ↗
            </InfoAlert>
          </div>
        } />

        <Route exact path="/fill/:templateId" render={({ match }) => <Redirect to={`/fill/${match.params.templateId}/0`} />} />

        <Route path="/fill/:templateId/:fieldId?" render={({ match }) =>
          <div>
            <Template>
              {templates[0].parts.map((part, partIndex) => 
                ((part.trim() === '~')
                  ? <TemplateField
                      key={partIndex}
                      className={[
                        parseInt(match.params.fieldId) !== partIndex ? 'active' : ''
                      ].join(' ')}>

                      {fieldValues[match.params.fieldId] || '~'}
                    </TemplateField>
                  : <TemplateText key={partIndex}>
                      {part}
                    </TemplateText>)
              )}
            </Template>

            {((id) => 
              <Row>
                <label
                  htmlFor={id}
                  className="sr-only">Field Value</label>
                <FieldInput
                  type="text"
                  id={id}
                  value={fieldValues[match.params.fieldId]}
                  onChange={createOnChangeFieldValue(match.params.fieldId)}
                  autoFocus />

                <Route path="/fill/0/0" render={() =>
                  <NavLinkButton className="icon icon--next">
                    <NavLink to={`/fill/0/1`}>Next</NavLink>
                  </NavLinkButton>
                } />
                <Route path="/fill/0/1" render={() =>
                  <NavLinkButton className="icon icon--finish">
                    <NavLink className="button button--finish" to={`/send`}>Finish</NavLink>
                  </NavLinkButton>
                } />
              </Row>
            )('fill-field-value')}
          </div>
        } />

        <Route exact path="/send" render={({ match }) => <Redirect to="/send/0" />} />

        <Route path="/send/:templateId" render={({ match }) =>
          ((({ template }) =>
            <div>
              <Message>
                { message }
              </Message>

              {((id) => 
                <Row>
                  <label htmlFor={id} className="sr-only">Recipient</label>
                  <RecipientInput type="text" id={id} defaultValue={recipient} />
                </Row>
              )('recipient')}
            
              <ThreeButtonRow>
                <NavLinkButton><a href="#">Email</a></NavLinkButton>
                <NavLinkButton><a href={`sms:${recipient}&body=${message}`}>SMS</a></NavLinkButton>
                <Button>Copy</Button>
              </ThreeButtonRow>
            </div>
          )({
            template: templates[match.params.templateId]
          }))
       } />
      </div>
    </HashRouter>
  }
}