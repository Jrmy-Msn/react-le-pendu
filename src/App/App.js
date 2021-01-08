import React, {Component} from 'react'

import './App.css'
import Keyboard, {KEYBOARD_TYPE} from '../Keyboard/Keyboard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Keyboard type={KEYBOARD_TYPE.AZERTY}/>
      </div>
    )
  }
}

export default App
