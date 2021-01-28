import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {QuestionIcon, SpinnerIcon} from "react-line-awesome"

import {useWordStyle, useWordKeyStyle} from './Word.css.js'

import VirtualKey from '../external/VirtualKey/VirtualKey'
import ResponsiveButtonGroup from "../external/VirtualKeyboard/ResponsiveGroupButton";

const FEEDBACK_KEY = {
  HIDDEN: 'hidden',
  VISIBLE: 'visible',
}

function generateVirtualKey (letter, {usedLetter, revealLetter, value}) {
  if ((usedLetter.includes(letter)
      || revealLetter.includes(letter)
    )
    && value.includes(letter)) {
    return [
      letter,
      FEEDBACK_KEY.VISIBLE
    ]
  }

  return [
    (<QuestionIcon className="la-lg" aria-hidden="false"/>),
    FEEDBACK_KEY.HIDDEN
  ]
}

const Word = ({value, usedLetter, revealLetter}) => {
  const wordClasses = useWordStyle()
  const wordKeyClasses = useWordKeyStyle()

  useEffect(() => {
    const vKey = document.querySelectorAll('.VirtualKey')
    Array.from(vKey).forEach(v => {
      v.style.width = `${document.body.offsetWidth / (value.length + 5)}px`
    })
  })

  return (
    value === ''
      ? (<SpinnerIcon
        className={`la-3x la-spin`}/>)
      : (<ResponsiveButtonGroup
        disableElevation={true}
        variant={'contained'}
        color={'primary'}
        aria-label="Mot à trouver"
        className={`Word`}
        classes={{...wordClasses}}>
        {
          (value.split('').map((vKey, index) => {
            const [vKeyValue, vKeyFeedback] = generateVirtualKey(vKey, {value, usedLetter, revealLetter})
            return (
              <VirtualKey
                key={index}
                value={vKeyValue}
                className={`${wordKeyClasses[vKeyFeedback]}`}
                active={false}/>
            )
          }))
        }
      </ResponsiveButtonGroup>)
  )
}

Word.propTypes = {
  value: PropTypes.string.isRequired,
  usedLetter: PropTypes.arrayOf(PropTypes.string),
  revealLetter: PropTypes.arrayOf(PropTypes.string),
}

Word.defaultProps = {
  usedLetter: [],
  revealLetter: []
}

export default Word