import React from 'react'

import type { Message as MessageModel } from '../models/Message'
import type { Template as TemplateModel } from '../models/Template'
import { serializePartsWithValues } from '../models/Template'
import dummyTemplate from '../config/dummyTemplate'

import Message from './Message'
import LabelAndInput from './LabelAndInput'

import styled from 'styled-components'
import {
  Row,
  NavLinkButton,
  Button,
  HorizontalRow,
  baseFontSize,
  field,
  gridSize,
  textBubble
} from './components.styles'
const StyledLabelAndInput = styled(LabelAndInput)`
  input {
    width: 100%;
  }`
const Textarea = styled.textarea`
  ${field}
  ${textBubble}
  font-size: ${baseFontSize * 1.2}rem;
  padding: ${gridSize * 1.6}rem;
  height: 5rem;`

type Props = {
  message:           MessageModel,
  onChangeRecipient: Function
}

type State = {
  copyingToClipboard: bool
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

class Component extends React.Component<Props, State> {
  static defaultProps = {
    message: {
      template: dummyTemplate,
      recipient: '07455661073'
    },
    onChangeRecipient: () => null,
  }

  Textarea: ?HTMLElement = null

  constructor(props: Props) {
    super(props);
    this.state = {
      copyingToClipboard: false
    }
  }

  enableCopyToClipboard = () => {
    this.setState({
      copyingToClipboard: true
    })
    setTimeout(() => {
      if (this.Textarea) {
        this.Textarea.focus()
      }
      this.selectTextArea()
      setTimeout(() => {
        this.setState({
          copyingToClipboard: false
        })
        
        const recipientEl = document.getElementById('recipient')
        if (recipientEl) {
          recipientEl.focus()
        }
      }, 5000)
    })
  }

  selectTextArea = () => {
    setTimeout(() => {
      // $FlowFixMe
      this.Textarea.selectionStart = 0
      // $FlowFixMe
      this.Textarea.selectionEnd = this.Textarea.value.length
    })
  }

  render = () => {
    const { message, message: { template, recipient }, onChangeRecipient } = this.props
    return <div>
      { this.state.copyingToClipboard
        ? <Textarea
            innerRef={element => this.Textarea = element}
            defaultValue={template.parts.map(p => p.isField ? p.value : p.text).join('')}
            onFocus={this.selectTextArea}
          />
        : <Message
            template={template}
          /> }

      <Row>
        <StyledLabelAndInput
          labelText="Recipient"
          id="recipient"
          onChange={e => onChangeRecipient(e.target.value)}
          autoFocus
        />
      </Row>
    
      <HorizontalRow>
        <NavLinkButton><a href={renderEmailHref(message)}>Email</a></NavLinkButton>
        <NavLinkButton><a href={renderSmsHref(message)}>SMS</a></NavLinkButton>
        <Button onClick={this.enableCopyToClipboard}>Copy</Button>
      </HorizontalRow>
    </div>
  }
}

export default Component