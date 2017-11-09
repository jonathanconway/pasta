import React                              from 'react'

import dummyTemplate                      from '../config/dummyTemplate'

import type { Part as PartModel }         from '../models/Part'
import type { Template as TemplateModel } from '../models/Template'
import type { Message as MessageModel }   from '../models/Message'

import { NavLink }                        from 'react-router-dom'
import { Route, Redirect }                from 'react-router'

import Message                            from './Message'
import LabelAndInput                      from './LabelAndInput'

import styled from 'styled-components'
import {
  NavLinkButton,
  HorizontalRow
}                                         from './components.styles'
const StyledHorizontalRow = styled(HorizontalRow)`
  > * {
    &:nth-child(1) { flex: 1 }
    &:nth-child(2) { flex: 4 }
    &:nth-child(3) { flex: 2 }
  }`
const StyledNavLinkButton = styled(NavLinkButton)`
  width: 100%;`

type Props = {
  message: MessageModel,
  part: PartModel,
  isFirstField: boolean,
  isLastField: boolean,
  
  FirstFieldBackLink: Function,
  BackLink: Function,
  NextLink: Function,
  FinishLink: Function,

  onChangeFieldValue: Function
}

const Component = ({
  message: { template },
  part,
  isFirstField,
  isLastField,

  FirstFieldBackLink,
  BackLink,
  NextLink,
  FinishLink,

  onChangeFieldValue
}: Props) => {
  let fieldValueInput

  const onGoNextOrBack = () => {
    if (fieldValueInput) {
      fieldValueInput.focus()
      fieldValueInput.value = ''
    }
  }

  return <form>
    <Message
      template={template}
      activePart={part}
      areFieldsCircled={true}
    />

    <StyledHorizontalRow>
      { isFirstField
        ? <FirstFieldBackLink><StyledNavLinkButton className="icon icon--back icon--hide-text">Back</StyledNavLinkButton></FirstFieldBackLink>
        : <BackLink><StyledNavLinkButton className="icon icon--back icon--hide-text" onClick={onGoNextOrBack}>Back</StyledNavLinkButton></BackLink> }

      <LabelAndInput
        id="field-value"
        labelText="Field Value"
        onChange={onChangeFieldValue}
        autoFocus
        innerRef={input => fieldValueInput = input}
      />
      
      { isLastField
        ? <FinishLink><StyledNavLinkButton className="icon icon--next">Send</StyledNavLinkButton></FinishLink>
        : <NextLink><StyledNavLinkButton className="icon icon--next" onClick={onGoNextOrBack}>Next</StyledNavLinkButton></NextLink> }
    </StyledHorizontalRow>
  </form>
}

Component.defaultProps = {
  message: {
    template: dummyTemplate
  },
  partIndex: dummyTemplate.parts[1],
  isFirstField: false,
  isLastField: false,

  FirstFieldBackLink: ({ children }) => <a>{children}</a>,
  BackLink: ({ children }) => <a>{children}</a>,
  NextLink: ({ children }) => <a>{children}</a>,
  FinishLink: ({ children }) => <a>{children}</a>,
  
  onChangeFieldValue: () => null
}

export default Component