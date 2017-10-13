import React from 'react'
import { mount } from 'enzyme'

import type { Template as TemplateModel } from '../../models/Template'
import type { Message as MessageModel } from '../../models/Message'

import Message from '../Message'

describe('<Message />', () => {
  it('renders a message with values at field positions', () => {
    const template = {
      parts: [
        { text: 'one' },
        { text: '', isField: true, value: 'two' },
        { text: 'three' },
        { text: '', isField: true, value: 'four' }
      ]
    }

    expect(mount(<Message template={template} />).text())
      .toEqual('one two three four ')
  })
})