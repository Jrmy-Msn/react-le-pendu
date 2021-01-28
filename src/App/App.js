import React, {Component} from 'react'
import {fabric} from 'fabric'
import {
  Box,
  Grid,
  Typography,
  ThemeProvider,
  withStyles,
} from "@material-ui/core"

import {THEME, useStyles} from "./App.css.js"

import VirtualKeyboard from '../external/VirtualKeyboard/VirtualKeyboard'
import Word from '../Word/Word'
import Topbar from "../Topbar/Topbar"
import Settings from "../Settings/Settings";

const N = 7
const MIN_TRY = 1
const MAX_TRY = 11
const MAX_LENGTH = 20
const MIN_LENGTH = 3
const TRY = 6

const KEY_FEEDBACK = {
  PRESSED: 'pressed',
  USED_OK: 'used-ok',
  USED_NOK: 'used-nok',
  REVEAL: 'reveal',
  NOT_USED: 'not-used',
}

class App extends Component {
  gameOver = false
  message = ''
  state = {
    theme: THEME.dark,
    usedLetter: [],
    revealLetter: [],
    word: '',
    currentKey: '',
    nbTries: TRY,
    wordLength: N,
    randomWordLength: false,
    settingsIsOpen: false
  }

  componentDidMount() {
    this.generateWord({n: N})
    this.initializeCanvas()
    this.renderCanvas([], TRY)
  }

