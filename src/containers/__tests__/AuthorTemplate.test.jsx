import React from 'react'

import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import appReducer from '../../appReducer'

import dummyTemplate from '../../config/dummyTemplate'

import type { State as StateModel } from '../../models/State'

import AuthorTemplate from '../AuthorTemplate'

jest.mock('../../components/AuthorTemplateForm', () => jest.fn())
import AuthorTemplateForm from '../../components/AuthorTemplateForm'

const mock = (mockFn: any) => mockFn;

describe('<AuthorTemplate />', () => {
  const state: StateModel = {
    templates: [dummyTemplate]
  }

  it('receives template as a prop', () => {
    const store = createStore(appReducer, state)

    mock(AuthorTemplateForm).mockReturnValueOnce(<div></div>)
    
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/author/0']}>
          <AuthorTemplate />
        </MemoryRouter>
      </Provider>)

    expect(AuthorTemplateForm).toHaveBeenCalledWith(
      expect.objectContaining({
        template: dummyTemplate,
        onChangeText: expect.any(Function),
        onClickInsertField: expect.any(Function)
      }), {})
  })

  describe('handling of onChangeText event', () => {
    it('results in a SET_TEMPLATE_TEXT action being dispatched', () => {
      const store = createStore(appReducer, state)

      mock(AuthorTemplateForm).mockImplementation(({ onChangeText }) =>
        <input onChange={() => onChangeText('foo bar')} />)
      
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/author/0']}>
            <AuthorTemplate />
          </MemoryRouter>
        </Provider>)

      wrapper.find('input').simulate('change')

      expect(
        ((((store.getState() || {}).templates || [{}])[0] || {}).parts || [])
          .map(({ text }) => text).join(' '))
            .toEqual('foo bar')
    })
  })  

  describe('handling of onClickInsertField event', () => {
    it('triggers dispatch of INSERT_FIELD_INTO_TEMPLATE action', () => {
      const dummyState = {
        templates:
          [{
            parts: [
              { text: 'foo' },
              { text: 'bar' },
            ]
          }]
      }
      const mockAppReducer = jest.fn(() => dummyState)
      const store = createStore(mockAppReducer, dummyState)

      mock(AuthorTemplateForm).mockImplementation(({ onClickInsertField }) =>
        <button onClick={() => onClickInsertField(4)} />)
      
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/author/0']}>
            <AuthorTemplate />
          </MemoryRouter>
        </Provider>)

      wrapper.find('button').simulate('click')

      expect(mockAppReducer).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          type: 'INSERT_FIELD_INTO_TEMPLATE',
          templateIndex: 0,
          selectionStart: 4
        }))
    })
  })  
})