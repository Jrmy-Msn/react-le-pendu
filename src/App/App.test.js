import React from 'react'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

import Word from "./Word"

afterEach(cleanup)

it('should display "value" prop length <VirtualKey />"', () => {
  render(<Word value="TOTO"/>)
  expect(screen.getAllByRole('button')).toHaveLength(4)
})

it('should all <VirtualKey /> have <QuestionIcon /> child ', () => {
  render(<Word value="TOTO"/>)
  expect(screen.getAllByRole('presentation')).toHaveLength(4)
})

it('should some <VirtualKey /> have <QuestionIcon /> child', () => {
  render(<Word usedLetter={["A", "B", "C", "D", "T"]} value="TOTO"/>)
  expect(screen.getAllByRole('presentation')).toHaveLength(2)
})
