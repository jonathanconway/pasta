import {
  serializeParts,
  deserializeParts,
  TEMPLATE_FIELD_TOKEN
}                                         from './models/Template'

import type { Template as TemplateModel } from './models/Template'
import type { Message as MessageModel }   from './models/Message'
import type { State as StateModel }       from './models/State'

import dummyTemplate                      from './config/dummyTemplate'

const defaultState: StateModel = {
  newMessage: ({
    template: dummyTemplate,
    recipient: null
  }),
  templates: [
    dummyTemplate
  ]
}

export default (state: StateModel = defaultState, action: any = {}): StateModel => {
  const newMessage = state.newMessage || { template: dummyTemplate, recipient: '' }
  const newMessageTemplate = newMessage.template || dummyTemplate
  const newMessageTemplateParts = newMessageTemplate.parts || dummyTemplate.parts

  switch (action.type) {
    case 'CREATE_NEW_TEMPLATE':
      return {
        ...state,
        templates: [
          ...state.templates,
          { parts: [] }
        ]
      }

    case 'CREATE_NEW_MESSAGE':
      return {
        ...state,
        newMessage: ({
          ...(state.newMessage),
          template: state.templates[action.templateIndex]
        }: MessageModel)
      }

    case 'SET_NEW_MESSAGE_FIELD_VALUE':
      return {
        ...state,
        newMessage: ({
          ...newMessage,
          template: {
            ...newMessageTemplate,
            parts: newMessageTemplateParts.map((part, index) =>
              (index === action.partIndex)
                ? { ...part, value: action.value }
                : part
            )
          }
        }: MessageModel)
      }

    case 'SET_NEW_MESSAGE_RECIPIENT':
      return {
        ...state,
        newMessage: {
          ...state.newMessage,
          recipient: action.recipient
        }
      }

    case 'SET_TEMPLATE_TEXT':
      return {
        ...state,
        templates:
          state.templates
            .map((template, index) =>
              index === action.templateIndex
                ? {
                    ...template,
                    parts: deserializeParts(action.text)
                  }
                : template)
      }

    case 'INSERT_FIELD_INTO_TEMPLATE':
      const partsString = serializeParts(state.templates[action.templateIndex].parts)
      const newParts = [
        partsString.substr(0, action.selectionStart),
        TEMPLATE_FIELD_TOKEN,
        partsString.substr(action.selectionStart)
      ].join('')
      
      return {
        ...state,
        templates:
          state.templates
            .map((template, index) =>
              index === action.templateIndex
                ? {
                    ...template,
                    parts: deserializeParts(newParts)
                  }
                : template)
      }

    case 'DELETE_TEMPLATE':
      return {
        ...state,
        templates:
          state
            .templates
            .filter((template, index) =>
              index !== action.templateIndex)
      }

    default:
      return state
  }
}