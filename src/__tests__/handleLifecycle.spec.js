import React from 'react'
import { mount } from 'enzyme'

import handleLifecycle from '../handleLifecycle'

const Loading = () => <p>loading...</p>

describe('Given a handleLifecycle HoC', () => {
  describe('when rendering the provided placeholder component', () => {
    it('should pass all the given props', () => {
      const route = {
        path: '/foo'
      }
      const HandleLifecycle = handleLifecycle(Loading)
      const wrapper = mount(<HandleLifecycle route={ route } />)

      expect(wrapper.find(Loading).props()).toEqual({ route })
    })
  })

  describe('when rendering the resolved route component', () => {
    it('should pass all the given props', () => {
      const Bar = () => null
      const route = {
        path: '/bar',
        __component: Bar
      }
      const HandleLifecycle = handleLifecycle(Loading)
      const wrapper = mount(<HandleLifecycle route={ route } />)

      expect(wrapper.find(Bar).props()).toEqual({ route })
    })
  })
})
