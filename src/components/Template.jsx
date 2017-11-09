import React from 'react'

import type { Part as PartModel } from '../models/Part'
import { serializeParts, textToHtml } from '../models/Template'

import styled from 'styled-components'
import {
  gridSize,
  TextBubble,
  Button
} from './components.styles'
const multiLineOverflow = `
  display: -webkit-box;
  height: ${gridSize * 6}rem;
  padding-bottom: ${gridSize * 5}rem;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;`
const TemplateTextBubble = styled(TextBubble)`
  position: relative;
  padding: ${gridSize * 2.5}rem;
  //padding-right: ${gridSize * 12}rem;
  
  ${props => props.noScroll ? multiLineOverflow : ''}`
const buttonWidth = 6
const DeleteButton = styled(Button)`
  position: absolute;
  top: ${gridSize}rem;
  right: ${gridSize}rem;
  width: ${buttonWidth}rem;`
const StyledNavLinkButton = styled(Button)`
  position: absolute;
  top: ${gridSize * 6}rem;
  right: ${gridSize}rem;
  width: ${buttonWidth}rem;`

type Props = {
  parts: Array<PartModel>,
  noScroll: boolean,

  onClickDelete: Function,

  FillLink: Function,
  EditLink: Function
}

const Component = ({ parts, onClickDelete, noScroll, EditLink, FillLink }: Props) =>
  <TemplateTextBubble noScroll={noScroll}>
    <FillLink><span dangerouslySetInnerHTML={{ __html: textToHtml(serializeParts(parts)) }} /></FillLink>
    <DeleteButton className="button--small icon icon--delete" onClick={e => { e.preventDefault(); onClickDelete() }}>Delete</DeleteButton>
    <EditLink><StyledNavLinkButton className="button--small icon icon--edit">Edit</StyledNavLinkButton></EditLink>
  </TemplateTextBubble>

Component.defaultProps = {
  parts: [],
  noScroll: false,

  onClickDelete: () => null,

  FillLink: ({ children }) => <a>{children}</a>,
  EditLink: ({ children }) => <a>{children}</a>
}

export default Component