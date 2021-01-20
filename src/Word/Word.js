import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {CircleNotchIcon, QuestionIcon, SpinnerIcon} from "react-line-awesome"

import './Word.css'

import VirtualKey from '../external/VirtualKey/VirtualKey'

const FEEDBACK_KEY = {
  HIDDEN: 'hidden',
  VISIBLE: 'visible',
}

class Word extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    usedLetter: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    usedLetter: []
  }

  // arrow func for binding this
  feedbackLetter = (letter) => {
    if (this.props.usedLetter.includes(letter)
      && this.props.value.includes(letter)) {
      return FEEDBACK_KEY.VISIBLE
    }

    return FEEDBACK_KEY.HIDDEN
  }

  // arrow func for binding this
  renderLetter = (letter) => {
    if (this.props.usedLetter.includes(letter)
      && this.props.value.includes(letter)) {
      return letter
    }

    return (
      <QuestionIcon
        className="la-lg"
        aria-hidden="false"/>
      )
  }

  render() {
    return (
      <div
        aria-label="Mot à trouver"
        className={`Word`}>
        {
          this.props.value === ''
            ? (
              <SpinnerIcon
              className={`la-lg la-spin`}/>)
            : (
              this.props.value.split('')
                .map((vKey, index) => (
                  <VirtualKey
                    role="button"
                    key={index}
                    value={this.renderLetter(vKey)}
                    feedback={this.feedbackLetter(vKey)}/>
              )))
        }
      </div>
    )
  }
}

export default Word