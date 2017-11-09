import React from 'react'

import dummyTemplate from '../config/dummyTemplate'

import type { Part as PartModel } from '../models/Part'
import type { Template as TemplateModel } from '../models/Template'
import { textToHtml } from '../models/Template'

import styled from 'styled-components'
import {
  gridSize,
  TextBubble
} from './components.styles'
const FieldPart = styled.span`
  &.field {
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
    }
  }`

type Props = {
  template: TemplateModel,
  activePart: PartModel,
  areFieldsCircled: bool
}

class Component extends React.Component<Props, {}> {
  static defaultProps = {
    template: dummyTemplate,
    activePart: dummyTemplate.parts[1],
    areFieldsCircled: false
  }

  Container: ?HTMLElement = null

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.activePart !== nextProps.activePart) {
      setTimeout(() => {
        // $FlowFixMe
        const activeField = document.querySelector('.field.active')
        // $FlowFixMe
        this.Container.scrollTop = activeField.offsetTop - 100
      })
    }
  }

  render = () => {
    const { template: { parts }, activePart, areFieldsCircled } = this.props
    return <TextBubble innerRef={element => this.Container = element}>
      {parts.map((part, index) =>
        <FieldPart
          key={index}
          className={[
              ((part.isField) ? 'field' : ''),
              ((part === activePart) ? 'active' : ''),
              ((areFieldsCircled) ? 'circled' : '')
            ].join(' ')}
          dangerouslySetInnerHTML={{ __html: textToHtml(((part.isField ? part.value : part.text) || '')) }}
        />
      )}
    </TextBubble>
  }
}

export default Component