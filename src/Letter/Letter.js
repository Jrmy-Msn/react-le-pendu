import React from 'react'
import PropTypes from 'prop-types'

import './Letter.css'

export const LETTER_FEEDBACK = {
  NOT_USED: 'not-used',
  USED: 'used',
  PRESSED: 'pressed',
}

const Letter = ({value, feedback, onClick}) => {
  return (
    <div className={`Letter ${feedback}`} onClick={() => onClick(value)}><b>{value}</b></div>
  )
}

Letter.propTypes = {
  value: PropTypes.string.isRequired,
  feedback: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Letter