import React from 'react'

import type { Message as MessageModel } from '../models/Message'
import type { Template as TemplateModel } from '../models/Template'

import { NavLink } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

import FillInTemplateForm from '../components/FillInTemplateForm'

const mapStateToProps = state => ({
  newMessage: state.newMessage
})

const mapDispatchToProps = dispatch => ({
  onSetFieldToValue: (partIndex, value) =>
    dispatch({
      type: 'SET_NEW_MESSAGE_FIELD_VALUE',
      partIndex,
      value
    })
})

type Props = {
  newMessage: MessageModel,
  onSetFieldToValue: Function,
}

const isLastField = (
  template: TemplateModel,
  partIndex: number) =>
    (template
      .parts
      .slice(partIndex + 1)
      .filter(part => part.isField)
      .length === 0)

const Component = ({ newMessage, onSetFieldToValue }: Props) =>
  <Route path="/fill/:templateIndex/:partIndex?" render={({ match: { params: { templateIndex, partIndex } } }) =>
    ((templateIndex, partIndex, part) =>
      <div>
        { !(part.isField)
          ? <Redirect to={`/fill/${templateIndex}/${partIndex + 1}`} />
          : null }
        <FillInTemplateForm
          message={newMessage}
          part={part}
          isLastField={isLastField(newMessage.template, partIndex)}
          
          NextLink={({ children }) => <NavLink to={`/fill/${(templateIndex).toString()}/${partIndex + 1}`}>{children}</NavLink>}
          FinishLink={({ children }) => <NavLink to={`/send/${(templateIndex).toString()}`}>{children}</NavLink>}
          
          onChangeFieldValue={e => onSetFieldToValue(partIndex, e.target.value)}
        />
      </div>
    )(
      parseInt(templateIndex || '0'),
      parseInt(partIndex || '0'),
      (newMessage.template.parts[parseInt(partIndex || '0')] || {})
    )
  } />

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)