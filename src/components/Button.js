import React, { PropTypes } from 'react'

const Button= ({ text, status, onClick }) => (
  <button
    onClick={onClick}
    className={status}
  >
    {text}
  </button>
)

Button.propTypes = {
	text: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
  	onClick: PropTypes.func.isRequired
}

export default Button