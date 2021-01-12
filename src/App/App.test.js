import React from 'react'
import {cleanup, fireEvent, render, screen} from '@testing-library/react'

import {QuestionIcon} from "react-line-awesome";
import VirtualKey from "../external/VirtualKey/VirtualKey"
import App from "./App"
import Word from "../Word/Word"
import VirtualKeyboard from "../external/VirtualKeyboard/VirtualKeyboard"

afterEach(cleanup)

it('should render a <Word /> and a <VirtualKeyboard />"', () => {
  render(<App />)
  const keyboard = screen.getByRole('widget', {name: 'Clavier virtuel'})
  const word = screen.getByRole('widget', {name: 'Mot à trouver'})
  expect(keyboard).not.toBeNull()
  expect(word).not.toBeNull()
})


