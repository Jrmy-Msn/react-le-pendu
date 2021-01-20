import React, {Component} from 'react'
import {fabric} from 'fabric'

import brand from '../resources/images/falling_stikman_64.svg'
import './App.css'

import VirtualKeyboard from '../external/VirtualKeyboard/VirtualKeyboard'
import Word from '../Word/Word'
import {CircleNotchIcon, RedoAltIcon} from "react-line-awesome";

const N = 7
const MAX_TRY = 11
const TRY = 6

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
    this.initializeCanvas()
    this.renderCanvas([])
  }

  async generateWord(n) {
    let word
    let aNotLetter = []
    try {
      const file = await import(`../resources/dictionary/dict.fr.${n}.json`)
      const words = file && file.default ? file.default : []
      const rand = Math.floor(Math.random() * words.length + 1)

      word = words[rand]
    } catch(err) {
      word = "APPELEZ LE DEVELOPPEUR IL Y A UNE ERREUR"
    } finally {
      word = word.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
      aNotLetter = word.split('').filter(l => !l.match(/[A-Z]/))
      this.setState({word: word, usedLetter: aNotLetter})
    }
  }

  initializeCanvas() {
    this.canvas = new fabric.StaticCanvas('pendu')
    const padding = 10
    const wPart = this.canvas.getWidth() / 10
    const hPart = this.canvas.getHeight() / 10
    const leftPosition = this.canvas.getWidth() - wPart * 3
    // bottom Line
    const bottomLine = new fabric.Line([
        wPart, this.canvas.getHeight() - padding,
        (this.canvas.getWidth() / 3) * 2, this.canvas.getHeight() - padding
      ], {
      stroke: 'black',
      strokeWidth: 5
    })

    // left Line
    const leftLine = new fabric.Line([
        wPart * 2, hPart, wPart * 2,
        this.canvas.getHeight() - padding]
      , {
      stroke: 'black',
      strokeWidth: 5
    })

    // top Line
    const topLine = new fabric.Line([
        wPart * 2, hPart,
        leftPosition, hPart
      ], {
      stroke: 'black',
      strokeWidth: 5
    })

    // diagonal Line
    const diagonalLine = new fabric.Line([
        wPart * 2, hPart * 4,
        wPart * 4, hPart
      ], {
      stroke: 'black',
      strokeWidth: 5
    })

    // right Line
    const rightLine = new fabric.Line([
        leftPosition, hPart,
        leftPosition, hPart * 2
      ], {
      stroke: 'black',
      strokeWidth: 5
    })

    // head
    const radius = 10
    const head = new fabric.Circle({
      left: (leftPosition) - radius,
      top: hPart * 2,
      radius: radius,
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: 2,
      strokeUniform: true,
    })

    // body
    const body = new fabric.Line([
        leftPosition, (hPart * 2) + (radius * 2),
        leftPosition, hPart * 6
      ], {
        stroke: 'black',
        strokeWidth: 5
      })

    // left arm
    const leftArm = new fabric.Line([
        leftPosition, hPart * 4,
        this.canvas.getWidth() - wPart * 4, hPart * 3
      ], {
        stroke: 'black',
        strokeWidth: 5
      })

    // right arm
    const rightArm = new fabric.Line([
        leftPosition, hPart * 4,
        this.canvas.getWidth() - wPart * 2, hPart * 3
      ], {
        stroke: 'black',
        strokeWidth: 5
      })

    // left leg
    const leftLeg = new fabric.Line([
        leftPosition, hPart * 5.5,
        this.canvas.getWidth() - wPart * 4, hPart * 8
      ], {
        stroke: 'black',
        strokeWidth: 5
      })

    // right leg
    const rightLeg = new fabric.Line([
        leftPosition, hPart * 5.5,
        this.canvas.getWidth() - wPart * 2, hPart * 8
      ], {
        stroke: 'black',
        strokeWidth: 5
      })

    this.pendu = [
      bottomLine, leftLine, topLine, diagonalLine, rightLine,
      head, body, leftArm, rightArm, leftLeg, rightLeg
    ]

    this.pendu.forEach(v => v.visible = false)

    this.canvas.add(...this.pendu)
  }

  renderCanvas(usedLetter) {
    const {word} = this.state
    const nbLetterNotInWord = usedLetter.filter(l => !word.split('').includes(l)).length
    const beginAt = MAX_TRY - TRY
    this.pendu.forEach((v, i) => v.visible = i < beginAt)
    for(let i = beginAt; i < beginAt + nbLetterNotInWord; i++) {
      console.log(i)
      this.pendu[i].visible = true
    }
    this.canvas.renderAll()
  }

  onSelectLetter(letter) {
    const {usedLetter} = this.state

    if (!usedLetter.includes(letter)) {
      const newUsedLetter = [...usedLetter, letter]
      this.setState({usedLetter: newUsedLetter})
      this.renderCanvas(newUsedLetter)
    }
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

  // arrow func for binding this
  onClickRestart = (ev) => {
    this.setState({word: ''}, () => {
      setTimeout(() => this.generateWord(N), 600)
    })
  }

  didEnd() {
    const {word, usedLetter} = this.state
    const allLetterFound = word !== '' && word.split('').every(l => usedLetter.includes(l))
    const nbLetterNotInWord = usedLetter.filter(l => !word.split('').includes(l)).length
    return allLetterFound
      ? 'BRAVO !'
      : (
        nbLetterNotInWord >= TRY ? 'Perdu...' : ''
      )
  }

  render() {
    const {word, currentKey, usedLetter} = this.state
    const end = this.didEnd()
    return (
      <div className="App">
        <header>
          <nav>
            <div className="brand">
              <img
                src={brand}
                alt="Bonhomme pendu par les pieds" />
              <span>LE PENDU</span>
            </div>
            <RedoAltIcon
              id="restart"
              aria-hidden="false"
              className={`la-lg`}
              onClick={this.onClickRestart} />
          </nav>
        </header>
        <div className={`draw-part`}>
          {
            <h1 className={`end`}>{end}</h1>
          }
          <canvas id={`pendu`}/>
        </div>
        <div className={`interactive-part`}>
          <Word
            usedLetter={usedLetter}
            value={word} />
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
      </div>
    )
  }
}

export default App
