import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './Word.css'

import VirtualKey from '../external/VirtualKey/VirtualKey'

const KEY_FEEDBACK = {
  VISIBLE: 'visible',
  HIDDEN: 'hidden',
}

class Word extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    usedLetter: PropTypes.arrayOf(PropTypes.string),
  }

  // arrow func for binding this
  letterState = (letter) => {
    return this.props.usedLetter.includes(letter)
      ? KEY_FEEDBACK.VISIBLE
      : KEY_FEEDBACK.HIDDEN
  }

  render() {
    return (
      <div
        role="widget"
        aria-label="Mot à trouver"
        className={`Word`}>
        {
          this.props.value.split('')
            .map((vKey, index) => (
              <VirtualKey
                key={index}
                value={vKey}
                feedback={this.letterState(vKey)}/>
            ))
        }
      </div>
    )
  }
}

export default Word