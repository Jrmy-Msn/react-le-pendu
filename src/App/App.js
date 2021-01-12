import React, {Component} from 'react'

import './App.css'
import VirtualKeyboard from '../external/VirtualKeyboard/VirtualKeyboard'
import Word from '../Word/Word'

const N = 7

const KEY_FEEDBACK = {
  PRESSED: 'pressed',
  USED_OK: 'used-ok',
  USED_NOK: 'used-nok',
  NOT_USED: 'not-used',
}

class App extends Component {
  state = {
    usedLetter: [],
    word: '',
    currentKey: ''
  }

  componentDidMount() {
    this.generateWord(N)
  }

  async generateWord(n) {
    let word
    try {
      const file = await fetch(`../resources/dict.fr.${n}.json`)
      const words = await file.json()
      const rand = Math.floor(Math.random() * words.length + 1)

      word = words[rand]
    } catch(err) {
      word = "APPELEZ LE DEVELOPPEUR IL Y A UNE ERREUR"
    } finally {
      this.setState({word: word.toUpperCase()})
    }
  }

  onSelectLetter(letter) {
    const {usedLetter} = this.state
    if (!usedLetter.includes(letter)) this.setState({usedLetter: [...usedLetter, letter]})
  }

  onPreSelectLetter(letter) {
    this.setState({currentKey: letter || ''})
  }

  // arrow func for binding this
  feedbackForCurrentKey = (letter) => {
    const {currentKey, usedLetter, word} = this.state
    const letterIsUsed = usedLetter.includes(letter)
    if (letterIsUsed && word.includes(letter)) return KEY_FEEDBACK.USED_OK
    if (letterIsUsed) return KEY_FEEDBACK.USED_NOK
    if (letter === currentKey) return KEY_FEEDBACK.PRESSED

    return KEY_FEEDBACK.NOT_USED
  }

  // arrow func for binding this
  handleClickForKey = (letter) => {
    this.onSelectLetter(letter)
  }

  // arrow func for binding this
  handleMouseOverForKey = (letter) => {
    this.onPreSelectLetter(letter)
  }

  // arrow func for binding this
  handleMouseOutForKey = (letter) => {
    this.setState({currentKey: ''})
  }

  // arrow func for binding this
  handleKeyDown = ev => {
    const key = ev.key && ev.key.toUpperCase()
    this.onPreSelectLetter(key)
  }

  // arrow func for binding this
  handleKeyUp = (ev) => {
    const key = ev.key && ev.key.toUpperCase()
    this.onSelectLetter(key)
  }

  render() {
    const {word, currentKey, usedLetter} = this.state
    return (
      <div className="App">
        <Word usedLetter={usedLetter} value={word} />
        <VirtualKeyboard
          currentKey={currentKey}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onClickForKey={this.handleClickForKey}
          onMouseOverForKey={this.handleMouseOverForKey}
          onMouseOutForKey={this.handleMouseOutForKey}
          feedbackForCurrentKey={this.feedbackForCurrentKey}
        />
      </div>
    )
  }
}

export default App
