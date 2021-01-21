import React from 'react'
import {shallow} from 'enzyme'

import {SpinnerIcon} from "react-line-awesome"
import VirtualKey from "../external/VirtualKey/VirtualKey"
import Word from "./Word"

it('should display "value" prop length <VirtualKey />"', () => {
  const wrapper = shallow(<Word value="TOTO"/>)
  expect(wrapper.find(VirtualKey)).toHaveLength(4)
})

it('should all <VirtualKey /> have "hidden" class ', () => {
  const wrapper = shallow(<Word value="TOTO"/>)
  const vKey = wrapper.find(VirtualKey).filterWhere(v => v.dive().find('.hidden').length === 1)
  expect(vKey).toHaveLength(4)
})

it('should some <VirtualKey /> have "hidden" class', () => {
  const wrapper = shallow(<Word usedLetter={["A", "B", "C", "D", "T"]} value="TOTO"/>)
  const vKey = wrapper.find(VirtualKey).filterWhere(v => v.dive().find('.hidden').length === 1)
  expect(vKey).toHaveLength(2)
})

it('should appear a <SpinnerIcon /> when word is empty', () => {
  const wrapper = shallow(<Word value=""/>)
  expect(wrapper.find(SpinnerIcon)).toHaveLength(1)
})