  async generateWord(options) {
    let {word, n} = options
    let aNotLetter = []
    try {
      if (!word) {
        const file = await import(`../resources/dictionary/dict.fr.${n}.json`)
        const words = file && file.default ? file.default : []
        const rand = Math.floor(Math.random() * words.length + 1)

        word = words[rand]
      }
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

  checkKeyEventVirtualKeyboard(event) {
    return event.target.getAttribute('id') !== 'word_value'

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

  renderCanvas(usedLetter, nbTries) {
    const {word} = this.state
    const nbLetterNotInWord = usedLetter.filter(l => !word.split('').includes(l)).length
    const beginAt = MAX_TRY - nbTries
    this.pendu.forEach((v, i) => v.visible = i < beginAt)
    for(let i = beginAt; i < beginAt + nbLetterNotInWord; i++) {
      this.pendu[i].visible = true
    }
    this.canvas.renderAll()
  }

  randomWordLenth() {
    return Math.floor(Math.random() * (MAX_LENGTH - MIN_LENGTH) + MIN_LENGTH)
  }

  onSelectLetter(letter) {
    if (this.gameOver) return

    const {usedLetter, nbTries} = this.state
    let newUsedLetter = Array.from(usedLetter)
    if (!usedLetter.includes(letter)) {
      newUsedLetter = [...usedLetter, letter]
      this.setState({usedLetter: newUsedLetter})
      this.renderCanvas(newUsedLetter, nbTries)
    }

    this.didEnd(newUsedLetter)
  }

  onPreSelectLetter(letter) {
    this.setState({currentKey: letter || ''})
  }

  // arrow func for binding this
  feedbackForCurrentKey = (classes, letter) => {
    const {currentKey, usedLetter, revealLetter, word} = this.state
    const letterIsUsed = usedLetter.includes(letter)
    const letterRevealed = revealLetter.includes(letter)
    if (letterRevealed) return classes[KEY_FEEDBACK.REVEAL]
    if (letterIsUsed && word.includes(letter)) return classes[KEY_FEEDBACK.USED_OK]
    if (letterIsUsed) return classes[KEY_FEEDBACK.USED_NOK]
    if (letter === currentKey) return classes[KEY_FEEDBACK.PRESSED]
    return classes[KEY_FEEDBACK.NOT_USED]
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
    if (this.checkKeyEventVirtualKeyboard(ev)) {
      const key = ev.key && ev.key.toUpperCase()
      this.onPreSelectLetter(key)
    }
  }

  // arrow func for binding this
  handleKeyUp = (ev) => {
    if (this.checkKeyEventVirtualKeyboard(ev)) {
      const key = ev.key && ev.key.toUpperCase()
      this.onSelectLetter(key)
    }
  }

  // arrow func for binding this
  handleThemeChange = (event) => {
    const checked = event.target.checked
    this.setState({theme: checked ? THEME.light : THEME.dark})
  }

  // arrow func for binding this
  handleSettingsValid = (options) => {
    const {tries, length, random, word} = options
    this.setState({
      word: word,
      nbTries: tries,
      randomWordLength:
      random, wordLength:
      length,
      settingsIsOpen: false
    })
    const newWordLength = random ? this.randomWordLenth() : length
    this.restart({tries: tries, length: newWordLength, word})
  }

  // arrow func for binding this
  handleSettingsCancel = () => {
    this.setState({settingsIsOpen: false})
  }

  // arrow func for binding this
  onClickSettings = () => {
    const {settingsIsOpen} = this.state
    this.setState({settingsIsOpen: !settingsIsOpen})
  }

  // arrow func for binding this
  onClickRestart = () => {
    const {wordLength, randomWordLength, nbTries} = this.state
    const newWordLength = randomWordLength ? this.randomWordLenth() : wordLength
    this.restart({tries: nbTries, length: newWordLength})
  }

  // arrow func for binding this
  restart = (options) => {
    const {length, tries, word} = options
    this.gameOver = false
    this.pendu.forEach((v, i) => v.visible = false)
    this.renderCanvas([], tries)
    this.setState({word: '', message: '', usedLetter: [], revealLetter: []}, () => {
      setTimeout(() => {
        this.generateWord({word: word, n:length})
      }, 600)
    })
  }

  didEnd(usedLetter) {
    const {word, nbTries} = this.state
    const allLetterFound = word !== '' && word.split('').every(l => usedLetter.includes(l))
    const nbLetterNotInWord = usedLetter.filter(l => !word.split('').includes(l)).length
    let newMessage = (<span className={`end`}>Essais restant : {nbTries - nbLetterNotInWord}</span>)
    if (allLetterFound) {
      this.gameOver = true
      newMessage = (<Typography variant="h4" className={`end`}>BRAVO !</Typography>)
    }

    if (nbLetterNotInWord >= nbTries) {
      const revealLetter = word.split('').filter(l => !usedLetter.includes(l))
      this.setState({revealLetter: revealLetter})
      this.gameOver = true
      newMessage = (<Typography variant="h4" className={`end`}>Perdu...</Typography>)
    }

    this.setState({message: newMessage})
  }

  render() {
    const {classes} = this.props
    const {theme, word, wordLength, randomWordLength, nbTries, message, usedLetter, revealLetter, settingsIsOpen} = this.state
    return (
      <ThemeProvider theme={theme}>
        <Box bgcolor={'secondary.light'} className={`${classes.h100}`}>
          <Grid container className={`${classes.h100}`}>
            <Grid item xs={12}>
              <Topbar game={this.gameOver} settingsAction={this.onClickSettings} gameAction={this.onClickRestart}/>
            </Grid>
            <Grid item container justify={'center'} xs={12}>
              <canvas id={`pendu`} className={`${classes.h100}`} />
            </Grid>
            <Grid item container alignItems={'center'} justify={'center'} xs={12}>
              {message}
            </Grid>
            <Grid item container alignItems={'flex-end'} xs={12}>
              <Grid item container justify={'center'} xs={12}>
                <Word
                  usedLetter={usedLetter}
                  revealLetter={revealLetter}
                  value={word} />
              </Grid>
              <Grid item xs={12}>
                <VirtualKeyboard
                  theme={theme}
                  className={`${classes.keyboard}`}
                  onKeyDown={this.handleKeyDown}
                  onKeyUp={this.handleKeyUp}
                  onClickForKey={this.handleClickForKey}
                  onMouseOverForKey={this.handleMouseOverForKey}
                  onMouseOutForKey={this.handleMouseOutForKey}
                  feedbackForCurrentKey={(letter) => this.feedbackForCurrentKey(classes, letter)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Settings
          open={settingsIsOpen}
          minTry={MIN_TRY}
          maxTry={MAX_TRY}
          minLength={MIN_LENGTH}
          maxLength={MAX_LENGTH}
          randomWordLength={randomWordLength}
          nbTries={nbTries}
          wordLength={wordLength}
          onThemeChange={this.handleThemeChange}
          onValid={this.handleSettingsValid}
          onCancel={this.handleSettingsCancel}/>
      </ThemeProvider>
    )
  }
}

export default withStyles(useStyles, { withTheme: true })(App)
