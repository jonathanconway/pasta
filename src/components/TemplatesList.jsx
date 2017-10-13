import React from 'react'

import type { Template as TemplateModel } from '../models/Template'
import type { Message as MessageModel } from '../models/Message'

import dummyTemplate from '../config/dummyTemplate'
import Template from './Template'

import styled from 'styled-components'
import { baseFontSize, gridSize, InfoAlert, NavLinkButton } from './commonStyles'
const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  a {
    color: initial;
    text-decoration: none;
  }
`
const Li = styled.li`
  margin-bottom: ${gridSize}rem;
`
const AddNewLinkInfoAlert = styled(InfoAlert)`
  position: absolute;
  bottom: ${gridSize}rem;
`

type Props = {
  templates: Array<TemplateModel>,

  ItemLink: Function,
  AddNewLink: Function,

  onClickAddNewTemplate: Function,
  onClickAddNewMessage: Function,
  onClickDeleteTemplate: Function
}

const Component = ({
  templates,
  ItemLink,
  onClickAddNewTemplate,
  onClickAddNewMessage,
  onClickDeleteTemplate,
  AddNewLink
}: Props) =>
  <div>
    <Ul>
      {templates.map((template, index) =>
        <Li key={`template${index}`}>
          <ItemLink
            template={template}
            index={index}
            onClick={() => onClickAddNewMessage(index)}>
            <Template
              {...template}
              onClickDelete={() => onClickDeleteTemplate(index)}
            />
          </ItemLink>
        </Li>
      )}
    </Ul>
    <InfoAlert>
      ↑ Tap on one of the<br /> templates to fill it out
    </InfoAlert>
    <AddNewLink>
      <AddNewLinkInfoAlert onClick={onClickAddNewTemplate}>
        Tap here to author a new template
      </AddNewLinkInfoAlert>
    </AddNewLink>
  </div>

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

  ItemLink: () => <span>Item</span>,
  AddNewLink: () => <a></a>,

  onClickAddNewTemplate: () => null,
  onClickAddNewMessage: () => null,
  onClickDeleteTemplate: () => null
}

export default Component