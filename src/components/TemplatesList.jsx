import React from 'react'

import type { Template as TemplateModel } from '../models/Template'
import type { Message as MessageModel }   from '../models/Message'

import dummyTemplate from '../config/dummyTemplate'
import Template from './Template'

import styled from 'styled-components'
import {
  gridSize
} from './components.styles'
const Container = styled.div`
  height: 28rem;
  overflow: scroll;`
const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  a {
    color: initial;
    text-decoration: none;
  }`
const Li = styled.li`
  margin-bottom: ${gridSize}rem;`
const AddNewLinkButton = styled.span`
  position: absolute;
  height: 2.7rem;
  width: 2.7rem;
  text-indent: -10000rem;
  border-radius: ${gridSize}rem;
  top: ${gridSize / 2}rem;
  right: ${gridSize * 4}rem;

  border: solid 1px white;

  &:after {
    position: absolute;
    display: inline-block;
    top: ${gridSize / 4}rem;
    left:  ${gridSize}rem;
    width: 3rem;
    height: 3rem;

    content: '✎';
    text-indent: 0;
    transform: rotate(82deg);
    color: white;
    font-size: 3rem;
    z-index: 10000;
  }

  &:active {
    background-color: white;
    
    &:after {
      color: black;
    }
  }`

type Props = {
  templates:             Array<TemplateModel>,

  onClickAddNewTemplate: Function,
  onClickAddNewMessage:  Function,
  onClickDeleteTemplate: Function,

  ItemFillLink:          Function,
  ItemEditLink:          Function,
  AddNewLink:            Function
}

const Component = ({
  templates,

  onClickAddNewTemplate,
  onClickAddNewMessage,
  onClickDeleteTemplate,

  ItemFillLink,
  ItemEditLink,
  AddNewLink
}: Props) =>
  <Container>
    <Ul>
      {templates.map((template: TemplateModel, index: number) =>
        <Li key={`template${index}`}>
          <Template
            parts={template.parts}
            noScroll={true}
            onClickDelete={() => onClickDeleteTemplate(index)}
            FillLink={({ children }) =>
              <ItemFillLink
                template={template}
                index={index}
                onClick={() => onClickAddNewMessage(index)}>
                {children}
              </ItemFillLink>}
            EditLink={({ children }) =>
              <ItemEditLink
                index={index}>
                {children}
              </ItemEditLink>}
          />
        </Li>
      )}
    </Ul>
    <AddNewLink>
      <AddNewLinkButton onClick={onClickAddNewTemplate}>
        Create a new template
      </AddNewLinkButton>
    </AddNewLink>
  </Container>

Component.defaultProps = {
  templates: [{
    parts: [
      { text: 'Template1' }
    ]
  }, {
    parts: [
      { text: 'Template2' }
    ]
  }],

  ItemFillLink: () => <span>Item</span>,
  ItemEditLink: () => <a></a>,
  AddNewLink: () => <a></a>,

  onClickAddNewTemplate: () => null,
  onClickAddNewMessage: () => null,
  onClickDeleteTemplate: () => null
}

export default Component