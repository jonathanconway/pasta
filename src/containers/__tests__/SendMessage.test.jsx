import React            from 'react'
import { mount }        from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { createStore }  from 'redux'
import { Provider }     from 'react-redux'

jest.mock('../../reducer', () => jest.fn(state => state))
import reducer                      from '../../reducer'

import type { State as StateModel } from '../../models/State'
import SendMessage                  from '../SendMessage'

jest.mock('../../components/SendMessageForm', (props) => jest.fn())
import SendMessageForm              from '../../components/SendMessageForm'

describe('<SendMessageForm />', () => {
  const mock = (mockFn: any) => mockFn;

  const dummyStore = createStore(reducer, ({
    templates: [1, 2],
    newMessage: { template: { parts: [1,2] } },
    onChangeRecipient: () => null
  }: any))

  const createWrapper = () => mount(
    <Provider store={dummyStore}>
      <MemoryRouter initialEntries={['/send/0']}>
        <SendMessage />
      </MemoryRouter>
    </Provider>)

  it('renders <SendMessageForm /> passing through message and recipient as props', () => {
    mock(SendMessageForm).mockReturnValueOnce(<div></div>)
    
    const wrapper = createWrapper()

    expect(SendMessageForm).toHaveBeenCalledWith(
      expect.objectContaining({
        message: { template: { parts: [1,2] } },
        onChangeRecipient: expect.any(Function)
      }), {})
  })

  describe('handling of onChangeRecipient event', () => {
    it('results in a SET_NEW_MESSAGE_RECIPIENT action being dispatched', () => {
      mock(SendMessageForm).mockImplementation(props =>
        <input onChange={e => props.onChangeRecipient('b')} />)
      
      const wrapper = createWrapper()

      wrapper.find('input').simulate('change')

      expect(reducer).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          recipient: 'b'
        })
      )
    })
  })
})