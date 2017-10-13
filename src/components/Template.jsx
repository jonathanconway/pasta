import React from 'react'

import type { Part as PartModel } from '../models/Part'
import { serializeParts } from '../models/Template'

import styled from 'styled-components'
import { gridSize, baseFontSize, TextBubble, Button } from './commonStyles'
const TemplateTextBubble = styled(TextBubble)`
  position: relative;
  padding-right: ${gridSize * 12}rem;
`
const DeleteButton = styled(Button)`
  position: absolute;
  top: ${gridSize}rem;
  right: ${gridSize}rem;
`

type Props = {
  parts: Array<PartModel>,
  onClickDelete: Function
}

const Component = ({ parts, onClickDelete }: Props) =>
  <TemplateTextBubble>
    {serializeParts(parts)}
    <DeleteButton className="button--small icon icon--delete" onClick={e => { e.preventDefault(); onClickDelete() }}>Delete</DeleteButton>
  </TemplateTextBubble>

Component.defaultProps = {
  parts: [],
  onClickDelete: () => null
}

export default Component