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

  it(`scrolls to element rendering active field part, after active field part
      changes, and is 'below the fold'`, done => {
    const template = {
      parts: [
        { text: 'one' },
        { text: '', isField: true, value: 'two' },
        { text: 'three\nfour\nfive\nsix' },
        { text: '', isField: true, value: 'seven' },
        { text: 'eight\nnine\nten\neleven' },
        { text: '', isField: true, value: 'twelve' }
      ]
    }
    const activePart = template.parts[1]

    const wrapper = mount(<Message {...{ template, activePart }} />)

    wrapper.setProps({
      activePart: template.parts[3]
    })

    const scrollTopWhenThirdActivePartSelected = wrapper.find('div').instance().scrollTop

    setTimeout(() => {
      expect(scrollTopWhenThirdActivePartSelected).toBeGreaterThan(0)

      wrapper.setProps({
        activePart: template.parts[5]
      })

      const thirdActivePardHeight = 20

      setTimeout(() => {
        expect(wrapper.find('div').instance().scrollTop)
          .toBeGreaterThan(
            scrollTopWhenThirdActivePartSelected +
            thirdActivePardHeight)
        done()
      }, 500)
    }, 500)
  })
})