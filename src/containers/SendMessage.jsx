import React from 'react'

import type { Message as MessageModel } from '../models/Message'

import { Route } from 'react-router'
import { connect } from 'react-redux'

import SendMessageForm from '../components/SendMessageForm'

const mapStateToProps = state => ({
  message: state.newMessage
})

const mapDispatchToProps = dispatch => ({
  onSetRecipient: (recipient) => dispatch({
    type: 'SET_NEW_MESSAGE_RECIPIENT',
    recipient
  })
})

type Props = {
  message: MessageModel,
  onSetRecipient: Function
}

const Component = ({ message, onSetRecipient }: Props) =>
  <Route path="/send/:templateIndex" render={({ match: { params: { templateIndex } } }) =>
    <SendMessageForm
      message={message}
      onChangeRecipient={onSetRecipient}
    />
  } />

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)