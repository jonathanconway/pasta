import React from 'react'

import dummyTemplate from '../config/dummyTemplate'

import type { Template as TemplateModel } from '../models/Template'
import { serializeParts } from '../models/Template'

import styled from 'styled-components'
import { field, gridSize, Row, Button, FieldPart, TextBubble, InfoAlert, NavLinkButton, ThreeButtonRow } from './commonStyles'
const TextArea = styled.textarea`
  ${field}

  padding: ${gridSize}rem;
  width: 100%;
  box-sizing: border-box;
`

type Props = {
  template: TemplateModel,

  onChangeText: Function,
  onClickInsertField: Function,

  BackLink: Function,
  UseLink: Function
}

const Component = ({ template: { parts }, onChangeText, onClickInsertField, BackLink, UseLink }: Props) => {
  let templateTextArea

  const onClickInsertFieldWithFocus = () => {
    if (templateTextArea) {
      templateTextArea.focus()
    }

    onClickInsertField(serializeParts(parts).length)
  }

  return <form name="authorTemplate">
    <TextBubble>
      <TextArea
        id="template-text"
        value={serializeParts(parts)}
        onChange={e => onChangeText(e.target.value)}
        autoFocus={true}
        name="templateText"
        innerRef={textarea => templateTextArea = textarea}
      />
    </TextBubble>
    <Row>
      <ThreeButtonRow>
        <NavLinkButton className="icon icon--back"><BackLink>Back</BackLink></NavLinkButton>
        <NavLinkButton className="icon icon--up" onClick={onClickInsertFieldWithFocus}>Add Field</NavLinkButton>
        <Button><UseLink>Use</UseLink></Button>
      </ThreeButtonRow>
    </Row>
    <InfoAlert>
      Highlight some text to create a field ↗
    </InfoAlert>
  </form>
}

Component.defaultProps = {
  template: dummyTemplate,

  onChangeText: () => null,
  onClickInsertField: () => null,

  BackLink: ({ children }) => children,
  UseLink: ({ children }) => children
}

export default Component