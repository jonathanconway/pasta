import React           from 'react'
import { mount }       from 'enzyme'
import { createStore } from 'redux'
import { Provider }    from 'react-redux'

import reducer                      from '../../reducer'
import dummyTemplate                from '../../config/dummyTemplate'

import type { State as StateModel } from '../../models/State'
import MyTemplates from '../MyTemplates'

jest.mock('../../components/TemplatesList', () => jest.fn())
import TemplatesList                from '../../components/TemplatesList'

const mock = (mockFn: any) => mockFn;

describe('<MyTemplates />', () => {
  it('renders <TemplateList />, passing through templates as props', () => {
    const state: StateModel = {
      templates: [dummyTemplate]
    }
    const store = createStore(reducer, state)

    mock(TemplatesList).mockReturnValueOnce(<div></div>)
    
    const wrapper = mount(
      <Provider store={store}>
        <MyTemplates />
      </Provider>)

    expect(TemplatesList).toHaveBeenCalledWith(
      expect.objectContaining({
        templates: [dummyTemplate]
      }), {})
  })

  describe('handling of onClickAddNewTemplate event', () => {
    it('results in a CREATE_NEW_TEMPLATE action being dispatched', () => {
      const dummyState = {}
      const mockAppReducer = jest.fn(() => dummyState)
      const store = createStore(mockAppReducer, dummyState)

      mock(TemplatesList).mockImplementation(({ onClickAddNewTemplate }) =>
        <button onClick={onClickAddNewTemplate} />)
      
      const wrapper = mount(
        <Provider store={store}>
          <MyTemplates />
        </Provider>)

      wrapper.find('button').simulate('click')

      expect(mockAppReducer).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          type: 'CREATE_NEW_TEMPLATE'
        }))
    })
  })

  describe('handling of onClickAddNewMessage event', () => {
    it('results in a CREATE_NEW_MESSAGE action being dispatched', () => {
      const dummyState = {}
      const mockAppReducer = jest.fn(() => dummyState)
      const store = createStore(mockAppReducer, dummyState)

      mock(TemplatesList).mockImplementation(({ onClickAddNewMessage }) =>
        <button onClick={() => onClickAddNewMessage(0)} />)
      
      const wrapper = mount(
        <Provider store={store}>
          <MyTemplates />
        </Provider>)

      wrapper.find('button').simulate('click')

      expect(mockAppReducer).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          type: 'CREATE_NEW_MESSAGE',
          templateIndex: 0
        }))
    })
  })


})