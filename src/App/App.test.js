import React from 'react'
import {shallow} from 'enzyme'

import App from "./App";
import VirtualKeyboard from "../external/VirtualKeyboard/VirtualKeyboard"

it('should display <VirtualKeyboard />', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find(VirtualKeyboard)).toHaveLength(1)
})

it('should display <canvas />', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('canvas')).toHaveLength(1)
})

it('should display <canvas />', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('canvas')).toHaveLength(1)
})
