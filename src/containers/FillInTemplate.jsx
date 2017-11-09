import React                              from 'react'

import type { Part as PartModel }         from '../models/Part'
import type { Message as MessageModel }   from '../models/Message'
import type { Template as TemplateModel } from '../models/Template'

import { NavLink }                        from 'react-router-dom'
import { Route, Redirect }                from 'react-router'
import { connect }                        from 'react-redux'

import FillInTemplateForm                 from '../components/FillInTemplateForm'
import {
  getIndexOfNextFieldPart,
  getIndexOfPreviousFieldPart
}                                         from '../selectors'

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
  newMessage:        MessageModel,
  onSetFieldToValue: Function
}

const isFirstField = (
  parts: Array<PartModel>,
  partIndex: number) =>
    getIndexOfPreviousFieldPart(parts, partIndex) === -1

const isLastField = (
  parts: Array<PartModel>,
  partIndex: number) =>
    getIndexOfNextFieldPart(parts, partIndex) === -1

const Component = ({ newMessage, onSetFieldToValue }: Props) =>
  <Route path="/fill/:templateIndex/:partIndex?" render={({ match: { params: { templateIndex, partIndex } } }) =>
    ((templateIndex, parts, partIndex, part) =>
      <div>
        {
          (!(part.isField) && !(isLastField(parts, partIndex)))
            ? <Redirect to={`/fill/${templateIndex}/${partIndex + 1}`} />
            : null
        }
        <FillInTemplateForm
          message={newMessage}
          part={part}
          isFirstField={isFirstField(parts, partIndex)}
          isLastField={isLastField(parts, partIndex)}
          
          FirstFieldBackLink={({ children }) =>
            <NavLink to='/template'>{children}</NavLink>}
          BackLink={({ children }) =>
            <NavLink to={`/fill/${(templateIndex).toString()}/${getIndexOfPreviousFieldPart(parts, partIndex)}`}>{children}</NavLink>}
          NextLink={({ children }) =>
            <NavLink to={`/fill/${(templateIndex).toString()}/${getIndexOfNextFieldPart(parts, partIndex)}`}>{children}</NavLink>}
          FinishLink={({ children }) =>
            <NavLink to={`/send/${(templateIndex).toString()}`}>{children}</NavLink>}
          
          onChangeFieldValue={e => onSetFieldToValue(partIndex, e.target.value)}
        />
      </div>
    )(
      parseInt(templateIndex || '0'),
      newMessage.template.parts,
      parseInt(partIndex || '0'),
      (newMessage.template.parts[parseInt(partIndex || '0')] || {})
    )
  } />

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)