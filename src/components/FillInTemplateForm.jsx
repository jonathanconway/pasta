import React from 'react'

import dummyTemplate from '../config/dummyTemplate'

import type { Part as PartModel } from '../models/Part'
import type { Template as TemplateModel } from '../models/Template'
import type { Message as MessageModel } from '../models/Message'

import { NavLink } from 'react-router-dom'
import { Route, Redirect } from 'react-router'

import Message from './Message'
import LabelAndInput from './LabelAndInput'

import styled from 'styled-components'
import { baseFontSize, gridSize, Row, NavLinkButton } from './commonStyles'
const StyledLabelAndInputRow = Row.extend `
  & > div {
    width: 70%;
    display: inline-block;
  }
`

type Props = {
  message: MessageModel,
  part: PartModel,
  isLastField: boolean,
  
  NextLink: Function,
  FinishLink: Function,

  onChangeFieldValue: Function,
  onGoNext: Function
}

const Component = ({
  message: { template },
  part,
  isLastField,

  NextLink,
  FinishLink,

  onChangeFieldValue,
  onGoNext
}: Props) => {
  let fieldValueInput

  const onGoNextAndFocus = () => {
    if (fieldValueInput) {
      fieldValueInput.focus()
      fieldValueInput.value = ''
    }
    
    onGoNext()
  }

  return <form>
    <Message
      template={template}
      activePart={part}
      areFieldsCircled={true}
    />

    <StyledLabelAndInputRow>
      <LabelAndInput
        id="field-value"
        labelText="Field Value"
        onChange={onChangeFieldValue}
        autoFocus
        innerRef={input => fieldValueInput = input}
      />
      
      { isLastField
        ? <FinishLink><NavLinkButton className="icon icon--finish">Finish</NavLinkButton></FinishLink>
        : <NextLink><NavLinkButton className="icon icon--next" onClick={onGoNextAndFocus}>Next</NavLinkButton></NextLink> }
    </StyledLabelAndInputRow>
  </form>
}

Component.defaultProps = {
  message: {
    template: dummyTemplate
  },
  partIndex: dummyTemplate.parts[1],
  isLastField: false,

  NextLink: ({ children }) => <a>{children}</a>,
  FinishLink: ({ children }) => <a>{children}</a>,
  
  onChangeFieldValue: () => null,
  onGoNext: () => null
}

export default Component