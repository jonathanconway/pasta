import React from 'react'

import dummyTemplate from '../config/dummyTemplate'

import type { Template as TemplateModel } from '../models/Template'
import { serializeParts } from '../models/Template'

import styled from 'styled-components'
import {
  field,
  gridSize,
  Row,
  Button,
  NavLinkButton,
  HorizontalRow
} from './components.styles'
const TextArea = styled.textarea`
  ${field}

  padding: ${gridSize}rem;
  width: 100%;
  box-sizing: border-box;`
const AuthorHorizontalRow = styled(HorizontalRow)`
  > * {
    &:nth-child(1) { flex: 1 }
    &:nth-child(2) { flex: 3 }
    &:nth-child(3) { flex: 2.5 }

    * {
      width: 100%;
    }
  }`

type Props = {
  template:           TemplateModel,

  onChangeText:       Function,
  onClickInsertField: Function,

  BackLink:           Function,
  UseLink:            Function
}

const Component = ({ template: { parts }, onChangeText, onClickInsertField, BackLink, UseLink }: Props) => {
  let templateTextArea

  const onClickInsertFieldWithFocus = () => {
    if (templateTextArea) {
      templateTextArea.focus()
    }
    const selectionStart = templateTextArea.selectionStart
    onClickInsertField(templateTextArea.selectionStart)
    setTimeout(() => {
      const templateTextAreaEl = ((document.getElementById('template-text')): any)
      if (templateTextAreaEl &&
          templateTextAreaEl.selectionStart &&
          templateTextAreaEl.selectionEnd) {
        templateTextAreaEl.selectionStart =
          templateTextAreaEl.selectionEnd =
            (selectionStart + 1)
      }
    })
  }

  return <form name="authorTemplate">
    <TextArea
      id="template-text"
      value={serializeParts(parts)}
      onChange={e => onChangeText(e.target.value)}
      autoFocus={true}
      name="templateText"
      innerRef={textarea => templateTextArea = textarea}
    />
    <Row>
      <AuthorHorizontalRow>
        <BackLink><NavLinkButton className="icon icon--back icon--hide-text">Back</NavLinkButton></BackLink>
        <NavLinkButton className="icon icon--up" onClick={onClickInsertFieldWithFocus}>Insert Field</NavLinkButton>
        <UseLink><NavLinkButton className="icon icon--next">Message</NavLinkButton></UseLink>
      </AuthorHorizontalRow>
    </Row>
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