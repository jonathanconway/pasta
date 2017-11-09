import React                       from 'react'

import { mount }                   from 'enzyme'
import { MemoryRouter }            from 'react-router-dom'

import { createStore }             from 'redux'
import { Provider }                from 'react-redux'
import reducer                     from '../../reducer'

import dummyTemplate               from '../../config/dummyTemplate'
import FillInTemplate              from '../FillInTemplate'

import { getIndexOfNextFieldPart } from '../../selectors'

jest.mock('../../components/FillInTemplateForm', () => jest.fn())
import FillInTemplateForm from '../../components/FillInTemplateForm'

const mock = (mockFn: any) => mockFn;

describe('<FillInTemplate />', () => {
  const renderWrapper = (store, firstInitialEntry) => mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[firstInitialEntry]}>
        <FillInTemplate />
      </MemoryRouter>
    </Provider>)

  it('renders FillInTemplateForm, passing in props', () => {
    const dummyParts = [{ }, { }]
    const store = createStore(reducer, ({
      newMessage: {
        template: {
          parts: dummyParts
        }
      }
    }: any))

    mock(FillInTemplateForm).mockReturnValueOnce(<div></div>)
    
    const wrapper = renderWrapper(store, '/fill/0/0')

    expect(FillInTemplateForm).toHaveBeenCalledWith(
      expect.objectContaining({
        message: {
          template: {
            parts: dummyParts
          }
        },
        part: dummyParts[0],
        isLastField: true,
        BackLink: expect.any(Function),
        NextLink: expect.any(Function),
        FinishLink: expect.any(Function),

        onChangeFieldValue: expect.any(Function)
      }), {})
  })

  it('automatically redirects to the next partIndex whose part is a field', () => {
    const dummyParts = [{ }, { isField: true }]
    const store = createStore(reducer, ({
      templates: [dummyTemplate],
      newMessage: {
        template: {
          parts: dummyParts
        }
      }
    }: any))

    mock(FillInTemplateForm).mockReturnValueOnce(<div></div>)
    
    const wrapper = renderWrapper(store, '/fill/0/0')

    expect(wrapper.find('Redirect').prop('to')).toEqual('/fill/0/1')
  })
})
