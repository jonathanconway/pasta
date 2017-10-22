import React from 'react'

import type { Message as MessageModel } from '../models/Message'
import type { Template as TemplateModel } from '../models/Template'
import { serializePartsWithValues } from '../models/Template'
import dummyTemplate from '../config/dummyTemplate'

import Message from './Message'
import LabelAndInput from './LabelAndInput'

import styled from 'styled-components'
import { gridSize, Row, NavLinkButton, TextBubble, Button, ThreeButtonRow } from './commonStyles'
const StyledLabelAndInput = styled(LabelAndInput)`
  input {
    width: 100%;
  }
`

type Props = {
  message: MessageModel,
  onChangeRecipient: Function
}

const renderSmsHref = ({ recipient, template } : MessageModel) =>
  [
    'sms:',
    (recipient || ''),
    '&body=',
    (serializePartsWithValues(template.parts))
  ].join('')

const renderEmailHref = ({ recipient, template } : MessageModel) =>
  [
    'mailto:',
    (recipient || ''),
    '?body=',
    encodeURI(serializePartsWithValues(template.parts))
  ].join('')

const Component = ({ message, message: { template, recipient }, onChangeRecipient }: Props) =>
  <div>
    <Message template={template} />

    <Row>
      <StyledLabelAndInput
        labelText="Recipient"
        id="recipient"
        onChange={e => onChangeRecipient(e.target.value)}
        autoFocus />
    </Row>
  
    <ThreeButtonRow>
      <NavLinkButton><a href={renderEmailHref(message)}>Email</a></NavLinkButton>
      <NavLinkButton><a href={renderSmsHref(message)}>SMS</a></NavLinkButton>
      <Button>Copy</Button>
    </ThreeButtonRow>
  </div>

Component.defaultProps = {
  message: {
    template: dummyTemplate,
    recipient: '07455661073'
  },
  onChangeRecipient: () => null,
}

export default Component