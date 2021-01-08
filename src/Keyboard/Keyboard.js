import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { KeyboardIcon, PaletteIcon } from 'react-line-awesome'

import './Keyboard.css'

import Letter, {LETTER_FEEDBACK} from '../Letter/Letter'

export const KEYBOARD_THEME = {
  DARK: 'dark',
  LIGHT: 'light'
}

export const KEYBOARD_TYPE = {
  AZERTY: 'azerty',
  QWERTY: 'qwerty',
  ALPHABET: 'alphabet',
}

const KEYBOARD = {
  AZERTY: ['AZERTYUIOP', 'QSDFGHJKLM', 'WXCVBN'],
  QWERTY: ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'],
  ALPHABET: ['ABCDEFGHIJ', 'KLMNOPQRST', 'UVWXYZ']
}

function nextInArray(value, array) {
  const aKey = Object.keys(array)
  let index = aKey.findIndex(k => value === array[k])
  index = (index < 0 || index === aKey.length - 1) ? 0 : index + 1
  return array[aKey[index]]
}

class Keyboard extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    theme: PropTypes.string,
  }
  static defaultProps = {
    theme: KEYBOARD_THEME.DARK,
    type: KEYBOARD_TYPE.ALPHABET
  }
  state = {
    usedLetter: [],
    theme: this.props.theme,
    type: this.props.type,
    currentKey: ''
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  detectKeyboardType() {
    const {type} = this.state
    const key = Object.keys(KEYBOARD_TYPE).find(k => KEYBOARD_TYPE[k] === type)
    return KEYBOARD[key] || Keyboard.defaultProps.type
  }

  testLetter(letter) {
    const {usedLetter} = this.state
    if (!usedLetter.includes(letter)) this.setState({usedLetter: [...usedLetter, letter]})
  }

  // arrow func for binding this
  letterState = (letter) => {
    const {currentKey, usedLetter} = this.state
    return letter === currentKey
      ? LETTER_FEEDBACK.PRESSED
      : (
        usedLetter.includes(letter) ? LETTER_FEEDBACK.USED : LETTER_FEEDBACK.NOT_USED
      )
  }

  // arrow func for binding this
  switchType = () => {
    const {type} = this.state
    const next = nextInArray(type, KEYBOARD_TYPE)
    this.setState({type: next})
  }

  // arrow func for binding this
  switchTheme = () => {
    const {theme} = this.state
    const next = nextInArray(theme, KEYBOARD_THEME)
    this.setState({theme: next})
  }

  // arrow func for binding this
  handleClickForLetter = (letter) => {
    this.testLetter(letter)
  }

  // arrow func for binding this
  handleKeyDown = ev => {
    const key = ev.key && ev.key.toUpperCase()
    this.setState({currentKey: key || ''})
  }

  // arrow func for binding this
  handleKeyUp = () => {
    const {currentKey} = this.state
    this.setState({currentKey: ''})
    this.testLetter(currentKey)
  }

  render() {
    const {theme,} = this.state

    return (
      <div className={`Keyboard`} theme={theme}>
        <div className="keyboard-action">
          <KeyboardIcon title="Changer la disposition du clavier" className={`la-lg`} onClick={this.switchType} />
          <PaletteIcon title="Changer la couleur du clavier" className={`la-lg`} onClick={this.switchTheme} />
        </div>
        <div className={`keyboard-letters`}>
          {
            this.detectKeyboardType().map((letterRow, index) => (
              <div key={index} className={`keyboard-row`}>
                {
                  letterRow.split('').map(letter => (
                    <Letter
                      key={letter}
                      value={letter}
                      onClick={this.handleClickForLetter}
                      feedback={this.letterState(letter)}/>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Keyboard