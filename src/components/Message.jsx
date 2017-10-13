import React from 'react'

import dummyTemplate from '../config/dummyTemplate'

import type { Part as PartModel } from '../models/Part'
import type { Template as TemplateModel } from '../models/Template'

import styled from 'styled-components'
import { gridSize, baseFontSize, TextBubble } from './commonStyles'
const FieldPart = styled.span`
  &.circled {
    margin: 0 ${gridSize}rem;
    padding: 0 ${gridSize}rem;
    border: solid 2px;
    border-color: silver;
    border-radius: ${gridSize}rem;
  }

  &.active {
    background-color: yellow;
    border-color: maroon;
  }`

type Props = {
  template: TemplateModel,
  activePart: PartModel,
  areFieldsCircled: boolean
}

const Component = ({ template: { parts }, activePart, areFieldsCircled }: Props) =>
  <TextBubble>
    {parts.map((part, index) =>
      (part.isField
        ? <FieldPart
            key={index}
            className={[
              ((part === activePart) ? 'active' : ''),
              ((areFieldsCircled) ? 'circled' : '')
            ].join(' ')}
          >
            {`${part.value || ''} `}
          </FieldPart>
        : <span key={index}>{part.text} </span>)
    )}
  </TextBubble>

Component.defaultProps = {
  template: dummyTemplate,
  activePart: dummyTemplate.parts[1],
  areFieldsCircled: false
}

export default Component