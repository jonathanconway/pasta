import appReducer from '../appReducer'

import type { Template as TemplateModel } from '../models/Template'
import type { Message as MessageModel } from '../models/Message'
import type { State as StateModel } from '../models/State'

import dummyTemplate from '../config/dummyTemplate'

describe('appReducer', () => {
  it('returns the store passed in', () => {
    expect(appReducer({ templates: [dummyTemplate] }))
      .toEqual({ templates: [dummyTemplate] })
  })

  describe('CREATE_NEW_MESSAGE', () => {
    it('appends a new message object, using the template at the index given', () => {
      const newState = appReducer(
        { templates: [dummyTemplate] },
        {
          type: 'CREATE_NEW_MESSAGE',
          templateIndex: 0
        })

      expect(newState.newMessage).toEqual({ template: dummyTemplate })
    })
  })
    
  describe('SET_NEW_MESSAGE_FIELD_VALUE', () => {
    it('sets the value of the part at the given partIndex', () => {
      const newState = appReducer({
        templates: [dummyTemplate],
        newMessage: {
          template: dummyTemplate,
          recipient: null
        }        
      }, {
        type: 'SET_NEW_MESSAGE_FIELD_VALUE',
        partIndex: 1,
        value: 'newValue'
      })
      
      expect((newState.newMessage || {}).template.parts[1].value)
        .toEqual('newValue')
    })
  })

  describe('SET_NEW_MESSAGE_RECIPIENT', () => {
    it('sets the value at the given fieldIndex', () => {
      const newState = appReducer({
        templates: [dummyTemplate],
        newMessage: {
          template: dummyTemplate,
          recipient: null
        }
      }, {
        type: 'SET_NEW_MESSAGE_RECIPIENT',
        recipient: 'john.doe@website.com'
      })

      expect((newState.newMessage || {}).recipient).toEqual('john.doe@website.com')
    })
  })

  describe('SET_TEMPLATE_TEXT', () => {
    it('sets the value of the parts of the template at the given templateIndex', () => {      
      const newState = appReducer({
        templates: [{
          parts: [{ text: 'foo' }]
        }]
      }, {
        type: 'SET_TEMPLATE_TEXT',
        templateIndex: 0,
        text: 'foo bar'
      })

      expect(newState.templates[0].parts.map(({ text }) => text).join(' '))
        .toEqual('foo bar')
    })
  })

  describe('INSERT_FIELD_INTO_TEMPLATE', () => {
    it('appends a part with isField set to true to the the template at the given templateIndex', () => {
      const newState = appReducer({
        templates: [{
          parts: [{ text: 'foo' }, { text: 'bar' }]
          //.                  ^ position of field being inserted
        }]
      }, {
        type: 'INSERT_FIELD_INTO_TEMPLATE',
        templateIndex: 0,
        selectionStart: 4
      })

      expect(newState.templates[0].parts)
        .toEqual([
          { text: 'foo' },
          { text: '',   isField: true },
          { text: 'bar' }
        ])
    })
  })

  describe('CREATE_NEW_TEMPLATE', () => {
    it('appends a new template to the templates array', () => {
      const newState = appReducer({
        templates: [],
      }, {
        type: 'CREATE_NEW_TEMPLATE'
      })

      expect(newState.templates).toHaveLength(1)
    })
  })

  describe('DELETE_TEMPLATE', () => {
    it('deleted template at specified index from the templates array', () => {
      const newState = appReducer({
        templates: [dummyTemplate]
      }, {
        type: 'DELETE_TEMPLATE',
        templateIndex: 0
      })

      expect(newState.templates).toHaveLength(0)
    })
  })
})